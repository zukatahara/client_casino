import agencyApi from "@/apis/agency.api";
import { useState } from "react";
import RegisterSuccess from "./modal";
import {
  Contact,
  Eye,
  EyeOff,
  LucideUser,
  PhoneCall,
  UnlockKeyhole,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface FormData {
  username: string;
  password: string;
  repassword: string;
  fullname: string;
  phone: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  repassword?: string;
  fullname?: string;
  phone?: string;
}

const SectionRegister = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    repassword: "",
    fullname: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [open, setOpen] = useState(false);

  const validateForm = () => {
    let newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.username) {
      newErrors.username = t("vui_long_nhap_ten_tai_khoan", {
        ns: "all",
      });
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = t("vui_long_nhap_mat_khau", {
        ns: "all",
      });
      isValid = false;
    } else if (formData.password.length < 6 || formData.password.length > 15) {
      newErrors.password = t("mat_khau_phai_tu_6_den_15_ky_tu", {
        ns: "all",
      });
      isValid = false;
    }

    if (!formData.repassword) {
      newErrors.repassword = t("vui_long_xac_nhan_mat_khau", {
        ns: "all",
      });

      isValid = false;
    }

    if (formData.password !== formData.repassword) {
      newErrors.repassword = t("mat_khau_xac_nhan_khong_khop", {
        ns: "all",
      });

      isValid = false;
    }

    if (!formData.fullname) {
      newErrors.fullname = t("vui_long_nhap_ho_ten", {
        ns: "all",
      });

      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = t("vui_long_nhap_so_dien_thoai", {
        ns: "all",
      });

      isValid = false;
    } else if (!/^0\d{9}$/i.test(formData.phone)) {
      newErrors.phone = t("so_dien_thoai_khong_hop_le", {
        ns: "all",
      });

      isValid = false;
    }

    // Thêm các điều kiện validate cho repassword, fullname, phone tương tự

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const res = await agencyApi.registerAgency(formData);
      if (res.data?.status) {
        setOpen(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);

  return (
    <div className="flex justify-center items-center flex-col px-4  mt-5">
      <RegisterSuccess open={open} setOpen={() => setOpen(false)} />
      <div className="flex items-center justify-center rounded-md py-2 px-4 w-full bg-[#3d4977]">
        <h1 className="text-[#fff]  ">{t("dang_ky_dai_ly", { ns: "all" })}</h1>
      </div>
      <form className=" py-[30px] w-full" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="flex items-center gap-2 bg-[#1e2646] rounded-md py-1 px-2">
            <LucideUser size={25} color="#414e7e" />
            <input
              type="text"
              placeholder={t("tai_khoan_6_15_ky_tu", {
                ns: "all",
              })}
              id="username"
              name="username"
              className="text-[#fff] placeholder-[#8491a5] bg-transparent px-[12px] rounded-[4px] text-[14px] border-transparent outline-none h-[40px] w-full"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {errors.username && (
            <span className="text-red-500 text-[12px]">{errors.username}</span>
          )}
        </div>
        <div className="grid gap-2  mt-2">
          <div className="flex items-center gap-2 bg-[#1e2646] rounded-md py-1 px-2 relative">
            <UnlockKeyhole size={25} color="#414e7e" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("mat_khau_6_15_ky_tu_chu_va_so", {
                ns: "all",
              })}
              id="password"
              name="password"
              className="text-[#fff] placeholder-[#8491a5] bg-transparent px-[12px] rounded-[4px] text-[14px] border-transparent outline-none h-[40px] w-full"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="absolute right-3">
              {showPassword ? (
                <EyeOff
                  color="gray"
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  color="gray"
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500 text-[12px]">{errors.password}</span>
          )}
        </div>
        <div className="grid gap-2  mt-2">
          <div className="flex items-center gap-2 bg-[#1e2646] rounded-md py-1 px-2 relative">
            <UnlockKeyhole size={25} color="#414e7e" />
            <input
              type={showRepassword ? "text" : "password"}
              placeholder={t("nhap_lai_mat_khau", {
                ns: "all",
              })}
              id="repassword"
              name="repassword"
              className="text-[#fff] placeholder-[#8491a5] bg-transparent px-[12px] rounded-[4px] text-[14px] border-transparent outline-none h-[40px] w-full"
              value={formData.repassword}
              onChange={handleChange}
            />
            <div className="absolute right-3">
              {showRepassword ? (
                <EyeOff
                  color="gray"
                  size={20}
                  onClick={() => setShowRepassword(!showRepassword)}
                />
              ) : (
                <Eye
                  color="gray"
                  size={20}
                  onClick={() => setShowRepassword(!showRepassword)}
                />
              )}
            </div>
          </div>
          {errors.repassword && (
            <span className="text-red-500 text-[12px]">
              {errors.repassword}
            </span>
          )}
        </div>
        <div className="grid gap-2  mt-2">
          <div className="flex items-center gap-2 bg-[#1e2646] rounded-md py-1 px-2">
            <Contact size={25} color="#414e7e" />
            <input
              type="text"
              placeholder={t("ho_ten_trung_voi_ngan_hang_rut_tien", {
                ns: "all",
              })}
              id="fullname"
              name="fullname"
              className="text-[#fff] placeholder-[#8491a5] bg-transparent px-[12px] rounded-[4px] text-[14px] border-transparent outline-none h-[40px] w-full"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          {errors.fullname && (
            <span className="text-red-500 text-[12px]">{errors.fullname}</span>
          )}
        </div>
        <div className="grid gap-2  mt-2">
          <div className="flex items-center gap-2 bg-[#1e2646] rounded-md py-1 px-2">
            <PhoneCall size={25} color="#414e7e" />
            <input
              type="text"
              placeholder={t("nhap_so_dien_thoai", {
                ns: "all",
              })}
              id="phone"
              name="phone"
              className="text-[#fff] placeholder-[#8491a5] bg-transparent px-[12px] rounded-[4px] text-[14px] border-transparent outline-none h-[40px] w-full"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          {errors.phone && (
            <span className="text-red-500 text-[12px]">{errors.phone}</span>
          )}
        </div>

        <button className="bg-gradient-to-r from-[#7146ff] to-[#4a69ff] rounded-[50px] text-white font-[600] text-[14px] w-full h-[50px] mt-[20px]">
          {t("dang_ky", {
            ns: "all",
          })}
        </button>
      </form>
    </div>
  );
};

export default SectionRegister;
