import agencyApi from "@/apis/agency.api";
import { useState } from "react";
import RegisterSuccess from "./modal";
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
  const { t } = useTranslation([NS["ALL"], NS["HOME"]]);
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
      newErrors.username = t("header.register.vui_long_nhap_ten_tai_khoan", {
        ns: "home",
      });
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = t("header.register.vui_long_nhap_mat_khau", {
        ns: "home",
      });
      isValid = false;
    } else if (formData.password.length < 6 || formData.password.length > 15) {
      newErrors.password = t(
        "header.register.mat_khau_phai_tu_6_den_15_ky_tu",
        { ns: "home" }
      );
      isValid = false;
    }

    if (!formData.repassword) {
      newErrors.repassword = t("header.register.vui_long_xac_nhan_mat_khau", {
        ns: "home",
      });
      isValid = false;
    }

    if (formData.password !== formData.repassword) {
      newErrors.repassword = t("header.register.mat_khau_xac_nhan_khong_khop", {
        ns: "home",
      });
      isValid = false;
    }

    if (!formData.fullname) {
      newErrors.fullname = t("header.register.vui_long_nhap_ho_ten", {
        ns: "home",
      });
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = t("header.register.vui_long_nhap_so_dien_thoai", {
        ns: "home",
      });
      isValid = false;
    } else if (!/^0\d{9}$/i.test(formData.phone)) {
      newErrors.phone = t("header.register.so_dien_thoai_khong_hop_le", {
        ns: "home",
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

  return (
    <div className="flex justify-center items-center flex-col">
      <RegisterSuccess open={open} setOpen={() => setOpen(false)} />
      <div className="h-[103px] shadow-[inset_0_-1px_0_0_rgba(156,176,240,.2)] w-[550px] flex items-center justify-center">
        <h1 className="text-[#8491a5] text-[32px] font-[600]">
          {t("dang_ky_dai_ly", { ns: "all" })}
        </h1>
      </div>
      <form className="w-[550px] px-[40px] py-[30px]" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label htmlFor="username" className="text-[14px] text-[#8491a5]">
            {t("header.login.taikhoanPlaceHolder", { ns: "home" })}
          </label>
          <input
            type="text"
            placeholder={t("header.login.taikhoanPlaceHolder", { ns: "home" })}
            id="username"
            name="username"
            className="text-[#8491a5] bg-[#f3f5f9] px-[12px] rounded-[4px] text-[12px] border-transparent outline-none h-[40px]"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className="text-red-500 text-[12px]">{errors.username}</span>
          )}
        </div>
        <div className="grid gap-2 mt-2">
          <label htmlFor="password" className="text-[14px] text-[#8491a5]">
            {t("header.register.mat_khau", { ns: "home" })}
          </label>
          <input
            type="password"
            placeholder={t("header.register.matkhauPlaceHolder", {
              ns: "home",
            })}
            id="password"
            name="password"
            className="text-[#8491a5] bg-[#f3f5f9] px-[12px] rounded-[4px] text-[12px] border-transparent outline-none h-[40px]"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="text-red-500 text-[12px]">{errors.password}</span>
          )}
        </div>
        <div className="grid gap-2  mt-2">
          <label htmlFor="repassword" className="text-[14px] text-[#8491a5]">
            {t("header.register.xac_nhan_mat_khau", { ns: "home" })}
          </label>
          <input
            type="password"
            placeholder={t("header.register.xac_nhan_them_lan_nua", {
              ns: "home",
            })}
            id="repassword"
            name="repassword"
            className="text-[#8491a5] bg-[#f3f5f9] px-[12px] rounded-[4px] text-[12px] border-transparent outline-none h-[40px]"
            value={formData.repassword}
            onChange={handleChange}
          />
          {errors.repassword && (
            <span className="text-red-500 text-[12px]">
              {errors.repassword}
            </span>
          )}
        </div>
        <div className="grid gap-2 mt-2">
          <label htmlFor="fullname" className="text-[14px] text-[#8491a5]">
            {t("header.register.ho_ten", { ns: "home" })}
          </label>
          <input
            type="text"
            placeholder={t(
              "header.register.ho_ten_can_khop_voi_ten_chu_the_de_rut_tien",
              { ns: "home" }
            )}
            id="fullname"
            name="fullname"
            className="text-[#8491a5] bg-[#f3f5f9] px-[12px] rounded-[4px] text-[12px] border-transparent outline-none h-[40px]"
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && (
            <span className="text-red-500 text-[12px]">{errors.fullname}</span>
          )}
        </div>
        <div className="grid gap-2 mt-2">
          <label htmlFor="phone" className="text-[14px] text-[#8491a5]">
            {t("header.register.so_dien_thoai", { ns: "home" })}
          </label>
          <input
            type="text"
            placeholder={t("header.register.10_chu_so_vi_du_0988888888", {
              ns: "home",
            })}
            id="phone"
            name="phone"
            className="text-[#8491a5] bg-[#f3f5f9] px-[12px] rounded-[4px] text-[12px] border-transparent outline-none h-[40px]"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className="text-red-500 text-[12px]">{errors.phone}</span>
          )}
        </div>
        <button className="bg-gradient-to-r from-[#7146ff] to-[#4a69ff] rounded-[4px] text-white font-[600] text-[14px] w-full h-[40px] mt-[40px]">
          {" "}
          {t("dang_ky", { ns: "all" })}
        </button>
      </form>
    </div>
  );
};

export default SectionRegister;
