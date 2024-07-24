import { Link, useNavigate } from "react-router-dom";
// import "./style.css"
import "./auth.css";
import { useState } from "react";
import { cn } from "@/lib/utils";
import LoginForm from "./_components/login-form";
import RegisterForm from "./_components/register-form";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import bgLogin from "@/assets/images/login_bg.png";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import { languages } from "@/i18n";

const AuthPage = () => {
  const { t, i18n } = useTranslation([NS.ALL]);
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  const newBanner =
    i18n.language === "vi-VN" ? bgLogin : "/th-images/login_bg.png";
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const setting = data?.data.data;
  const logo = data?.data.data.logo_image;
  const [isOpen, setIsOpen] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  return (
    <div className="loginAndSignup !bg-slate-300 relative">
      <div className="cursor-pointer block  avatar-hover mr-2 mt-1 absolute top-4 left-12">
        <div className="flex items-center">
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
          <span className="text-slate-500 ml-2 w-[80px]">
            {currentLanguage?.name}
          </span>
        </div>
        <div className="absolute z-50 top-[100%] bg-transparent w-[220px] nav-hover-avatar-wrapper left-0">
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
      <div className="logo-wp">
        <img src={`${URL.baseUrl}${logo}`} alt="" className="logo" />
        {/* <img src="/icon/logo.png" alt="" className="logo" /> */}
      </div>
      <img
        // src="https://xoso66.me/server/static/img/frontend/login_bg.png"
        src={newBanner}
        className="img-wp"
      />
      <div className="default-sheet-wp">
        <div className="btns">
          <button
            type="submit"
            className="loginBtn van-button van-button--default van-button--normal van-button--block van-button--round"
            style={{
              color: "white",
              background:
                "linear-gradient(270deg, rgb(72, 105, 253) 0%, rgb(108, 69, 226) 100%)",
              border: 0,
            }}
            onClick={() => {
              setIsOpen(true);
              setTypeForm("login");
            }}
          >
            <div className="van-button__content">
              <span className="van-button__text">
                {t("click de dang nhap")}
              </span>
            </div>
          </button>
          <div
            onClick={() => {
              setIsOpen(true);
              setTypeForm("register");
            }}
            className="registerBtn"
          >
            {t("click de dang ky")}
          </div>
          <Link to="/">
            <div className="toback">
              <span>{t("xem truoc trang")}</span>
            </div>
          </Link>
          <div className="otherBtn">
            <div
              onClick={() =>
                window.open(`${setting?.link_cskh}`, "_blank", "noreferrer")
              }
            >
              <i className="icon_cs" />
              <span>{t("cskh")}</span>
            </div>
            <div onClick={() => navigate("/instruction-download")}>
              <i className="icon_app" />
              <span>{t("tai app")}</span>
            </div>
            <div onClick={() => toast.error(t("dang phat trien"))}>
              <i className="icon_game_demo" />
              <span>{t("choi thu")}</span>
            </div>
            <div>
              <i className="icon_pc_login" />
              <span>{t("may tinh")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cn("action-sheet-wp", !isOpen ? "close" : "")}>
        <div onClick={() => setIsOpen(false)} className="pullDown">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAVCAMAAAAtgX2+AAAAflBMVEUAAACNqN58ic6BjNJ7iM17iM1+jM96iMx7ic16iM17icx7ic17ic17iM19is57is96ic17icx7ic16iM17ic17jM59i896iMx6ic17ic16iM17icx8ic17ic57ic2AjMyHltKKk9h6ic16ic17iM17ic17i85+i8+EjdR6iMzijoA2AAAAKXRSTlMABG8X9Z8e8e7q1NCneEMz++fhymc+OdeumJKDVk1HFBEI3ce9s18nDoIQmE4AAAD0SURBVDjLnZTrEkMwEIVDtaVRirrf67rv/4JlGTMEwfmX3fmSs5tNSKTQhFxQQpWIGADgPc6iD7XDDGJCJ+ktnEEFUeopk2gK9HK146zzQkTpkMwHlHo7hqZ3QPkZLnULV0/xiPevDL0sZxl52TxUL6ZzWC/3Xe9t8Fmv0KFc75Gx2VtBfGKOOutoU8Lerd7U0XvK5vJwcFxtz5M93KD8XSbiHybMmGVY75Y+G0YPg58wZ4B17342bfiWMFI2hC/NHaavnpVi1BxscVShd0bGAQhaDsQWGYgy2wK+kqG9U/PPKQ8lYEf2uPdqfCzXFFNz94v5A/IOJyufQ6yQAAAAAElFTkSuQmCC"
            alt=""
          />
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAVCAMAAAAtgX2+AAAAflBMVEUAAACNqN58ic6BjNJ7iM17iM1+jM96iMx7ic16iM17icx7ic17ic17iM19is57is96ic17icx7ic16iM17ic17jM59i896iMx6ic17ic16iM17icx8ic17ic57ic2AjMyHltKKk9h6ic16ic17iM17ic17i85+i8+EjdR6iMzijoA2AAAAKXRSTlMABG8X9Z8e8e7q1NCneEMz++fhymc+OdeumJKDVk1HFBEI3ce9s18nDoIQmE4AAAD0SURBVDjLnZTrEkMwEIVDtaVRirrf67rv/4JlGTMEwfmX3fmSs5tNSKTQhFxQQpWIGADgPc6iD7XDDGJCJ+ktnEEFUeopk2gK9HK146zzQkTpkMwHlHo7hqZ3QPkZLnULV0/xiPevDL0sZxl52TxUL6ZzWC/3Xe9t8Fmv0KFc75Gx2VtBfGKOOutoU8Lerd7U0XvK5vJwcFxtz5M93KD8XSbiHybMmGVY75Y+G0YPg58wZ4B17342bfiWMFI2hC/NHaavnpVi1BxscVShd0bGAQhaDsQWGYgy2wK+kqG9U/PPKQ8lYEf2uPdqfCzXFFNz94v5A/IOJyufQ6yQAAAAAElFTkSuQmCC"
            alt=""
          />
        </div>
        <Link to={"/"}>
          <div className="back-btn-wp ">
            <ArrowLeft className=" h-4" />
            {t("quay lai")}
          </div>
        </Link>
        <div className="van-tabs van-tabs--line">
          <div className="van-tabs__content">
            <div role="tabpanel" className="van-tab__pane" style={{}}>
              {typeForm === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
            {/**/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
