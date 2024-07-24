import { Link } from "react-router-dom";
import UserAuthForm from "./user-auth-form";
import { useContext, useEffect, useState } from "react";
import moment from "@/lib/moment";
import NavRouters from "./nav-routers";
import { AppContext } from "@/contexts/app.context";
import { UserAccountNav } from "./user-account-nav";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { Icons } from "./icons";
import RefreshMoney from "./refresh-money";
import authApi from "@/apis/auth.api";
import "./header.scss";
import iconTopup from "@/assets/images/icon-topup.b7d5be80.svg";
import iconWithdraw from "@/assets/images/icon-withdraw.7122f604.svg";
import iconWallet from "@/assets/icons/icon-wallet.svg";

import { useTranslation } from "react-i18next";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import { NS } from "@/constants/ns";
import { URL } from "@/constants/url";

const NavBar = () => {
  const { isAuthenticated, profile } = useContext(AppContext);
  const { t, i18n } = useTranslation([NS["HOME"], NS["ALL"]]);
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const { data: dataMessgae } = useQuery({
    queryKey: ["message"],
    queryFn: () => authApi.getListMessage(),
  });

  const [time, setTime] = useState("");
  useEffect(() => {
    updateTime();
    setInterval(updateTime, 1000);
  }, []);
  function updateTime() {
    const currentDate = moment().format("DD/MM/yyyy h:mm:ss");
    const timeZone = "(GMT+7)";
    const clockStr = `${currentDate} ${timeZone}`;
    setTime(clockStr);
  }
  const message = dataMessgae?.data.data;
  const logo = data?.data.data.logo_image;

  return (
    // <div className="hidden md:block md:fixed top-0 inset-x-0 h-fit bg-white dark:bg-[#292e3b] z-[10] shadow-lg">
    //   <div className="w-full border-b border-slate-100 dark:border-slate-700">
    <div
      className="hidden md:block md:fixed top-0 inset-x-0 h-fit z-[10] shadow-lg relative"
      style={{ background: "url(/background/bg_header.jpg)" }}
    >
      <div className="w-full">
        <div className="h-full flex items-center justify-between gap-2 py-2 container md:max-w-7xl mx-auto">
          {/* logo */}
          <Link to="/" className="flex gap-2 items-center">
            {logo && (
              <img
                src={`${URL.baseUrl}${logo}`}
                className="h-20 w-52 object-contain"
                alt=""
              />
            )}
            {/* <img src={Logo} className="h-14 w-52" alt="" /> */}
          </Link>
          <div className="h-full flex flex-col">
            <div className="w-full flex items-center justify-end h-6 mb-4 gap-2">
              {/* <Link target="_blank" to={"https://about.ins87.com/"}>
                <button
                  type="button"
                  className="el-button btn-2 flex justify-center items-center dark:bg-[#1e222c]"
                >
                  <Icons.video className="text-slate-400 w-4 h-4 mr-1" />
                  <span className="text-sm">Thương hiệu</span>
                </button>
              </Link> */}
              {/* <button
                type="button"
                className="el-button btn-2 flex justify-center items-center dark:bg-[#1e222c]"
              >
                <Icons.message className="text-slate-400 w-4 h-4 mr-1" />
                <span>Phòng chat</span>
              </button> */}
              {isAuthenticated && profile && (
                <>
                  <Link
                    to={"/settings/message"}
                    className="el-button btn-2 flex justify-center items-center"
                    style={{
                      background: "linear-gradient(180deg,#76a2ff,#8691ff)",
                      color: "#ffffff",
                      position: "relative",
                    }}
                  >
                    <Icons.bell className="text-white w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {t("tin_nhan", { ns: "all" })}
                    </span>
                    {(message?.countUnread && message.countUnread > 0 && (
                      <div className="badge">
                        <div className="badge-text">
                          {message?.countUnread || 0}
                        </div>
                      </div>
                    )) ||
                      ""}
                  </Link>
                  <Link to={"/settings/bet-history"}>
                    <button
                      type="button"
                      className="el-button btn-2 flex justify-center items-center"
                      style={{
                        background: "linear-gradient(180deg,#76a2ff,#8691ff)",
                        color: "#ffffff",
                      }}
                    >
                      <Icons.scrollText className="text-white w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {" "}
                        {t("lich_su", { ns: "all" })}
                      </span>
                    </button>
                  </Link>
                </>
              )}
              <div className="cursor-pointer block relative avatar-hover mr-4">
                <div className="dropdown switch-language">
                  <div className="cursor-pointer flex items-center relative z-40">
                    <div className="switch-language__img">
                      <img
                        src={currentLanguage?.icon}
                        className="switch-language__img-active w-6 h-6"
                      />
                    </div>
                    {/**/}
                  </div>
                  {/**/}
                  {/**/}
                </div>
                <div className="absolute z-50 top-[100%] right-[-100px] bg-transparent w-[220px] nav-hover-avatar-wrapper">
                  <div className="nav-hover-avatar">
                    {languages.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            i18n.changeLanguage(item.code);
                          }}
                          key={index}
                          className={cn(
                            "nav-hover-avatar__item flex items-center cursor-pointer",
                            {
                              "border border-green-500":
                                item.code === currentLanguage?.code,
                            }
                          )}
                        >
                          <img src={item.icon} className="mr-2 w-6 h-6" />
                          <span className="whitespace-nowrap text-white text-[13px]">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400">{time}</div>
            </div>
            <div className="w-full flex justify-end items-center">
              {isAuthenticated && profile && (
                <>
                  <nav className="userNav">
                    <Link to={"/settings/charge"}>
                      <button
                        type="button"
                        className="el-button el-button--default btn-charge"
                      >
                        <span>
                          <img
                            data-v-706d3717
                            // src="https://www.xoso66.me/home/static/img/icon-topup.b7d5be80.svg"
                            src={iconTopup}
                            alt=""
                          />
                          <span className="text-sm">
                            {" "}
                            {t("nap_tien", { ns: "all" })}
                          </span>
                        </span>
                      </button>
                    </Link>
                    <Link to={"/settings/my-purse"}>
                      <button
                        type="button"
                        className="el-button el-button--default btn-myPurse"
                      >
                        <span>
                          <img src={iconWallet} alt="" />
                          <span> {t("chuyen_quy", { ns: "all" })}</span>
                        </span>
                      </button>
                    </Link>
                    <Link to={"/settings/draw"}>
                      <button
                        type="button"
                        className="el-button el-button--default btn-draw"
                      >
                        <span>
                          <img data-v-706d3717 src={iconWithdraw} alt="" />
                          <span className="text-sm">
                            {" "}
                            {t("rut_tien", { ns: "all" })}
                          </span>
                        </span>
                      </button>
                    </Link>
                  </nav>
                  <UserAccountNav user={profile as User} />
                  <RefreshMoney className="ml-2 translate-y-3" />
                </>
              )}
              {!isAuthenticated && <UserAuthForm />}
            </div>
          </div>
        </div>
      </div>
      <div
        data-v-43445a92=""
        className="w-[1400px] absolute mx-auto h-[2px]"
        style={{
          left: "calc(50% - 700px)",
          background: "url(/background/hr_gold.svg) no-repeat",
          backgroundSize: "100% 2px",
        }}
      />
      <NavRouters />
    </div>
  );
};

export default NavBar;
