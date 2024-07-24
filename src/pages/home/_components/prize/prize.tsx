// import config from "@/constants/config";
import SectionTitle from "../section-title";
import PrizeBall from "./prize-ball";
import PrizeResult from "./prize-result";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import { formatSeconds2 } from "@/utils/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

// import required modules
// import { Grid, Navigation } from "swiper/modules";

// import sicbo20 from "@/assets/images/SICBO20.png";
// import sicbo30 from "@/assets/images/SICBO30.png";
import sicbo60 from "@/assets/images/SICBO60.png";
import sicbo120 from "@/assets/images/SICBO120.png";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
interface Lotte {
  lastResult: {
    gdb: string;
  };
  time: number;
  lastResultXSMB: {
    gdb: string;
  };
}

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

const Prize = () => {
  const { t } = useTranslation([NS["HOME"]]);
  // const swiperRef = useRef<SwiperClass>();
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

  return (
    <div className="container md:max-w-7xl mx-auto mt-5 box-border overflow-hidden hidden md:block">
      <SectionTitle title={t("categories.ket_qua_xo_so")} />
      <div className="relative">
        <div className="grid grid-cols-3 gap-7 mb-2">
          {dataSicbo &&
            dataSicbo["60"] &&
            dataSicbo["60"]?.lastResultSicbo?.ketqua && (
              <PrizeResult
                title={t("sicbo 60", { ns: "config" })}
                imageUrl={sicbo60}
                playInfo={[
                  t("keo doi", { ns: "lottery" }),
                  t("tong", { ns: "lottery" }),
                  t("so don", { ns: "lottery" }),
                ]}
                results={dataSicbo["60"]?.lastResultSicbo?.ketqua.split(",")}
                time={formatSeconds2(dataSicbo["60"]?.time || 0)}
                link="/lottery/tai-xiu/60"
              />
            )}
          {dataSicbo &&
            dataSicbo["120"] &&
            dataSicbo["120"]?.lastResultSicbo?.ketqua && (
              <PrizeResult
                title={t("sicbo 120", { ns: "config" })}
                imageUrl={sicbo120}
                playInfo={[
                  t("keo doi", { ns: "lottery" }),
                  t("tong", { ns: "lottery" }),
                  t("so don", { ns: "lottery" }),
                ]}
                results={dataSicbo["120"]?.lastResultSicbo?.ketqua.split(",")}
                time={formatSeconds2(dataSicbo["120"]?.time || 0)}
                link="/lottery/tai-xiu/120"
              />
            )}
          {dataXoso && dataXoso["45"] && (
            <PrizeBall
              title={t("45", { ns: "config" })}
              imageUrl={`/xoso/45.png`}
              playInfo={[
                t("Lô 2 số", { ns: "lottery" }),
                t("Lô 2 số 1k", { ns: "lottery" }),
                t("Lô 2 số đầu", { ns: "lottery" }),
              ]}
              balls={String(dataXoso["45"]?.lastResult?.gdb).split("")}
              time={formatSeconds2(dataXoso["45"]?.time || 0)}
              link="/lottery/xo-so/45"
            />
          )}
          {dataXoso && dataXoso["75"] && (
            <PrizeBall
              title={t("75", { ns: "config" })}
              imageUrl={`/xoso/75.png`}
              playInfo={[
                t("Lô 2 số", { ns: "lottery" }),
                t("Lô 2 số 1k", { ns: "lottery" }),
                t("Lô 2 số đầu", { ns: "lottery" }),
              ]}
              balls={String(dataXoso["75"]?.lastResult?.gdb).split("")}
              time={formatSeconds2(dataXoso["75"]?.time || 0)}
              link="/lottery/xo-so/75"
            />
          )}
          {dataXoso && dataXoso["120"] && (
            <PrizeBall
              title={t("120", { ns: "config" })}
              imageUrl={`/xoso/120.png`}
              playInfo={[
                t("Lô 2 số", { ns: "lottery" }),
                t("Lô 2 số 1k", { ns: "lottery" }),
                t("Lô 2 số đầu", { ns: "lottery" }),
              ]}
              balls={String(dataXoso["120"]?.lastResult?.gdb).split("")}
              time={formatSeconds2(dataXoso["120"]?.time || 0)}
              link="/lottery/xo-so/120"
            />
          )}
          {dataXoso && dataXoso["180"] && (
            <PrizeBall
              title={t("300", { ns: "config" })}
              imageUrl={`/xoso/180.png`}
              playInfo={[
                t("Lô 2 số", { ns: "lottery" }),
                t("Lô 2 số 1k", { ns: "lottery" }),
                t("Lô 2 số đầu", { ns: "lottery" }),
              ]}
              balls={String(dataXoso["180"]?.lastResult?.gdb).split("")}
              time={formatSeconds2(dataXoso["180"]?.time || 0)}
              link="/lottery/xo-so/180"
            />
          )}
        </div>
        {/* <Swiper
          breakpoints={{
            300: {
              slidesPerView: 1,
              grid: {
                rows: 1,
              },
            },
            768: {
              slidesPerView: 3,
              grid: {
                rows: 2,
              },
            },
          }}
          grid={{
            rows: 2,
            fill: "row",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={30}
          modules={[Grid, Navigation]}
        >
          <SwiperSlide>
            {dataSicbo &&
              dataSicbo["20"] &&
              dataSicbo["20"]?.lastResultSicbo?.ketqua && (
                <PrizeResult
                  title="Sicbo 20 giây"
                  imageUrl={sicbo20}
                  playInfo={["Kèo đôi", "Tổng", "Số đơn"]}
                  results={dataSicbo["20"]?.lastResultSicbo?.ketqua.split(",")}
                  time={formatSeconds2(dataSicbo["20"]?.time || 0)}
                  link="/lottery/tai-xiu/20"
                />
              )}
          </SwiperSlide>
          <SwiperSlide>
            {dataSicbo &&
              dataSicbo["30"] &&
              dataSicbo["30"]?.lastResultSicbo?.ketqua && (
                <PrizeResult
                  title="Sicbo 30 giây"
                  imageUrl={sicbo30}
                  playInfo={["Kèo đôi", "Tổng", "Số đơn"]}
                  results={dataSicbo["30"]?.lastResultSicbo?.ketqua.split(",")}
                  time={formatSeconds2(dataSicbo["30"]?.time || 0)}
                  link="/lottery/tai-xiu/30"
                />
              )}
          </SwiperSlide>

          <SwiperSlide>
            {dataXoso && dataXoso["45"] && (
              <PrizeBall
                title={"Miền Bắc VIP 45 giây"}
                imageUrl={
                  `/xoso/45.png`
                }
                playInfo={["Lô 2 Số", "Lô 2 Số 1k", "Lô 2 số"]}
                balls={String(dataXoso["45"]?.lastResult?.gdb).split("")}
                time={formatSeconds2(dataXoso["45"]?.time || 0)}
                link="/lottery/xo-so/45"
              />
            )}
          </SwiperSlide>
          <SwiperSlide>
            {dataXoso && dataXoso["75"] && (
              <PrizeBall
                title={"Miền Bắc VIP 75 giây"}
                imageUrl={
                  `/xoso/75.png`
                }
                playInfo={["Lô 2 Số", "Lô 2 Số 1k", "Lô 2 số"]}
                balls={String(dataXoso["75"]?.lastResult?.gdb).split("")}
                time={formatSeconds2(dataXoso["75"]?.time || 0)}
                link="/lottery/xo-so/75"
              />
            )}
          </SwiperSlide>
          <SwiperSlide>
            {dataXoso && dataXoso["120"] && (
              <PrizeBall
                title={"Miền Bắc VIP 2 phút"}
                imageUrl={
                  `/xoso/120.png`
                }
                playInfo={["Lô 2 Số", "Lô 2 Số 1k", "Lô 2 số"]}
                balls={String(dataXoso["120"]?.lastResult?.gdb).split("")}
                time={formatSeconds2(dataXoso["120"]?.time || 0)}
                link="/lottery/xo-so/120"
              />
            )}
          </SwiperSlide>
          <SwiperSlide>
            {dataXoso && dataXoso["180"] && (
              <PrizeBall
                title={"Miền Bắc VIP 3 phút"}
                imageUrl={
                  `/xoso/180.png`
                }
                playInfo={["Lô 2 Số", "Lô 2 Số 1k", "Lô 2 số"]}
                balls={String(dataXoso["180"]?.lastResult?.gdb).split("")}
                time={formatSeconds2(dataXoso["180"]?.time || 0)}
                link="/lottery/xo-so/180"
              />
            )}
          </SwiperSlide>
        </Swiper> */}
      </div>
    </div>
  );
};

export default Prize;
