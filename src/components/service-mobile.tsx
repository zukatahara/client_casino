import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const ServiceMobile = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const [valueSelect, setValueSelect] = useState("");
  const setting = data?.data.data;
  const handleCopy = () => {
    navigator.clipboard
      .writeText(valueSelect)
      .then(() => toast.success(t("sao_chep_thanh_cong", { ns: "all" })));
  };
  return (
    <div>
      <div
        id="serviceFloat-mobile"
        style={{
          zIndex: 95,
        }}
        className={cn(
          "fixed right-0 top-[30dvh] w-[100px]  md:hidden",
          !isOpen
            ? "!w-[100px] fold-left-enter-active h-[250px]"
            : "!w-[100px] fold-left-leave-active translate50 h-[0]"
        )}
      >
        <div className="service relative h-[240px] !w-[100px]">
          <img src={"/common/bg-service.png"} className="w-[100px] h-[250px]" />
          <div className="absolute  right-0 left-0 top-0 flex flex-col items-end justify-center h-[240px]">
            <div className="icon w-[50px]  flex flex-col justify-around h-full">
              {setting?.link_cskh && (
                <Link
                  to={setting?.link_cskh || "#"}
                  target={setting?.link_cskh ? "_blank" : ""}
                  className="flex justify-center"
                >
                  <img
                    src={"/service/cskh.png"}
                    className="w-[35px] mt-3 h-[35px]"
                  />
                </Link>
              )}
              {setting?.link_telegram && (
                <Link
                  to={setting?.link_telegram || "#"}
                  className="flex justify-center"
                  target={setting?.link_telegram ? "_blank" : ""}
                >
                  <img
                    src={"/service/telegram.png"}
                    className="w-[35px] mt-3 h-[35px]"
                  />
                </Link>
              )}
              {setting?.link_zalo && (
                <Link
                  to={setting?.link_zalo || "#"}
                  target={setting?.link_zalo ? "_blank" : ""}
                  className="flex justify-center"
                >
                  <img
                    src={"/service/zalo.png"}
                    className="w-[35px] mt-3 h-[35px]"
                  />
                </Link>
              )}
              {setting?.phone_number && (
                <div
                  className="flex justify-center"
                  onClick={() => {
                    if (setting?.phone_number) {
                      setOpen(true);
                      setValueSelect(setting?.phone_number || "");
                    }
                  }}
                >
                  <img
                    src={"/service/phone.png"}
                    className="w-[35px] mt-3 h-[35px]"
                  />
                </div>
              )}
              {setting?.email && (
                <div
                  onClick={() => {
                    if (setting?.email) {
                      setOpen(true);
                      setValueSelect(setting?.email || "");
                    }
                  }}
                  className="flex justify-center"
                >
                  <img
                    src={"/service/mail.png"}
                    className="w-[35px] mt-3 h-[35px]"
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className="absolute text-white top-[-3px] left-[0px] block items-center w-[116px] h-[40px] mt-[26px] text-center"
            style={{
              transform: " rotate(90deg)",
              transformOrigin: "0 100%",
            }}
            onClick={() => setIsOpen((old) => !old)}
          >
            {t("lien_he_24_7", { ns: "all" })}
            <span className="text-xs font-normal pl-[27px] hidden"></span>
          </div>
        </div>

        {/**/}
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent
          className={`w-[90vw] md:w-[900px] rounded-xl z-[99999] bg-[#202225]`}
        >
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              {t("loi_nhac", { ns: "all" })}
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-3 justify-center">
            <span>{valueSelect}</span>
            <Copy color="#4a69ff" onClick={() => handleCopy()} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceMobile;
