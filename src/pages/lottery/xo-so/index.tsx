import { Card } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { AppContext } from "@/contexts/app.context";
// import { useToast } from "@/hooks/use-toast";
import HeadTitle from "./_components/head-title";
import HeadResult from "./_components/head-result";
import MainResult from "./_components/main-result";
import SelectForm from "./_components/select-form";
import OrderForm from "./_components/order-form";
import { OrderProps } from "@/types/order.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import moment from "moment";
import { soNhan } from "@/constants/constants";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import { URL } from "@/constants/url";
import Config from "@/constants/config";

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

const XosoPage = () => {
  const queryClient = useQueryClient();
  const config = Config();
  const { t } = useTranslation(NS.lottery);
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
  const [secondOrder, setSecondOrder] = useState<OrderProps[]>([]);
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
        title: config.listLottery[id as "45"],
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
    <>
      <Card className={"border-slate-50 dark:border-slate-700 py-4 w-3/5"}>
        <HeadTitle title={noiDungTheLoai.title} />
        <HeadResult
          theloai={theLoai || ""}
          timeLeft={Number.isNaN(Number(theLoai)) ? timeLeft2 : timeLeft}
          result={!Number.isNaN(Number(theLoai)) ? history[0] : history[0]}
          phien={phien}
          t={t}
        />
        <MainResult
          history={!Number.isNaN(Number(theLoai)) ? history.slice(1) : history}
          theloai={theLoai}
          t={t}
        />
        <SelectForm
          order={order}
          setOrder={setOrder}
          min={minCuoc}
          tiLe={tiLe}
          secondOrder={secondOrder}
          setSecondOrder={setSecondOrder}
          theloai={theLoai || ""}
          t={t}
        />
      </Card>
      <OrderForm
        title={noiDungTheLoai.title}
        min={minCuoc}
        order={order}
        setOrder={setOrder}
        phien={phien}
        id={id}
        secondOrder={secondOrder}
        setSecondOrder={setSecondOrder}
        time={Number.isNaN(Number(theLoai)) ? timeLeft2 : timeLeft}
        t={t}
      />
    </>
  );
};

export default XosoPage;
