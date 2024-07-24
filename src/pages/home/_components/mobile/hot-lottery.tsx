import { Link } from "react-router-dom";
import SectionTitleMobile from "./section-title-mobile";
import useWebSocket from "react-use-websocket";
import Config from "@/constants/config";
import { useEffect, useState } from "react";
import { formatSeconds2 } from "@/utils/utils";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface Lotte {
  lastResult: {
    gdb: string;
  };
  phien: string;
  time: number;
  lastResultXSMB: {
    gdb: string;
  };
}

const HotLottery = () => {
  const { t, i18n } = useTranslation([NS["HOME"]]);
  const newBanner =
    i18n.language === "vi-VN" ? "/betpng.png" : "/th-images/datcuoc1.png";

  const config = Config();
  const { lastMessage } = useWebSocket(URL.webSocketUrl);
  const [isShowMore, setIsShowMore] = useState(false);
  const [dataXoso, setDataXoso] = useState<{
    45: Lotte;
    75: Lotte;
    120: Lotte;
    180: Lotte;
    300: Lotte;
  }>();

  useEffect(() => {
    if (!lastMessage) return;
    const data = JSON.parse(lastMessage.data);
    const xosoData = data.xoso || {};
    if (xosoData) {
      if (xosoData && Object.keys(xosoData).length > 0) {
        Object.keys(xosoData).forEach((key) => {
          setDataXoso((prev: any) => ({
            ...prev,
            [key]: xosoData[key],
          }));
        });
      }
    }
  }, [lastMessage]);
  if (!dataXoso) return null;
  return (
    <div className="w-full hot-lottery md:hidden bg-[#3c4875]">
      <SectionTitleMobile title={t("categories.xo_so_hot_nhat")} />
      <div className="hot-lottery-container flex flex-col items-center">
        {Object.keys(dataXoso).map((key, index) => {
          if (index > 1 && !isShowMore) return <></>;
          return (
            <div key={key} className="w-full h-full relative slide">
              <Link to={`/mobile/xo-so/${key}`}>
                <div className="scroll-item2">
                  <div className="countDownBox">
                    <span className="iconfont icon-icon_clock" />
                    <div className="van-count-down">
                      {formatSeconds2(dataXoso[key as "45"]?.time || 0)}
                    </div>
                  </div>
                  <div className="keno-open-num-list-wp numbers">
                    <div className="w-full h-full">
                      <div className="ball-list">
                        {String(dataXoso[key as "45"]?.lastResult?.gdb)
                          .split("")
                          .map((item, index) => {
                            return (
                              <div key={index} className="ball row-up ball2">
                                <div className="ball-inner-wp">
                                  <span className="inner-ball lott-ball">
                                    {item}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <img alt="" className="icon" src={`/xoso/${key}.png`} />
                  <img src={`${newBanner}`} alt="" className="betNow" />
                  <div className="lottery_name">
                    {config.listLottery[key as "45"]}
                  </div>
                  <div className="info">
                    <span className="issue">
                      {t("ky", { ns: "lottery" })}:{" "}
                      {dataXoso[key as "45"]?.phien}
                    </span>
                    <div className="extra">
                      <span data-v-3d4c35fc>
                        {t("Lô 2 số", { ns: "lottery" })}
                      </span>
                      <span data-v-3d4c35fc>
                        {t("Lô 2 số 1k", { ns: "lottery" })}
                      </span>
                      <span data-v-3d4c35fc>
                        {t("Lô 2 số đầu", { ns: "lottery" })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => setIsShowMore(!isShowMore)}
        className="swiperSlideToggle"
      >
        {isShowMore
          ? t("thu gon", { ns: "all" })
          : t("xem them", { ns: "all" })}
        <div
          style={{
            transform: `rotate(${isShowMore ? "-90" : 90}deg)`,
          }}
        >
          <i className="iconfont icon-icon_fold" />
        </div>
      </div>
    </div>
  );
};

export default HotLottery;
