import avatarApi from "@/apis/avatar.api";
import {
  Dialog,
  DialogContent2,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import config from "@/constants/config";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Check } from "lucide-react";
import toast from "react-hot-toast";
import { AppContext } from "@/contexts/app.context";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
interface DialogRegisterSuccessProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectAvatarModal: React.FC<DialogRegisterSuccessProps> = ({
  open,
  setOpen,
}) => {
  const { t } = useTranslation([NS["ALL"]]);
  const [selected, setSelected] = useState<any>(null);
  const { profile, setProfile } = useContext(AppContext);

  const { data } = useQuery({
    queryKey: ["list-avatar"],
    queryFn: () => avatarApi.getListAvatar(),
  });

  const list = data?.data?.data;

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await avatarApi.uploadAvatar(formData);
    if (res?.data?.status && profile) {
      profile.avatar = res.data.avatar;
      setProfile(profile);
      toast.success(t("doi_avatar_thanh_cong", { ns: "all" }));
      setOpen(false);
    }
  };

  const handleChange = async () => {
    if (selected && profile) {
      const res = await avatarApi.changeAvatar({ avatar: selected });
      if (res.data?.status) {
        // @ts-ignore
        profile.avatar = selected;
        setProfile(profile);
        toast.success(t("doi_avatar_thanh_cong", { ns: "all" }));
        setOpen(false);
      }
    } else {
      toast.error(t("vui_long_chon_avatar", { ns: "all" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent2 className="m-0 p-0 max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center relative">
            <img src="/header-avatar.png" alt="" className="w-full h-[70px]" />
            <p className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white">
              {t("chon_avatar", { ns: "all" })}
            </p>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="px-[20px] py-[10px] grid gap-5  max-h-[69%] overflow-y-scroll">
            {list?.map((item: any) => {
              return (
                <div className="grid gap-2 " key={item.id}>
                  <p className="text-[16px] text-[#8491a5] ">
                    {t(item.type, { ns: "all" })}
                  </p>
                  <div className="grid grid-cols-6 gap-3">
                    {item?.images?.map((image: string) => {
                      return (
                        <div
                          className={`rounded-full h-[70px] w-[70px] p-[1px] relative ${
                            selected === image && `border-2 border-blue-700`
                          }`}
                          key={image}
                        >
                          <img
                            src={`${URL.baseUrl}${image}`}
                            className=" cursor-pointer"
                            onClick={() => setSelected(image)}
                          />
                          {selected === image && (
                            <Check
                              size={20}
                              color="#49fc03"
                              className="mx-auto absolute bottom-[-15px] left-[55%] translate-x-[-50%] translate-y-[-50%]"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <form
              className="flex items-center justify-center"
              onSubmit={handleUpload}
              encType="multipart/form-data"
            >
              <label
                htmlFor="upload"
                className="w-[60%] flex justify-center  rounded-[31px] border border-[#4869fd] text-[14px] text-[#7a88cc] text-center px-8 py-3 cursor-pointer"
              >
                {t("khong_phu_hop_tai_anh_khac_len", { ns: "all" })}
              </label>
              <input
                id="upload"
                name="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </form>
          </div>
          <div className="border"></div>
          <div className="flex items-center gap-3 justify-around mt-[5px]">
            <button
              className="rounded-[31px] border border-[#4869fd] text-[18px] text-[#7a88cc] text-center px-8 py-2 w-[45%]"
              onClick={() => setOpen(false)}
            >
              {t("huy", { ns: "all" })}
            </button>
            <button
              className="rounded-[31px]  text-[18px] bg-[#5161f7] text-[#fff] text-center px-8 py-2  w-[45%]"
              onClick={handleChange}
            >
              {t("xac_nhan", { ns: "all" })}
            </button>
          </div>
        </div>
      </DialogContent2>
    </Dialog>
  );
};

export default SelectAvatarModal;
