import Config from "@/constants/config";
import { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Card } from "@/components/ui/card";
import { AppContext } from "@/contexts/app.context";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { OrderKenoProps } from "@/types/order.type";
import MainResult from "./_components/MainResult";
import "@/styles/keno.css";
import KenoHeadResult from "./_components/KenoHeadResult";
import { ChanLe, Nguhanh, Taixiu, TrenHoaDuoi } from "@/types/keno.type";
import SelectForm from "./_components/select-form";
import OrderForm from "./_components/order-form";
import { URL } from "@/constants/url";

export interface IKenoResult {
  chanle: ChanLe;
  nguHanh: Nguhanh;
  phien: string;
  result: string;
  taixiu: Taixiu;
  tong: number;
  trenHoaDuoi: TrenHoaDuoi;
}

export interface KenoHistory {
  kq: null | string;
  lastResult?: IKenoResult;
  phien: number;
  time: number;
}

export interface KenoLsPhien {
  phien: string;
  result: string;
  tong: number;
  taixiu: string;
  chanle: string;
  trenHoaDuoi: string;
  nguHanh: string;
  cuocGop: string;
  created_at: string;
  updated_at: string;
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

export interface listTile {
  name: string;
  tileCuoc: number;
  tileTrathuong: number;
  type: string;
}

export interface tiLeProps {
  keo_doi: {
    chan: string;
    le: string;
    tai: string;
    xiu: string;
  };
  tren_duoi: {
    tren: string;
    hoa: string;
    duoi: string;
  };
  cuoc_gop: {
    tai_le: string;
    xiu_le: string;
    tai_chan: string;
    xiu_chan: string;
  };
  ngu_hanh: {
    kim: string;
    moc: string;
    thuy: string;
    hoa: string;
    tho: string;
  };
}

export const labelTile: any = {
  keo_doi: "Kèo đôi",
  tren_duoi: "Trên dưới",
  cuoc_gop: "Cược gộp",
  ngu_hanh: "Ngũ hành",
};

export type ICau = {
  ketqua: string;
  phien: string;
};

export interface IKenoCau {
  chanle: { cau: ICau[]; phanTramChan: string; phanTramLe: string };
  nguHanh: {
    cau: ICau[];
    phanTramHoa: string;
    phanTramKim: string;
    phanTramMoc: string;
    phanTramThuy: string;
    phanTramTho: string;
  };
  taixiu: { cau: ICau[]; phanTramTai: string; phanTramXiu: string };
  trenHoaDuoi: {
    cau: ICau[];
    phanTramDuoi: string;
    phanTramHoa: string;
    phanTramTren: string;
  };
}

export const defaultHistory = {
  kq: null,
  lastResult: undefined,
  phien: 0,
  time: 0,
};

const KenoPage = () => {
  // const [timeLeft2, setTimeLeft2] = useState(0);
  const config = Config();
  const { id } = useParams();
  const [theLoai, setTheLoai] = useState<string>("1");
  const [order, setOrder] = useState<OrderKenoProps>({
    value: "",
    price: 0,
    type: "keo_doi",
  });

  const [dataHistory, setDataHistory] = useState<KenoHistory>(defaultHistory);
  const [lsPhien, setLsPhien] = useState<KenoLsPhien[]>([]);
  const [cauData, setCauData] = useState<IKenoCau | undefined>(undefined);

  const [tiLe, setTiLe] = useState<tiLeProps>();
  // const [minCuoc, setMinCuoc] = useState<minCuocProps>();

  const [phien, setPhien] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [noiDungTheLoai, setNoiDungTheLoai] = useState({
    title: "Siêu Tốc 1 Phút",
  });

  const { lastMessage, sendJsonMessage } = useWebSocket(URL.webSocketUrl);
  const { auth } = useContext(AppContext);

  const handleGetTiLe = () => {
    sendJsonMessage({
      keno: { getTiLe: true },
    });
  };

  const handleGetHistory = () => {
    sendJsonMessage({
      keno: { getPhien: true, theloai: theLoai },
    });
  };

  const handleGetCau = () => {
    sendJsonMessage({
      keno: { getCau: true, theloai: theLoai },
    });
  };

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
        title: config.listKeno[id as unknown as keyof typeof config.listKeno],
      });
    }
  }, [id]);

  useEffect(() => {
    if (timeLeft === Number(id)) {
      handleGetHistory();
      handleGetTiLe();
    }
  }, [timeLeft]);

  useEffect(() => {
    // keno bat theo id
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const noticeData = data.notice || {};
      if (noticeData.msg && noticeData.msg !== "Đăng nhập thành công") {
        toast.success(noticeData.msg);
      }

      // ket qua hien tai
      // if (data?.keno) {
      //   console.log(data?.keno);
      // }

      // ti le cuoc va thuong
      if (data?.keno?.tile && !tiLe) {
        setTiLe(data?.keno?.tile);
      }

      // lich su cuoc cua user
      // if (
      //   data?.keno &&
      //   data?.keno[theLoai] &&
      //   data?.keno[theLoai]?.historyUser
      // ) {
      //   console.log(data?.keno[theLoai]?.historyUser);
      // }

      // keno 30g
      if (data?.keno && theLoai && data?.keno[theLoai]) {
        if (data?.keno[theLoai]?.lastResult) {
          setDataHistory(data?.keno[theLoai]);
        }
        setPhien(data?.keno[theLoai]?.phien);
        if (data.keno[theLoai]) {
          if (data.keno[theLoai].time) {
            setTimeLeft(data.keno[theLoai].time);
          }
          if (data.keno[theLoai].phien) {
            setPhien(data.keno[theLoai].phien);
          }
        }

        if (data.keno.tile) {
          setTiLe(data.keno.tile[0]);
          // setMinCuoc(data.keno.tile[1]);
        }
        if (data.keno[theLoai].lsPhien) {
          setLsPhien(data.keno[theLoai].lsPhien);
        }
        if (data.keno[theLoai].cau) {
          setCauData(data.keno[theLoai].cau);
        }
      }

      if (noticeData.msg === "Đăng nhập thành công") {
        // handleHistoryUser();
        // toast.success("đăng nhập thành công");
      }

      // console.log(historySicbo);
    }
  }, [lastMessage]);

  useEffect(() => {
    const handleLogin = () => {
      sendJsonMessage({
        auth: { token: auth },
      });
    };
    if (theLoai !== "1") {
      handleGetTiLe();
      handleGetHistory();
      handleGetCau();
    }
    if (auth) {
      handleLogin();
    }
  }, [auth, sendJsonMessage, theLoai]);

  const history: IKenoResult | undefined = dataHistory.lastResult;

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
          <KenoHeadResult
            id={id ?? ""}
            timeLeft={timeLeft}
            phien={phien ?? ""}
            result={history}
          />
          <MainResult history={lsPhien} cau={cauData} />
          <SelectForm order={order} setOrder={setOrder} tile={tiLe} />
        </h4>
      </Card>
      <OrderForm
        title={noiDungTheLoai.title}
        order={order}
        setOrder={setOrder}
        phien={phien}
        theloai={theLoai}
        tileList={tiLe}
        time={timeLeft}
      />
    </>
  );
};

export default KenoPage;
