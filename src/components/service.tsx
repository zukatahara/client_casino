import { useState } from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const Service = () => {
  const { t } = useTranslation(NS["HOME"]);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const [isOpen, setIsOpen] = useState(true);
  // const { setTheme } = useTheme();
  const [openHover, setOpenHover] = useState({
    phone: false,
    gmail: false,
    tele: false,
  });
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const handleCopy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => toast.success(t("appInfo.sao_chep_thanh_cong")));
  };
  const setting = data?.data.data;
  return (
    <div
      id="serviceFloat"
      className={cn(
        "service-wp serviceFloat smallWindow hidden md:block",
        isOpen ? "w-[90px]" : "w-[35px]"
      )}
    >
      <div className="service">
        <div
          className={cn(
            "service-item-wp bg-[#FFFFFFCC] dark:bg-[#1B233D7F] transition-all",
            !isOpen ? "opacity-0 invisible" : ""
          )}
        >
          <div className="itemsContent">
            {/* <div data-v-7810f260 className="themes">
              <span
                onClick={() => setTheme("light")}
                data-v-7810f260
                className="themeBtn white"
              />
              <span
                onClick={() => setTheme("dark")}
                data-v-7810f260
                className="themeBtn black"
              />
            </div> */}

            {/**/}
            {/**/}
            {setting?.link_cskh && (
              <Link
                target="_blank"
                to={`${setting?.link_cskh}`}
                className="service-item "
              >
                <i className="iconfont icon-icon_customer_service" />

                <span className="text-[#273569] dark:text-white">
                  {t("appInfo.cskh")}
                </span>
              </Link>
            )}
            {/**/}
            {/**/}
            {/**/}
            {/* <div className="service-item">
              <i className="iconfont icon-icon_game_demo" />

              <span>Chơi thử</span>
            </div> */}
            {/**/}
            {/**/}
            {/**/}
            {/* <div className="service-item chatroom">
              <i className="iconfont icon-icon_nav_chatroom_nor"></i>
              <span>Phòng chat</span>
            </div> */}
            {/**/}
            {/* {setting?.link_telegram && (
              <Link target="_blank" to={setting?.link_telegram as string}>
                <span className="el-popover__reference-wrapper">
                  <div
                    className="service-item el-popover__reference bg-white dark:bg-[#031c32E6]"
                    aria-describedby="el-popover-8841"
                    tabIndex={0}
                  >
                    <i className="iconfont icon-icon_send"></i>
                    <span>Cộng đồng</span>
                  </div>
                </span>
              </Link>
            )} */}
            {setting?.link_telegram && (
              <Link
                target="_blank"
                to={setting?.link_telegram as string}
                className="relative"
              >
                <span
                  className="el-popover__reference-wrapper"
                  onMouseEnter={() =>
                    setOpenHover((old) => {
                      const temp = { ...old };
                      temp.tele = true;
                      return temp;
                    })
                  }
                  onMouseLeave={() =>
                    setOpenHover((old) => {
                      const temp = { ...old };
                      temp.tele = false;
                      return temp;
                    })
                  }
                >
                  <div
                    className="service-item el-popover__reference bg-white dark:bg-[#031c32E6]"
                    aria-describedby="el-popover-8841"
                    tabIndex={0}
                  >
                    <i className="iconfont icon-icon_send"></i>
                    <span className="text-[#273569] dark:text-white">
                      {t("appInfo.cong_dong")}
                    </span>
                  </div>
                </span>
                <div
                  className={`absolute dark:bg-[#333] bg-white py-3 px-4 border rounded-sm top-0 left-[-357px] ${
                    openHover.tele === false && "hidden"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src="/service/telegram-white.png"
                      className="w-[22px] h-[22px]"
                    />
                    <div className="grid">
                      <span className="dark:text-white text-base">
                        {t("appInfo.telegram")}
                      </span>
                      <span className="text-[#4a69ff]">
                        {setting?.link_telegram || "0356276123"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {setting?.phone_number && (
              <div className="relative">
                <span
                  className="el-popover__reference-wrapper"
                  onMouseEnter={() =>
                    setOpenHover((old) => {
                      const temp = { ...old };
                      temp.phone = true;
                      return temp;
                    })
                  }
                  onMouseLeave={() =>
                    setOpenHover((old) => {
                      const temp = { ...old };
                      temp.phone = false;
                      return temp;
                    })
                  }
                >
                  <div
                    className="service-item el-popover__reference bg-white dark:bg-[#031c32E6]"
                    aria-describedby="el-popover-8841"
                    tabIndex={0}
                  >
                    <img
                      className="iconfont"
                      src={`/service/phone_pc.png`}
                      height={40}
                      width={40}
                    />
                    <span className="text-[#273569] dark:text-white">
                      {t("appInfo.phone")}
                    </span>
                  </div>
                </span>
                <div
                  className={`absolute dark:bg-[#333] bg-white py-3 px-4 border rounded-sm top-0 left-[-140px] ${
                    openHover.phone === false && "hidden"
                  }`}
                >
                  <div
                    onClick={() => handleCopy(setting?.phone_number || "")}
                    className="grid"
                  >
                    <span className="dark:text-white text-base">
                      {t("appInfo.lien_he_ho_tro")}
                    </span>
                    <span className="text-[#4a69ff]">
                      {setting?.phone_number}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {setting?.email && (
              <div className="relative">
                <span
                  className="el-popover__reference-wrapper"
                  onMouseEnter={() =>
                    setOpenHover((old) => {
                      const temp = { ...old };
                      temp.gmail = true;
                      return temp;
                    })
                  }
                  onMouseLeave={() =>
                    setOpenHover((old) => {
                      const temp = { ...old };
                      temp.gmail = false;
                      return temp;
                    })
                  }
                >
                  <div
                    className="service-item el-popover__reference bg-white dark:bg-[#031c32E6]"
                    aria-describedby="el-popover-8841"
                    tabIndex={0}
                  >
                    <img
                      className="iconfont"
                      src={`/service/gmail_pc.png`}
                      height={40}
                      width={40}
                    />
                    <span className="text-[#273569] dark:text-white">
                      {t("appInfo.gmail")}
                    </span>
                  </div>
                  <div
                    className={`absolute dark:bg-[#333] bg-white py-3 px-4 border rounded-sm top-0 left-[-215px] ${
                      openHover.gmail === false && "hidden"
                    }`}
                  >
                    <div
                      onClick={() => handleCopy(setting?.email || "")}
                      className="grid"
                    >
                      <span className="dark:text-white text-base">
                        {t("appInfo.gmail_chinh_thuc")}
                      </span>
                      <span className="text-[#4a69ff]">{setting?.email}</span>
                    </div>
                  </div>
                </span>
              </div>
            )}
            {/**/}
            {/**/}
            {/**/}
            {/**/}
            <div onClick={() => navigate("/instruction-download")}>
              <span className="el-popover__reference-wrapper">
                <div
                  className="service-item el-popover__reference bg-white dark:bg-[#031c32E6]"
                  aria-describedby="el-popover-1411"
                  tabIndex={0}
                >
                  <i className="iconfont icon-icon_floatbar_phone"></i>
                  <span
                    className="text-[#273569] dark:text-white"
                    style={{
                      // @ts-ignore
                      textWrap: "nowrap",
                    }}
                  >
                    {t("appInfo.tai_app")}
                  </span>
                </div>
              </span>
            </div>
            {/**/}
            {/**/}
            {/**/}
            {/**/}
            <div className="service-item" onClick={() => scrollToTop()}>
              <i className="iconfont icon-icon_download_btn rotate-180"></i>
              <span
                className="text-[#273569] dark:text-white"
                style={{
                  // @ts-ignore
                  textWrap: "nowrap",
                }}
              >
                {t("appInfo.ve_dau")}
              </span>
            </div>
            {/**/}
            {/**/}
            {/**/}
            {/**/}
            {/**/}
          </div>
        </div>
      </div>
      <div className={cn("btns", isOpen ? "w-[90px]" : "w-[40px]")}>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="x-btn move_left dark:bg-[#22293c]"
          >
            <div className="iconfont">
              <Icons.right className="text-slate-300" />
            </div>
          </div>
        )}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="x-btn move_right dark:bg-[#22293c]"
          >
            <div className="iconfont">
              <Icons.left className="text-slate-300" />
            </div>
          </div>
        )}
      </div>
      {/**/}
    </div>
  );
};

export default Service;
