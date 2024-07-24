import SectionTitleMobile from "./section-title-mobile";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useWebSocket from "react-use-websocket";
// import config from "@/constants/config";
import { formatSeconds2 } from "@/utils/utils";
// import sicbo20 from "@/assets/images/SICBO20.png";
// import sicbo30 from "@/assets/images/SICBO30.png";
// import sicbo40 from "@/assets/images/SICBO40.png";
import sicbo60 from "@/assets/images/SICBO60.png";
import sicbo120 from "@/assets/images/SICBO120.png";
import sicbo180 from "@/assets/images/SICBO180.png";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
interface Sicbo {
  time: number;
  hu: number;
  theloai: number;
  phien: number;
  lastResultSicbo: {
    phien: string;
    theloai: string;
    ketqua: string;
  };
}

const Lottery = () => {
  const { t, i18n } = useTranslation([NS["HOME"]]);
  const newBanner =
    i18n.language === "vi-VN" ? "/betpng.png" : "/th-images/datcuoc1.png";
  const swiperRef = useRef<SwiperClass>();
  const { lastMessage } = useWebSocket(URL.webSocketUrl);
  const [dataSicbo, setDataSicbo] = useState<{
    20: Sicbo;
    30: Sicbo;
    40: Sicbo;
    50: Sicbo;
    60: Sicbo;
    90: Sicbo;
    120: Sicbo;
    180: Sicbo;
    300: Sicbo;
  }>();
  useEffect(() => {
    if (!lastMessage) return;
    const data = JSON.parse(lastMessage.data);
    const sicboData = data.taixiu || {};
    if (sicboData) {
      if (sicboData.info) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setDataSicbo((prev: any) => ({
          ...prev,
          [sicboData.info.theloai]: sicboData.info,
        }));
      }
    }
  }, [lastMessage]);
  return (
    <div className="w-full lottery md:hidden">
      <SectionTitleMobile title={t("categories.tro_xo_so")} />
      <div className="relative swiper-container">
        <Swiper
          slidesPerView={1.6}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          modules={[Navigation]}
        >
          {dataSicbo &&
            dataSicbo["60"] &&
            dataSicbo["60"]?.lastResultSicbo?.ketqua && (
              <SwiperSlide>
                <Link to={"/mobile/tai-xiu/60"}>
                  <div className="scroll-item">
                    <div className="countDownBox">
                      <span className="iconfont icon-icon_clock"></span>
                      <div className="van-count-down">
                        {formatSeconds2(dataSicbo["60"]?.time || 0)}
                      </div>
                    </div>
                    <div className="dice-wp">
                      <div className="open_results mr-1">
                        {dataSicbo["60"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0)}
                      </div>
                      <div className="open_results name mr-1">
                        {dataSicbo["60"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0) < 11
                          ? t("xiu", { ns: "sicbo" })
                          : t("tai", { ns: "sicbo" })}
                      </div>
                      <div className="open_results name">
                        {dataSicbo["60"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0) %
                          2 ===
                        0
                          ? t("chan", { ns: "sicbo" })
                          : t("le", { ns: "sicbo" })}
                      </div>
                      {dataSicbo["60"]?.lastResultSicbo?.ketqua
                        .split(",")
                        .map((item, index) => (
                          <div
                            key={index}
                            className={`dice dice-${item}`}
                          ></div>
                        ))}
                    </div>
                    <div className="issue">
                      {dataSicbo["60"]?.lastResultSicbo?.phien}
                    </div>
                    <img
                      // src="https://xoso66.me/server/static/lottery_logo/sicbo/icon/SICBO20.png?v=20231014"
                      src={sicbo60}
                      alt=""
                      className="icon"
                    />
                    <img src={newBanner} alt="" className="betNow" />
                  </div>
                </Link>
              </SwiperSlide>
            )}
          {dataSicbo &&
            dataSicbo["120"] &&
            dataSicbo["120"]?.lastResultSicbo?.ketqua && (
              <SwiperSlide>
                <Link to={"/mobile/tai-xiu/120"}>
                  <div className="scroll-item">
                    <div className="countDownBox">
                      <span className="iconfont icon-icon_clock"></span>
                      <div className="van-count-down">
                        {formatSeconds2(dataSicbo["120"]?.time || 0)}
                      </div>
                    </div>
                    <div className="dice-wp">
                      <div className="open_results mr-1">
                        {dataSicbo["120"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0)}
                      </div>
                      <div className="open_results name mr-1">
                        {dataSicbo["120"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0) < 11
                          ? t("xiu", { ns: "sicbo" })
                          : t("tai", { ns: "sicbo" })}
                      </div>
                      <div className="open_results name">
                        {dataSicbo["120"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0) %
                          2 ===
                        0
                          ? t("chan", { ns: "sicbo" })
                          : t("le", { ns: "sicbo" })}
                      </div>
                      {dataSicbo["120"]?.lastResultSicbo?.ketqua
                        .split(",")
                        .map((item, index) => (
                          <div
                            key={index}
                            className={`dice dice-${item}`}
                          ></div>
                        ))}
                    </div>
                    <div className="issue">
                      {dataSicbo["120"]?.lastResultSicbo?.phien}
                    </div>
                    <img
                      // src="https://xoso66.me/server/static/lottery_logo/sicbo/icon/SICBO20.png?v=20231014"
                      src={sicbo120}
                      alt=""
                      className="icon"
                    />
                    <img src={newBanner} alt="" className="betNow" />
                  </div>
                </Link>
              </SwiperSlide>
            )}
          {dataSicbo &&
            dataSicbo["180"] &&
            dataSicbo["180"]?.lastResultSicbo?.ketqua && (
              <SwiperSlide>
                <Link to={"/mobile/tai-xiu/180"}>
                  <div className="scroll-item">
                    <div className="countDownBox">
                      <span className="iconfont icon-icon_clock"></span>
                      <div className="van-count-down">
                        {formatSeconds2(dataSicbo["180"]?.time || 0)}
                      </div>
                    </div>
                    <div className="dice-wp">
                      <div className="open_results mr-1">
                        {dataSicbo["180"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0)}
                      </div>
                      <div className="open_results name mr-1">
                        {dataSicbo["180"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0) < 11
                          ? t("xiu", { ns: "sicbo" })
                          : t("tai", { ns: "sicbo" })}
                      </div>
                      <div className="open_results name">
                        {dataSicbo["180"]?.lastResultSicbo?.ketqua
                          .split(",")
                          .reduce((a, b) => Number(a) + Number(b), 0) %
                          2 ===
                        0
                          ? t("chan", { ns: "sicbo" })
                          : t("le", { ns: "sicbo" })}
                      </div>
                      {dataSicbo["180"]?.lastResultSicbo?.ketqua
                        .split(",")
                        .map((item, index) => (
                          <div
                            key={index}
                            className={`dice dice-${item}`}
                          ></div>
                        ))}
                    </div>
                    <div className="issue">
                      {dataSicbo["180"]?.lastResultSicbo?.phien}
                    </div>
                    <img
                      // src="https://xoso66.me/server/static/lottery_logo/sicbo/icon/SICBO20.png?v=20231014"
                      src={sicbo180}
                      alt=""
                      className="icon"
                    />
                    <img src={newBanner} alt="" className="betNow" />
                  </div>
                </Link>
              </SwiperSlide>
            )}
        </Swiper>
      </div>
    </div>
  );
};

export default Lottery;
