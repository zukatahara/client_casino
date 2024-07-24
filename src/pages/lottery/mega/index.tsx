import { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Card } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { AppContext } from "@/contexts/app.context";
import { useParams } from "react-router-dom";
import HeadResultComponent from "../_components/head-result";
import { OrderMegaProps, TileMega } from "@/types/order.type";
import toast from "react-hot-toast";
import "@/styles/mega.css";
import LottoOpenNumber from "./_components/LottoOpenNumber";
import SelectForm from "./_components/select-form";
import OrderForm from "./_components/order-form";
import { URL } from "@/constants/url";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

export interface MegaHistory {
  created_at: string;
  cuoc: number;
  id: number;
  pay: number;
  phien: string;
  result: string;
  theloai: string;
  tra: number;
  updated_at: string;
}

export interface MegaStatistic {
  so: number;
  soKyMoThuong: number;
  soLanKhongXuatHien: number;
}

export interface listTile {
  name: string;
  tileCuoc: number;
  tileTrathuong: number;
  type: string;
}

const MegaPage = () => {
  const config = Config();
  const { t } = useTranslation(NS.mega);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [theLoai, setTheLoai] = useState<string>("1");
  const [tileList, setTileList] = useState<TileMega[] | []>([]);
  const [order, setOrder] = useState<OrderMegaProps>({
    so: "",
    sodiem: 0,
    type: "",
  });

  const [dataHistory, setDataHistory] = useState<MegaHistory[]>([]);
  const [dataStatistic, setDataStatistic] = useState<MegaStatistic[]>([]);

  const [phien, setPhien] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [noiDungTheLoai, setNoiDungTheLoai] = useState({
    title: "Siêu Tốc 1 Phút",
  });

  const { lastMessage, sendJsonMessage } = useWebSocket(URL.webSocketUrl);
  const { auth } = useContext(AppContext);

  // const handleOrder = () => {
  //   if (!isAuthenticated) {
  //     toast.success("Bạn cần đăng nhập để thực hiện chức năng này");
  //     return;
  //   }
  //   const data = {
  //     so: "11,26",
  //     sodiem: 1,
  //     type: "sothuong",
  //     theloai: "1",
  //   };
  //   // console.log(data);
  //   sendJsonMessage({
  //     mega: { cuoc: data },
  //   });
  // };

  const handleGetTiLe = () => {
    sendJsonMessage({
      mega: { getTiLe: true },
    });
  };

  const handleGetHistory = () => {
    sendJsonMessage({
      mega: { history: true, theloai: theLoai },
    });
  };

  const handleGetThongKe = () => {
    sendJsonMessage({
      mega: { thongke: true, theloai: theLoai },
    });
  };

  useEffect(() => {
    const handleLogin = () => {
      sendJsonMessage({
        auth: { token: auth },
      });
    };

    handleLogin();
  }, [auth, sendJsonMessage, id]);

  useEffect(() => {
    if (id) {
      setTheLoai(id);
      setNoiDungTheLoai({
        title: config.listMega[id as unknown as keyof typeof config.listMega],
      });
    }
  }, [id]);

  useEffect(() => {
    if (timeLeft === Number(id) * 60) {
      handleGetHistory();
      handleGetTiLe();
      queryClient.refetchQueries(["results", id]);
    }
  }, [timeLeft]);

  useEffect(() => {
    handleGetHistory();
    handleGetTiLe();
    queryClient.refetchQueries(["results", id]);
    handleGetThongKe();
  }, [theLoai]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const noticeData = data.notice || {};
      if (data.notice) {
        if (data.notice.msg === "Đăng nhập thành công") {
          handleGetHistory();
          handleGetTiLe();
        }
      }
      if (noticeData.msg && noticeData.msg !== "Đăng nhập thành công") {
        toast.success(noticeData.msg);
      }
      // ket qua hien tai
      if (data?.mega && data?.mega[theLoai]) {
        setTimeLeft(data?.mega[theLoai].time);
        setPhien(data?.mega[theLoai].phien);
      }

      // ti le cuoc va thuong
      if (data?.mega?.tile && tileList.length === 0) {
        // console.log(data?.mega?.tile);
        setTileList(data?.mega?.tile);
        // setTiLe(data?.mega?.tile);
      }

      // lich su cuoc cua user
      // if (data?.mega && data?.mega["1"] && data?.mega["1"]?.historyUser) {
      //   console.log(data?.mega["1"]?.historyUser);
      // }

      // lich su ket qua
      if (data?.mega && data?.mega[theLoai] && data?.mega[theLoai]?.history) {
        // console.log("history", data?.mega["1"]?.history);
        setDataHistory(data?.mega[theLoai]?.history ?? []);
      }

      // thong ke 300 ky gan nhat
      if (data?.mega && data?.mega[theLoai] && data?.mega[theLoai]?.thongke) {
        // console.log("thongke", data?.mega["1"]?.thongke);
        setDataStatistic(data?.mega[theLoai]?.thongke);
      }

      if (noticeData.msg === "Đăng nhập thành công") {
        // handleHistoryUser();
        // toast.success("đăng nhập thành công");
      }
      if (noticeData.msg === "Cuoc thanh cong!") {
        toast.success(t("dat cuoc thanh cong"));
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    const handleLogin = () => {
      sendJsonMessage({
        auth: { token: auth },
      });
    };
    handleGetTiLe();
    handleGetHistory();
    handleGetThongKe();

    if (auth) {
      handleLogin();
    }
  }, [auth, sendJsonMessage]);

  const history: MegaHistory[] = dataHistory ?? [];

  return (
    <>
      <Card
        className={
          "border-slate-50 dark:border-slate-700 py-4 min-w-[807px] w-3/5"
        }
      >
        <h4 className="text-base text-slate-500 dark:text-slate-200">
          <div className="flex items-center px-4 pb-2">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAM1BMVEUAAAAzPD40ODs1ODs1ODs1ODs1ODs1ODs1ODs1Nzs1ODs1ODs1ODs1ODs1Nzs1ODs1ODuLv5NVAAAAEHRSTlMACynU5le0gKAZ8cRuN0eOCGadGAAAAr1JREFUSMeFVVu2IyEIbMW3orX/1U5jE23nJDN83HNjKB5FQa5ltqI4ohpCGiO25n1na/P10yq+Wmm/AIAxOVvu3rcWR0qhVnIFsN/9DcrxMXNn+SegfwdkOHHyLd6hqUAs/ACwOBEOcxSSE9+KELs5/Nvqj2pIsXm2j8PA3TDNb8Yb4nB7dc76ti1iCCAOgcT9XmC+t+WRJFz2oASkVwabNcBpHUHCkUO82CGYNTFm1C8ABt3jESN7N4RP0ABvKH5n+jIANwIq9ggT2q9Z4gaV2T4KD4QPGfEV1ZuDDgv3UO+MKZqiYeyghLoFSrAWpI22u5So7IXlHwA4LVXpIGWsFKjji6IExxXFbzo66qcfkIItaIuEL5MWgQNtptd+Mtwp7A54xSWjdHhUbx/AjgyYmakgKrKg5okkAmZCi2K1vCkXIdRtuVgC9VinUMMscQBYAQk8KalmTSNiWo1shEaI+JyOWpfKw60BTHcaujcTgXH/pUWmlwR+i64MHfhGxOyWR0TTRpRNrfVEOCVYtaGN7J7UODWjiJKPzRqLo2c+bajjEhDGsVm2IFnD9nadUNINy8LTidAJekzrwoE8vnZyCaGtGiYuuSJRCrIh/oLwcOusrlyI7c6XZ5HuM0rbAlkRnQI2pQRgllrTtRDDySO/F4fWejsKReZubseJaHc2uOTza/nPg2se7XJ++qQbZuc1nwfsrQ011TBVvUzKC5VL78G6uqcuKh7RpP3atvybOJ3ZWIa0FWn73PC3NjbY2aOf9aEgv7Sx3+uD6EEC6U4uAtTs+mIjIvqpcz2QWxv7EwmC0afOeWhVhL59gGz193COVRB3FgiXJWvQYjYg4GWFKmkffHnyT6ED4V1Fkt/D0Xy3WW+sINRMj3Wq6R+2Edye9EE6+A+CbUvldXH+i5hGSS/O/xHRudTy389/ADZyKbQ/jwhzAAAAAElFTkSuQmCC"
              alt=""
              className="w-8 h-8 mr-2"
            />
            {noiDungTheLoai.title}
          </div>
          <HeadResultComponent
            theloai={theLoai}
            timeLeft={timeLeft}
            phien={phien}
            result={history[0]?.result ?? ""}
          />
          <LottoOpenNumber history={history} statistic={dataStatistic} />
          <SelectForm order={order} setOrder={setOrder} tileList={tileList} />
        </h4>
      </Card>
      <OrderForm
        tileList={tileList}
        title={noiDungTheLoai.title}
        order={order}
        setOrder={setOrder}
        phien={phien}
        theloai={theLoai}
        time={timeLeft}
      />
    </>
  );
};

export default MegaPage;
