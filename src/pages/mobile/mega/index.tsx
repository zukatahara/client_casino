import { AppContext } from "@/contexts/app.context";
import { OrderMegaProps, TileMega } from "@/types/order.type";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import GameNavBar from "../_components/game-nav-bar";
import GameCountTime from "@/components/game-count-time";
import SelectForm from "./_components/select-form";
import OrderForm from "./_components/order-form";
import { cn } from "@/lib/utils";
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

const MegaMobilePage = () => {
  const config = Config();
  const { t } = useTranslation(NS.mega);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [theLoai, setTheLoai] = useState<string>("1");
  const [tileList, setTileList] = useState<TileMega[] | []>([]);
  const [order, setOrder] = useState<OrderMegaProps>({
    so: "",
    sodiem: 0,
    type: "sothuong",
  });

  const [dataHistory, setDataHistory] = useState<MegaHistory[]>([]);
  const [, setDataStatistic] = useState<MegaStatistic[]>([]);

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

  // const handleHistoryUser = () => {
  //   sendJsonMessage({
  //     mega: { historyUser: true, theloai: "1" },
  //   });
  // };

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

  // console.log(tileList);

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
      if (data?.mega?.tile) {
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
    <div className="lottery-mobile mega-m">
      <GameNavBar title={noiDungTheLoai.title} />
      <div className="scrollList">
        <div className="wrapper-tontent">
          <div className="openResult">
            <div className="top">
              <div className="icon-img-wp">
                <img alt="" src={`/mega/${theLoai}.png`} />
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
                      timeLeft={timeLeft && timeLeft > 0 ? timeLeft : 0}
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
                  <div className="results-item">
                    <div className="time">
                      <p>{phien}</p>
                    </div>
                    <div className="balls-wp">
                      {history &&
                        history[0] &&
                        history[0]?.result.split(",").map((item, index) => (
                          <div key={index} className="ball">
                            <span>{item}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  {isOpenHistory &&
                    history.slice(1) &&
                    history.slice(1).map((item, index) => (
                      <div key={index} className="results-item-wp">
                        <div className="results-item px-2">
                          <div className="time text-center">
                            <p>{item?.phien}</p>
                          </div>
                          <div className="balls-wp">
                            {item &&
                              item?.result.split(",").map((item, index) => (
                                <div
                                  key={index}
                                  className="ball2"
                                  style={{ margin: "3px" }}
                                >
                                  <span>{item}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="line"></div>
            <SelectForm order={order} setOrder={setOrder} tileList={tileList} />
            {order.so && <div className="w-full h-[200px]"></div>}
          </div>
        </div>
      </div>
      <OrderForm
        tileList={tileList}
        title={noiDungTheLoai.title}
        order={order}
        setOrder={setOrder}
        phien={phien}
        theloai={theLoai}
        timeLeft={timeLeft}
      />
    </div>
  );
};

export default MegaMobilePage;
