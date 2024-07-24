import { useContext, useEffect, useState } from "react";
import GameNavBar from "../_components/game-nav-bar";
import SelectForm from "./_components/select-form";
import TaiXiuHistory from "./_components/taixiu-history";
import "./tai-xiu.css";
import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "react-use-websocket";
import { AppContext } from "@/contexts/app.context";
import GameCountTime from "@/components/game-count-time";
// import BellMobile from "./_components/bell-mobile";
import OrderForm from "./_components/order-form";
import { Link, useParams } from "react-router-dom";
import SpineAnimation from "./_components/roll-mobibe";
// import GuideOnlyIcon from "@/components/guide_only_icon";
import GuideMobileSicbo from "./_components/GuideMobile";
import { URL } from "@/constants/url";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import result from "@/assets/images/result.afae4654.png";

const TaiXiuMobile = () => {
  const config = Config();
  const { t, i18n } = useTranslation(NS.sicbo);
  const newBanner =
    i18n.language === "vi-VN" ? result : "/th-images/result_sicbo.png";
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [first, setFirst] = useState(true);
  const [muted, setMuted] = useState(false);
  const { id } = useParams();
  const [theLoai, setTheLoai] = useState<string>("20");
  const [noiDungTheLoai, setNoiDungTheLoai] = useState({
    title: "Siêu Tốc 1 Phút",
  });
  const { auth } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [socketUrl] = useState(URL.webSocketUrl);
  const [results, setResults] = useState<{ value: string }[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [resultDelay, setResultDelay] = useState("");
  const { lastMessage, sendJsonMessage } = useWebSocket(socketUrl);
  // const [ketQua, setKetQua] = useState(config.ketQuaDice.slice(0, 3));
  const [historySicbo, setHistorySicbo] = useState<
    {
      id: string;
      ketqua: {
        value: string;
        img: string;
        img3D: string;
      }[];
      md5: string;
      hash: string;
      date: Date;
      phien: number;
    }[]
  >([]);
  const [infoPhien, setInfoPhien] = useState({
    hu: 0,
    md5: "",
    phien: 0,
    time: Number(id),
    lastResultSicbo: {
      ketqua: "",
    },
  });
  const [order, setOrder] = useState<{
    value: string;
    totalPrice: number;
    tiLe: number;
  }>({
    value: "",
    totalPrice: 0,
    tiLe: 0,
  });

  const [page] = useState(1);

  useEffect(() => {
    if (id) {
      setTheLoai(id);
      setNoiDungTheLoai({
        title: config.listSicbo[id as unknown as keyof typeof config.listSicbo],
      });
    }
  }, [id]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);

      const taixiuData = data.taixiu || {};
      const noticeData = data.notice || {};

      if (noticeData.msg === "Đăng nhập thành công") {
        handleHistory();
        // console.log("đăng nhập thành công");
      }

      if (taixiuData.info) {
        if (taixiuData.info.theloai == theLoai) {
          setInfoPhien(taixiuData.info);
          setTimeout(() => {
            setResultDelay(taixiuData.info.lastResultSicbo.ketqua);
          }, 2000);
        }
      }

      if (taixiuData.getphien) {
        if (taixiuData.getphien.status === true) {
          const history = taixiuData.getphien.data.map(
            (item: { ketqua: string }) => {
              // console.log(item);

              const result = config.ketQuaDice
                .flatMap((i) => {
                  const count = item.ketqua
                    .split(",")
                    .filter((val: string) => val === i.value).length;
                  return Array(count).fill(i);
                })
                .slice(0, 3);

              return { ...item, ketqua: result };
            }
          );
          if (!history?.[1]?.ketqua) {
            return;
          }

          // setKetQua(history[0].ketqua);
          // console.log(history.slice(1));
          if (first) {
            // setKetQua(history[1].ketqua);
            setFirst(false);
          } else {
            // setKetQua(history[0].ketqua);
          }
          if (page === 1) {
            setHistorySicbo(history);
          } else {
            setHistorySicbo(history);
          }

          setResults(history[1].ketqua);

          // console.log("history", history);

          // console.log("ket qua", ketQua);
          // console.log('history',history[0].ketqua);

          // const result = config.ketQuaDice
          //   .flatMap((item) => {
          //     const count = history[0].ketqua.filter(
          //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
          //       (val: any) => val === item.value
          //     ).length;
          //     return Array(count).fill(item);
          //   })
          //   .slice(0, 3);

          // const numbers = taixiuData.finish.ketqua.map((number: string) =>
          //   parseInt(number)
          // );
          // const sum = numbers.reduce((acc: number, curr: number) => acc + curr, 0);

          // if(result && result.length > 0){
          //   setKetQua(result);
          // }
        }
      }
      // console.log('finish',taixiuData?.finish);

      if (taixiuData.finish) {
        if (taixiuData.finish.ketqua) {
          queryClient.invalidateQueries(["profile"]);
          handleHistory();
        }
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    // if (!isLoading && ketQua) {
    //   setResults(ketQua);
    // }
    handleGetTiLe();
  }, [isLoading]);

  const handleGetTiLe = () => {
    sendJsonMessage({
      taixiu: { getTiLe: true },
    });
  };

  const handleHistory = () => {
    sendJsonMessage({
      taixiu: { getphien: true, theloai: theLoai, page },
    });
  };

  useEffect(() => {
    const handleLogin = () => {
      sendJsonMessage({
        auth: { token: auth },
      });
    };

    if (auth) {
      handleLogin();
    }
  }, [auth, sendJsonMessage]);

  useEffect(() => {
    handleHistory();
  }, [theLoai, page]);

  return (
    <div className="lottery-mobile">
      <GameNavBar title={noiDungTheLoai.title} />
      <div className="scrollList">
        <div className="bingo-home">
          <div className="bingo-table-wp">
            <div className="left-p">
              <div className="icon-wp flex justify-center mb-2">
                {/* <div className="i-signal"></div> */}
                <GuideMobileSicbo
                  content={{
                    c: config.cachChoiSicbo || "",
                    title: "",
                  }}
                />
                <div
                  className={`trumpet ${muted && "close"}`}
                  onClick={() => setMuted((data) => !data)}
                ></div>
              </div>
              <img src={`/sicbo/SICBO${theLoai}.png`} alt="" className="img" />
              <div className="issue">{infoPhien.phien}</div>
            </div>
            <div className="middle-p relative flex justify-center items-center">
              {results && (
                // <BellMobile
                //   setIsLoading={setIsLoading}
                //   result={ketQua}
                //   time={infoPhien.time}
                //   maxTime={Number(id)}
                // />

                <SpineAnimation
                  result={infoPhien.lastResultSicbo.ketqua}
                  setIsLoading={setIsLoading}
                  time={infoPhien?.time || 0}
                  maxTime={Number(id)}
                  muted={muted}
                  id={infoPhien.phien}
                />
              )}
            </div>
            <div className="right-p mt-[20px] flex flex-col items-center justify-start gap-0 pr-5">
              <div onClick={() => setIsOpenHistory(true)} className="result">
                {resultDelay &&
                  resultDelay
                    .split(",")
                    .map((item, index) => (
                      <div key={index} className={`num-${item}`}></div>
                    ))}
              </div>
              <div className="res-info flex gap-2">
                <div className="sum">
                  {infoPhien.lastResultSicbo?.ketqua
                    ?.split(",")
                    .reduce((a: any, b: any) => Number(a) + Number(b), 0)}
                </div>
                <div>
                  {infoPhien.lastResultSicbo?.ketqua
                    ?.split(",")
                    .reduce((a: any, b: any) => Number(a) + Number(b), 0) < 11
                    ? t("xiu")
                    : t("tai")}
                </div>
                <div>
                  {infoPhien.lastResultSicbo?.ketqua
                    ?.split(",")
                    .reduce((a: any, b: any) => Number(a) + Number(b), 0) %
                    2 ===
                  0
                    ? t("chan")
                    : t("le")}
                </div>
              </div>
              <GameCountTime timeLeft={infoPhien.time} />
            </div>
          </div>
          <div className="panel-wp mb-4">
            <SelectForm order={order} setOrder={setOrder} />
            <TaiXiuHistory history={historySicbo} />
          </div>
          {isOpenHistory && (
            <div
              // onClick={() => setIsOpenHistory(false)}
              className="history-pop van-overlay"
            >
              <div
                className="history-result-wp"
                style={{
                  backgroundImage: `url(${newBanner})`,
                }}
              >
                <div
                  onClick={() => setIsOpenHistory(false)}
                  className="result_title"
                >
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAMAAACdUboEAAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOXRSTlMAEe3NljD7Zwb38xsmCfDeuxV655pTIMk72J+GdXJjXUm/tbCli4FqWeLRxKqPTkA0KtWtOCwNRmDNVIFrAAAD5klEQVRYw8WZZ5eqMBCGg4WlqCCirL333q6b///H7lnGJJgNGXDPuff9REkeJpOZSYzkn8uqHHqlztUfT2elxar855e042Jr0le1S03jXd6x41ClTH9YzY/7E6ypRk5YycczFjWKyJydcwCXwMOYpawOPRVpUo1x2P9qPo6H1XI/8V5ffWUCBonZtadLaWz1VdhIMKe4mfWJaL4dqKNvNLN5G++EAM9r8flbejN373BvDrXAzwK3r4yMJaRMfU2zERtNIYPLb3wCu+kWMuDYzZSjc4YMiFp3FoULklEH1mOg9swacbXKiMazz0j1dvzM2BHJoVb76XiFnxaqr+FyvWdsWD9m5ZkpQ5JTlYLa+daFzRoutS22VN56APQzUvC+rgO1pE7e0QSQzeSzPTxb5QLJ9lySoeggY0bHLRvZhcCpvEu0ICqL4gEEwExqt9ofU8K625PWwiEY+cnum3AvVesBpfRDBSwXKN1JRkKch+x+Gt9OpI47CkgVkNbktS5G1J6mG6bkV9AHBaQKSK/ycmwnGU3g/0jMEiBVwKIhN76yYYueHUJwpBoozPLgps2iW4PEgMSgsVpxeMN1neBINRBUFKXrEzZxhGiQCFAkchfiDiYPQeqAEmbO4AhSAxRD3UAkgwMQpA4opsMR1e1BEKQjgGpBnnxfbVmSI0gESKAifu+9NvHVnSBIDEhg6XZ5gGtrYxlG1CM6eTzEo/jqpAOyHduHjgiNDL6XOCJAHAnVx+LV8YAAiyGCrMKq/X3Z0W4rRWCX9MgzrM9iIQsxIEGQUM7G8SYQLjEghgzil6V4KwQpYSFADDkVzrMg2G8IEEPWWMjwxA4QIII8wVTDSPvxTYQAEeQiuc8pU2UeVjhQgVypczBgd8qaGzKgCrmW662wSljcqMo9AahEetKz2avnWvCBpbQr3FBfXb66ZmEkeciUCFAsPDkkUw8jpIYskx1hwAP5yYjpDibuiVAE33DfJG4hGFl3kdt09x5wQHlOC/maX4yYKpDGtbpqspxzfmB1owwV0oXH7Xpu4uy5UKZ9KarmBM6hn31P8wb18yEDzW/2ITvzMPJbSGfat5vMYWl1qN5X7D1kLa4WO025GGmf5OdR8yzOXLFzj7WbPoodQ3oHNK59fmrawnZhoMlN187d86OzCAnhvsmZfqo77yHn0R3qoNuacjXmJ8V89Iuihb0kuIwdTag27T+4n+qfg87LmealTDJpxHpxSxrtKLqs5bNYp2dlLicBdEaOht18h9cNPc8OW7nL3tA3U3mX4L0FxO35tmK0xfnpV/8sBJ2oxoe6uXaRfxWyetWtnG7nlkH+k/4C8kFceXh7vBsAAAAASUVORK5CYII=" />
                </div>
                <div className="result-list-wp">
                  {historySicbo &&
                    historySicbo.map((item, index) => {
                      const sum = item.ketqua.reduce(
                        (
                          a: number,
                          b: {
                            value: string;
                          }
                        ) => a + Number(b.value),
                        0
                      );
                      return (
                        <div className="res-item" key={index}>
                          <div className="issue">
                            {t("ky")}：{item?.phien}
                          </div>
                          <div className="dice-wp">
                            {item?.ketqua.map((item, index) => (
                              <div
                                key={index}
                                className={`dice-${item.value}`}
                              />
                            ))}
                            <div className="open_results">{sum}</div>
                            <div className="open_results name">
                              {sum < 11 ? t("xiu") : t("tai")}
                            </div>
                            <div className="open_results name">
                              {sum % 2 === 0 ? t("chan") : t("le")}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <Link
                  to={`/mobile/result-history?type=${theLoai}&gameType=sicbo`}
                  className="btn result-btn"
                >
                  <span>{t("xem them")}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <OrderForm
        theloai={id as string}
        order={order}
        setOrder={setOrder}
        time={infoPhien.time}
      />
    </div>
  );
};

export default TaiXiuMobile;
