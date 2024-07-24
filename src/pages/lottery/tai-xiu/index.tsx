// import Bell from "@/components/bell";
import GameCountTime from "@/components/game-count-time";
import { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import TaiXiuHistory from "./_components/taixiu-history";
import MothuongHistory from "./_components/mothuong-history";
import { Card } from "@/components/ui/card";
import OrderForm from "../_components/order-form";
import SelectForm from "./_components/select-form";
import { useQueryClient } from "@tanstack/react-query";
import { AppContext } from "@/contexts/app.context";
import { useParams } from "react-router-dom";
import SpineAnimation from "./_components/rollDice";
import "./tai-xiu.css";
import GuideOnlyIcon from "@/components/guide_only_icon";
// interface Sicbo {
//   time: number;
//   hu: number;
//   theloai: number;
//   phien: number;
//   lastResultSicbo: {
//     phien: string;
//     theloai: string;
//     ketqua: string;
//   };
// }

import table from "@/assets/images/table-bg.c45104a4.png";
import { URL } from "@/constants/url";
import Config from "@/constants/config";

const TaiXiuPage = () => {
  const config = Config();
  // const [first, setFirst] = useState(true);
  const { id } = useParams();
  const [muted, setMuted] = useState(false);
  const [theLoai, setTheLoai] = useState<string>("20");
  const [noiDungTheLoai, setNoiDungTheLoai] = useState({
    title: "Siêu Tốc 1 Phút",
  });
  const { auth } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [socketUrl] = useState(URL.webSocketUrl);
  // const [results, setResults] = useState<{ value: string }[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { lastMessage, sendJsonMessage } = useWebSocket(socketUrl);
  // const [ketQua, setKetQua] = useState(config.ketQuaDice.slice(0, 3));
  const [lastResult, setLastResult] = useState("6,6,6");
  const [lastResultDelay, setLastResultDelay] = useState("6,6,6");
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
      }

      if (taixiuData.info) {
        if (taixiuData.info.theloai == theLoai) {
          setInfoPhien(taixiuData.info);
          setLastResult(taixiuData.info.lastResultSicbo.ketqua);
          setTimeout(() => {
            setLastResultDelay(taixiuData.info.lastResultSicbo.ketqua);
          }, 2000);
        }
      }

      if (taixiuData.getphien) {
        if (taixiuData.getphien.status === true) {
          const history = taixiuData.getphien.data.map(
            (item: { ketqua: string }) => {
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

          if (!history[1]?.ketqua) {
            return;
          }

          // setKetQua(history[0].ketqua);
          // console.log(history.slice(1));
          // console.log(history);
          // if (first) {
          //   setKetQua(history[1].ketqua);
          //   setFirst(false);
          // } else {
          //   setKetQua(history[0].ketqua);
          // }
          setHistorySicbo(history);

          // setResults(history[1].ketqua);
        }
      }
    }
    // return ()=>clearTimeout(timer)
  }, [lastMessage]);

  useEffect(() => {
    // if (!isLoading && ketQua) {
    //   setResults(ketQua);
    // }
    handleGetTiLe();
  }, [isLoading]);

  useEffect(() => {
    if (infoPhien.time && infoPhien.time === 2) {
      setTimeout(() => {
        queryClient.invalidateQueries(["profile"]);
        handleHistory();
      }, 12000);
    }
  }, [infoPhien.time]);

  const handleGetTiLe = () => {
    sendJsonMessage({
      taixiu: { getTiLe: true },
    });
  };

  const handleHistory = () => {
    sendJsonMessage({
      taixiu: { getphien: true, theloai: theLoai },
    });
  };

  // console.log(historySicbo);

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
  }, [theLoai]);

  return (
    <>
      <Card className={"border-slate-50 dark:border-slate-700 py-4 w-3/5"}>
        <h4 className="text-base text-slate-500 dark:text-slate-200">
          <div className="flex items-center px-4 pb-2">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAM1BMVEUAAAAzPD40ODs1ODs1ODs1ODs1ODs1ODs1ODs1Nzs1ODs1ODs1ODs1ODs1Nzs1ODs1ODuLv5NVAAAAEHRSTlMACynU5le0gKAZ8cRuN0eOCGadGAAAAr1JREFUSMeFVVu2IyEIbMW3orX/1U5jE23nJDN83HNjKB5FQa5ltqI4ohpCGiO25n1na/P10yq+Wmm/AIAxOVvu3rcWR0qhVnIFsN/9DcrxMXNn+SegfwdkOHHyLd6hqUAs/ACwOBEOcxSSE9+KELs5/Nvqj2pIsXm2j8PA3TDNb8Yb4nB7dc76ti1iCCAOgcT9XmC+t+WRJFz2oASkVwabNcBpHUHCkUO82CGYNTFm1C8ABt3jESN7N4RP0ABvKH5n+jIANwIq9ggT2q9Z4gaV2T4KD4QPGfEV1ZuDDgv3UO+MKZqiYeyghLoFSrAWpI22u5So7IXlHwA4LVXpIGWsFKjji6IExxXFbzo66qcfkIItaIuEL5MWgQNtptd+Mtwp7A54xSWjdHhUbx/AjgyYmakgKrKg5okkAmZCi2K1vCkXIdRtuVgC9VinUMMscQBYAQk8KalmTSNiWo1shEaI+JyOWpfKw60BTHcaujcTgXH/pUWmlwR+i64MHfhGxOyWR0TTRpRNrfVEOCVYtaGN7J7UODWjiJKPzRqLo2c+bajjEhDGsVm2IFnD9nadUNINy8LTidAJekzrwoE8vnZyCaGtGiYuuSJRCrIh/oLwcOusrlyI7c6XZ5HuM0rbAlkRnQI2pQRgllrTtRDDySO/F4fWejsKReZubseJaHc2uOTza/nPg2se7XJ++qQbZuc1nwfsrQ011TBVvUzKC5VL78G6uqcuKh7RpP3atvybOJ3ZWIa0FWn73PC3NjbY2aOf9aEgv7Sx3+uD6EEC6U4uAtTs+mIjIvqpcz2QWxv7EwmC0afOeWhVhL59gGz193COVRB3FgiXJWvQYjYg4GWFKmkffHnyT6ED4V1Fkt/D0Xy3WW+sINRMj3Wq6R+2Edye9EE6+A+CbUvldXH+i5hGSS/O/xHRudTy389/ADZyKbQ/jwhzAAAAAElFTkSuQmCC"
              alt=""
              className="w-8 h-8 mr-2"
            />
            {noiDungTheLoai.title}
          </div>
          <div>
            <div
              style={{
                backgroundImage: `url(${table})`,
              }}
              className=" h-72 bg-cover bg-no-repeat bg-center px-20 space-y-6"
            >
              <div className="flex w-full">
                <div className="w-[148px] flex flex-col justify-center items-center space-y-2 mt-16">
                  <img
                    src={`/sicbo/SICBO${id}.png`}
                    className="w-[121px] h-18"
                    alt=""
                  />
                  <div className="text-base text-white">{infoPhien.phien}</div>
                  <GameCountTime timeLeft={infoPhien?.time || Number(id)} />
                </div>
                <div className="flex justify-center items-center w-2/3 relative middle-p">
                  {/* {results && (
                    <Bell
                      setIsLoading={setIsLoading}
                      result={ketQua}
                      time={infoPhien?.time || 0}
                      maxTime={Number(id)}
                    />
                  )} */}

                  <SpineAnimation
                    result={lastResult}
                    setIsLoading={setIsLoading}
                    time={infoPhien?.time || 0}
                    maxTime={Number(id)}
                    id={infoPhien.phien}
                    muted={muted}
                  />
                </div>
                <div className="flex justify-center items-center w-1/3 flex-col space-y-4 mt-16">
                  <div className="icon-wp">
                    {/* <div className="i-signal"></div> */}
                    <GuideOnlyIcon
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
                  <div className="text-base text-white">
                    {infoPhien.phien - 1}
                  </div>
                  <div className="w-full flex gap-3 items-center">
                    {lastResultDelay &&
                      lastResultDelay
                        ?.split(",")
                        .map((item, index) => (
                          <div
                            key={index}
                            className={`dice dice-main dice-${item}`}
                          ></div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-6">
              <div className="rounded-md bg-slate-200 dark:bg-slate-700 px-10 py-4">
                <SelectForm order={order} setOrder={setOrder} />
              </div>
              <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <TaiXiuHistory history={historySicbo} />
                <MothuongHistory history={historySicbo} />
              </div>
            </div>
          </div>
        </h4>
      </Card>
      <OrderForm
        theloai={theLoai}
        phien={infoPhien}
        order={order}
        setOrder={setOrder}
        time={infoPhien?.time || 0}
      />
    </>
  );
};

export default TaiXiuPage;
