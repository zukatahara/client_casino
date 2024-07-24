import "./profile.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
// import config from "@/constants/config";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { clearLS } from "@/utils/auth";
import {
  formatCurrency,
  // tinhKhoangThoiGian,
  useTinhKhoangThoiGian,
} from "@/utils/utils";
import RefreshMoney from "@/components/refresh-money";
import SelectAvatarMobileModal from "./_component/select-avatar-mobile";
import authApi from "@/apis/auth.api";
import discount from "@/assets/images/img_discount.png";
import app from "@/assets/images/img_app.png";
import { IoStatsChart } from "react-icons/io5";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
const ProfilePage = () => {
  const { t, i18n } = useTranslation([NS["ALL"]]);
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  const newBanner =
    i18n.language === "vi-VN" ? discount : "/th-images/img_discount.png";
  const newBannerApp =
    i18n.language === "vi-VN" ? app : "/th-images/img_app.png";

  const { reset, profile } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const { tinhKhoangThoiGian001 } = useTinhKhoangThoiGian();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    reset();
    clearLS();
  };
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay()]
  );
  const { data } = useQuery({
    queryKey: ["banners"],
    queryFn: () => homeApi.getBannersMobile(""),
  });

  const { data: dataMessgae } = useQuery({
    queryKey: ["message"],
    queryFn: () => authApi.getListMessage(),
  });

  const { data: data2 } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });

  const setting = data2?.data.data;

  const banners = data?.data;
  const message = dataMessgae?.data.data;

  if (!banners?.status) return null;
  return (
    <div className="userCenter mine">
      <SelectAvatarMobileModal open={open} setOpen={setOpen} />
      <div className="headerBox">
        <div className="headerNav">
          <h6> {t("cua_toi", { ns: "all" })}</h6>
          <nav className="flex justify-end items-center">
            {/*  */}
            <div className="cursor-pointer  relative avatar-hover flex items-center justify-center">
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
            {/*  */}
            <div
              onClick={() => navigate("/mobile/discount")}
              data-v-1801d434
              className="chat animate__animated mission"
            >
              {/**/}
            </div>

            <div
              onClick={() => navigate("/mobile/message")}
              className="chat animate__animated animate__jello"
            >
              {(message && message.countUnread && message?.countUnread > 0 && (
                <span className="unreadMsgIcon">
                  <span className="badge-text">{message?.countUnread}</span>
                </span>
              )) ||
                ""}
            </div>
            
          </nav>
        </div>
        <div className="header">
          <div className="userInfo relative">
            <div
              data-v-3e1e0e34
              className="avatar-container"
              onClick={() => setOpen(true)}
            >
              <img
                data-v-3e1e0e34
                className="avatar-img"
                src={`${URL.baseUrl}${profile?.avatar}`}
              />
              <i data-v-3e1e0e34 className="iconfont icon-icon_edit_avatar" />
            </div>
            {profile?.level && Number(profile?.level) > 0 ? (
              <img
                className="absolute bottom-[-5px] left-[-6px] z-[50] w-8 h-8 object-contain"
                src={`${URL.baseUrl}${profile?.vipInfo?.logo}`}
                alt=""
              />
            ) : (
              <></>
            )}
            <div className="user">
              {/**/}
              <div className="flex gap-2">
                <p className="userName">
                  <span className="hi">{t("xin_chao", { ns: "all" })}, </span>{" "}
                  {profile?.username}
                </p>
                {profile?.level && Number(profile?.level) > 0 ? (
                  <img
                    className="w-16 object-contain"
                    src={`${URL.baseUrl}${profile?.vipInfo?.logo2}`}
                    alt=""
                  />
                ) : (
                  <></>
                )}
              </div>
              <p className="joinDay">
                {t("gia_nhap", { ns: "all" })}{" "}
                {tinhKhoangThoiGian001(
                  profile?.created_at || new Date(),
                  i18n.language
                )}
              </p>
            </div>
          </div>
          <Link to={"/mobile/personal"}>
            <div className="profile">
              <span> {t("trang_ca_nhan", { ns: "all" })} </span>
              <i className="iconfont icon-icon_more_white_16" />
            </div>
          </Link>
        </div>
        <div className="card moneyBox">
          <div className="money">
            <p className="userMoney">
              <span>{formatCurrency(profile?.money || 0)}</span>
            </p>
            <div className="refresh">
              <span className="myPurseText">
                {t("vi_cua_toi", { ns: "all" })}{" "}
              </span>
              <div className="refreshIconBox">
                <RefreshMoney />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mineBody ios_safe_area">
        <div className="card navigationBoxTop">
          <div className="payOrwithdraw">
            <Link to={"/mobile/recharge"}>
              <div className="pay">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
                <span> {t("nap_tien", { ns: "all" })}</span>
              </div>
            </Link>
            <Link to={"/mobile/withdraw"}>
              <div className="withdraw">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
                <span>{t("rut_tien", { ns: "all" })}</span>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-4">
            <Link to="/mobile/wallet" className="van-grid-item">
              <div className="van-grid-item__content">
                <div className="icon navigationBoxTopIcon zjzz" />
                <div className="title"> {t("vi_cua_toi", { ns: "all" })}</div>
              </div>
            </Link>
            <Link className="van-grid-item" to="/mobile/betting-record">
              <div>
                <div className="van-grid-item__content">
                  <div className="icon navigationBoxTopIcon ctjl" />
                  <div className="title">
                    {" "}
                    {t("lich_su_cuoc", { ns: "all" })}
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/mobile/withdraw-history" className="van-grid-item">
              <div className="van-grid-item__content">
                <div className="icon navigationBoxTopIcon zjmx" />
                <div className="title">
                  {" "}
                  {t("lich_su_rut_tien", { ns: "all" })}
                </div>
              </div>
            </Link>

            <Link to="/mobile/transaction">
              <div className="van-grid-item">
                <div className="van-grid-item__content">
                  <div className="icon navigationBoxTopIcon tzjl" />
                  <div className="title">
                    {t("lich_su_nap_tien", { ns: "all" })}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="card promote">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container h-auto">
              {banners &&
                banners.data &&
                banners.data.length > 0 &&
                banners.data.map((banner, index) => (
                  <div className="embla__slide" key={index}>
                    <img
                      className="w-full h-full rounded-lg"
                      src={`${URL.baseUrl}${banner.link}`}
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="discount-wrapper">
          <Link to={"/mobile/discount"} className="discount relative">
            <img
              src={newBanner}
              // src="https://xoso66.me/mobile/static/img/img_discount.18dd3efc.png"
              alt=""
            />
            {/* <div className="absolute right-0 bottom-0 h-[20px] bg-white mb-[6px] py-[13px] px-[5px] flex justify-center items-center rounded-tl-lg rounded-br-lg">
              <span className="text-[13px] font-bold text-red-500">Đang phát triển</span>
            </div> */}
          </Link>
          <div className="discount relative">
            <img
              src={newBannerApp}
              // src="https://xoso66.me/mobile/static/img/img_app.b50c2537.png"
              alt=""
            />
            <div className="absolute right-0 bottom-0 h-[20px] bg-white mb-[6px] py-[13px] px-[5px] flex justify-center items-center rounded-tl-lg rounded-br-lg">
              <span className="text-[13px] font-bold text-blue-500">
                {t("dang_phat_trien", { ns: "all" })}
              </span>
            </div>
          </div>
        </div>
        <div className="card navigationBox">
          <h6> {t("tinh_nang_chinh", { ns: "all" })}</h6>
          <div className="van-grid">
            {/* <div className="van-grid-item" style={{ flexBasis: "20%" }}>
              <Link to={"/mobile/my-vip"} className="van-grid-item__content">
                <div className="rounded-full border-white border-2 flex items-center p-1  m-1 ">
                  <RiVipCrownLine className="text-white" fontSize={"7vw"} />
                </div>
                <span className="title">VIP</span>
              </Link>
            </div> */}
            <div className="van-grid-item" style={{ flexBasis: "20%" }}>
              <Link
                to={"/mobile/my-transaction"}
                className="van-grid-item__content"
              >
                <div className="rounded-full border-white border-2 flex items-center p-1  m-1">
                  <IoStatsChart className="text-white" fontSize={"7vw"} />
                </div>
                <span className="title">
                  {t("chi_tiet_giao_dich", { ns: "all" })}
                </span>
              </Link>
            </div>
            <div className="van-grid-item" style={{ flexBasis: "20%" }}>
              <Link
                to={"/mobile/betting-record"}
                className="van-grid-item__content"
              >
                <div className="icon">
                  <span className="iconfont icon-icon_ucenter_lssy" />
                </div>
                <span className="title">
                  {" "}
                  {t("thang_thua", { ns: "all" })}{" "}
                </span>
              </Link>
            </div>
            <Link
              to={"/mobile/agency"}
              className="van-grid-item"
              style={{ flexBasis: "20%" }}
            >
              <div className="van-grid-item__content">
                <div className="icon">
                  <span className="iconfont icon-icon_ucenter_dlzx" />
                </div>
                <span className="title"> {t("dai_ly", { ns: "all" })}</span>
              </div>
            </Link>
            <Link to={"/mobile/result-history"}>
              <div className="van-grid-item" style={{ flexBasis: "20%" }}>
                <div className="van-grid-item__content">
                  <div className="icon">
                    <span className="iconfont icon-icon_ucenter_kjjg" />
                  </div>
                  <span className="title"> {t("chi_tiet", { ns: "all" })}</span>
                </div>
              </div>
            </Link>
            <Link
              to={`${setting?.link_cskh}`}
              target="_blank"
              className="van-grid-item"
              style={{ flexBasis: "20%" }}
            >
              <div className="van-grid-item__content">
                <div className="icon">
                  <span className="iconfont icon-icon_ucenter_kfzx" />
                </div>
                <span className="title">
                  {t("cham_soc_khach_hang", { ns: "all" })}
                </span>
              </div>
            </Link>
            <Link
              to={"/mobile/help"}
              className="van-grid-item"
              style={{ flexBasis: "20%" }}
            >
              <div className="van-grid-item__content">
                <div className="icon">
                  <span className="iconfont icon-icon_ucenter_bzzx" />
                </div>
                <span className="title"> {t("tro_giup", { ns: "all" })}</span>
              </div>
            </Link>
            <Link
              target="_blank"
              to={setting?.link_telegram as string}
              className="van-grid-item"
              style={{ flexBasis: "20%" }}
            >
              <div className="van-grid-item__content">
                <div className="icon">
                  <span className="iconfont icon-icon_ucenter_yqpy" />
                </div>
                <span className="title">{t("cong_dong", { ns: "all" })}</span>
              </div>
            </Link>
            {/* <div className="van-grid-item" style={{ flexBasis: "20%" }}>
              <div className="van-grid-item__content">
                <div className="icon">
                  <span className="iconfont icon-icon_ucenter_banbh" />
                </div>
                <span className="title"> 1.8.0 </span>
              </div>
            </div> */}
            {/* <div className="van-grid-item" style={{ flexBasis: "20%" }}>
              <div className="van-grid-item__content">
                <div className="icon">
                  <span className="iconfont icon-icon_ucenter_qlhc" />
                </div>
                <span className="title"> Xoá cache </span>
              </div>
            </div> */}
            <div
              className="van-grid-item"
              style={{ flexBasis: "20%", display: "none" }}
            >
              <div className="van-grid-item__content">
                <div className="icon">
                  <span className="iconfont icon-icon_ucenter_gywm" />
                </div>
                <span className="title">
                  {t("cap_nhat_app", { ns: "all" })}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div onClick={() => handleLogout()} className="logout">
          <div className="logoutBtn"> {t("dang_xuat", { ns: "all" })} </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
