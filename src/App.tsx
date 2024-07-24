import { useContext, useEffect, useState } from "react";
import useRouteElements from "./useRouteElements";
import { AppContext } from "./contexts/app.context";
import { LocalStorageEventTarget } from "./utils/auth";
import { useQuery } from "@tanstack/react-query";
import authApi from "./apis/auth.api";
import LoadingMobile from "./components/loading-mobile";
import { Helmet } from "react-helmet-async";
import homeApi from "./apis/home.api";
// import config from "./constants/config";
import ModalLoading from "./components/modal-loading";
// import NoticeModal from "./components/notice-modal";
import { LiveChatWidget } from "@livechat/widget-react";
import SpinnerLucky from "./components/Spiner/spinner-lucky";
import SpinnerLuckyMobile from "./components/Spiner/spiner-lucky-mobile";
import { URL } from "./constants/url";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { languages } from "./i18n";
function App() {
  const { i18n } = useTranslation();
  const routeElements = useRouteElements();
  const { reset, isAuthenticated, setProfile } = useContext(AppContext);
  const [checkMobile, setCheckMobile] = useState(false);

  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.getProfile(),
    enabled: isAuthenticated,
  });
  useEffect(() => {
    LocalStorageEventTarget.addEventListener("clearLS", reset);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearLS", reset);
    };
  }, [reset]);

  useEffect(() => {
    if (profileData?.data) {
      setProfile(profileData.data);
    }
  }, [profileData, setProfile]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setCheckMobile(isMobile);
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        if (!isMobile) {
          metaViewport.setAttribute("content", "width=1440,shrink-to-fit=no");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // kiểm tra lần đầu khi load trang

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const icon = data?.data.data.favicon;
  const title = data?.data.data.title;
  const chatId = checkMobile ? "" : data?.data.data.id_livechat;
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  const isFirst = localStorage.getItem("isFirst");
  const getGeoInfo = () => {
    if (isFirst) return;
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        if (data.country_code === "VN" || data.country_code === "KH") {
          if (currentLanguage?.code === "vi-VN") {
            return;
          }
          i18n.changeLanguage("vi-VN");
        } else {
          if (currentLanguage?.code === "th-TH") {
            return;
          }
          i18n.changeLanguage("th-TH");
        }

      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        localStorage.setItem("isFirst", "true");
      })
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          href={`${URL.baseUrl}${icon}`}
          sizes="16x16"
        />
        <title>{title}</title>
      </Helmet>
      {routeElements}

      <LoadingMobile />
      <ModalLoading />
      {/* <NoticeModal /> */}
      {isAuthenticated &&
        (checkMobile ? <SpinnerLuckyMobile /> : <SpinnerLucky />)}

      {chatId && <LiveChatWidget license={chatId} />}
    </>
  );
}

export default App;
