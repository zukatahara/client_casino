import GameCountTime from "@/components/game-count-time";
import "./xoso.css";
import GameNavBar from "../_components/game-nav-bar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { OrderProps } from "@/types/order.type";
// import { HistoryProps, minCuocProps, tiLeProps } from "@/pages/lottery/xo-so";
import { AppContext } from "@/contexts/app.context";
import useWebSocket from "react-use-websocket";
import SelectForm from "./_components/select-form";
import OrderForm from "./_components/order-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import moment from "moment";
import { cn } from "@/lib/utils";
// import SelectType from "./_components/select-type";
import Detail from "./_components/detail";
import { soNhan } from "@/constants/constants";
import { URL } from "@/constants/url";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

let interval: any;

export interface HistoryProps {
  id: number;
  date: Date;
  gdb: string;
  g1: string;
  g2: string;
  g3: string;
  g4: string;
  g5: string;
  g6: string;
  g7: string;
  g8: string;
  dauduoi: {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
  };
  kiSo: string;
}

export interface minCuocProps {
  id: number;
  type: string;
  de: number;
  lo2: number;
  xien2: number;
  xien3: number;
  xien4: number;
  daude: number;
  "3cang": number;
  dau: number;
  duoi: number;
}

export interface tiLeProps {
  id: number;
  type: string;
  de: number;
  lo2: number;
  xien2: number;
  xien3: number;
  xien4: number;
  daude: number;
  "3cang": number;
  dau: number;
  duoi: number;
}

const XosoMobilePage = () => {
  const config = Config();
  const { t } = useTranslation(NS.lottery);
  const [secondOrder, setSecondOrder] = useState<OrderProps[]>([]);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const queryClient = useQueryClient();
  const [timeLeft2, setTimeLeft2] = useState(0);
  const { id } = useParams();
  const [theLoai, setTheLoai] = useState<string>();
  const [order, setOrder] = useState<OrderProps>({
    value: "",
    price: 0,
    tiLe: 0,
    soNhan: 0,
    type: "",
  });
  const { data: dataResult } = useQuery({
    queryKey: ["results", theLoai],
    queryFn: () =>
      gameApi.getHistoryGameLottery({
        startDate: `${moment()
          .subtract(1, "years")
          .format("YYYY-MM-DD")} 00:00:00`,
        endDate: `${moment().format("YYYY-MM-DD")} 23:59:59`,
        type: theLoai,
        gameType: "lottery",
        page: 1,
      }),
    enabled: !!theLoai,
  });
  const [tiLe, setTiLe] = useState<minCuocProps>();
  const [minCuoc, setMinCuoc] = useState<tiLeProps>();
  const { lastMessage, sendJsonMessage } = useWebSocket(URL.webSocketUrl);
  const { auth } = useContext(AppContext);

  const [phien, setPhien] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [noiDungTheLoai, setNoiDungTheLoai] = useState({
    title: "Siêu Tốc 1 Phút",
  });
  useEffect(() => {
    const handleLogin = () => {
      sendJsonMessage({
        auth: { token: auth },
      });
    };

    handleLogin();
  }, [auth, sendJsonMessage]);

  useEffect(() => {
    if (id) {
      setTheLoai(id);
      setNoiDungTheLoai({
        title: config.listLottery[id as keyof typeof config.listLottery],
      });
      if (id.includes("xsmn") || id.includes("xsmt")) {
        //@ts-ignore
        setMinCuoc(soNhan["xsmn"]);
      } else {
        //@ts-ignore
        setMinCuoc(soNhan["xsmb"]);
      }
      setOrder({
        value: "",
        price: 0,
        tiLe: 0,
        soNhan: 0,
        type: "",
      });
    }
  }, [id]);

  useEffect(() => {
    handleHistory();
    handleGetTiLe();
  }, [theLoai, auth]);
  useEffect(() => {
    if (timeLeft === Number(id)) {
      handleHistory();
      handleGetTiLe();
      queryClient.refetchQueries(["results", id]);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!theLoai) return;
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);

      if (data.notice) {
        if (data.notice.msg === "Đăng nhập thành công") {
          handleHistory();
          handleGetTiLe();
        }
      }

      if (data.xoso) {
        if (data.xoso[theLoai]?.nextPhien) {
          const renderTime = () => {
            if (!Number.isNaN(Number(theLoai))) return;
            const now = new Date().getTime() / 1000;
            const end = new Date(timeEnd).getTime() / 1000;
            // if(theLoai !== typeTime){
            //   setTypeTime(theLoai)
            //   clearInterval(interval)
            // }
            if (now < end) {
              setTimeLeft2(Math.ceil(end - now));
            } else {
              setTimeLeft2(0);
            }
          };
          setPhien(data.xoso[theLoai]?.nextPhien?.phien);
          const timeEnd = data.xoso[theLoai]?.nextPhien?.timeEnd;
          if (!interval) {
            interval = setInterval(renderTime, 1000);
          } else {
            clearInterval(interval);
            interval = setInterval(renderTime, 1000);
          }
        }
        if (data.xoso[theLoai]) {
          if (data.xoso[theLoai].time) {
            setTimeLeft(data.xoso[theLoai].time);
          }
          if (data.xoso[theLoai].phien) {
            setPhien(data.xoso[theLoai].phien);
          }
        }

        if (data.xoso.tile) {
          setTiLe(data.xoso.tile[0]);
        }
      }
    }
  }, [lastMessage, theLoai]);

  const handleHistory = () => {
    sendJsonMessage({
      xoso: { nextPhien: true, theloai: theLoai },
    });
  };

  const handleGetTiLe = () => {
    sendJsonMessage({
      xoso: { getTiLe: true },
    });
  };

  const history = dataResult?.data.data.data || [];
  return (
    <div className="lottery-mobile">
      <GameNavBar title={noiDungTheLoai.title} />
      <div className="scrollList">
        <div className="wrapper-tontent">
          <div className="openResult">
            <div style={{ padding: 0 }} className="top">
              <div className="icon-img-wp">
                <img
                  alt=""
                  src={`/xoso/${theLoai}.png`}
                  // "https://www.xoso66.me/server/static/lottery_logo/v1/mien-bac.png?v=20231030"
                />
                <div className="icon-live text-slate-900 line-clamp-1">
                  {noiDungTheLoai.title}
                </div>
              </div>
              <div className="lottery-info-wp">
                <div className="info-top-wp">
                  <div className="lottery-name">{noiDungTheLoai.title}</div>
                  <div className="issue">
                    <div className="status"> {t("dang mo keo")} </div>
                  </div>
                </div>
                <div className="issueText">
                  <i>{phien}</i>
                </div>
                <div className="info-bottom-wp">
                  <div className="van-count-down">
                    <GameCountTime
                      timeLeft={
                        Number.isNaN(Number(theLoai)) ? timeLeft2 : timeLeft
                      }
                    />
                  </div>
                  <div
                    onClick={() => setIsOpenHistory(!isOpenHistory)}
                    className="moreDataBox"
                  >
                    <i className="iconfont icon-icon_lotteryinfo" />
                    <div className="dataBtn">
                      <span className="iconfont icon-icon_lorreryhistory" />{" "}
                      {t("ket qua")}
                      <span
                        className={cn(
                          "iconfont icon-icon_drop_down_solid",
                          isOpenHistory ? "isOpenList" : ""
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="line"></div>
            <div
              className={cn(
                "results-list-wp",
                isOpenHistory ? "scrollHeightOpenAni" : "scrollHeightCloseAni"
              )}
            >
              <div className="wrapper-content">
                <div className="results-item-wp">
                  <Detail lottery={history[0]} />
                </div>
                {isOpenHistory &&
                  history.slice(1).map((item, index) => (
                    <div key={index} className="results-item-wp">
                      <Detail lottery={item} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="line"></div>
            <SelectForm
              order={order}
              setOrder={setOrder}
              min={minCuoc}
              tiLe={tiLe}
              secondOrder={secondOrder}
              setSecondOrder={setSecondOrder}
              theLoai={theLoai || ""}
            />
            {order.value && <div className="w-full h-[200px]"></div>}
          </div>
        </div>
      </div>
      <OrderForm
        secondOrder={secondOrder}
        setSecondOrder={setSecondOrder}
        id={id}
        order={order}
        setOrder={setOrder}
        timeLeft={Number.isNaN(Number(theLoai)) ? timeLeft2 : timeLeft}
      />
    </div>
  );
};

export default XosoMobilePage;
