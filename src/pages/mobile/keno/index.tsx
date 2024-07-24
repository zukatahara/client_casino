import GameCountTime from "@/components/game-count-time";
import GameNavBar from "../_components/game-nav-bar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { OrderKenoProps } from "@/types/order.type";
import { AppContext } from "@/contexts/app.context";
import useWebSocket from "react-use-websocket";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { ChanLe, Nguhanh, Taixiu, TrenHoaDuoi } from "@/types/keno.type";
import { findLabelsById } from "@/constants/constants";
import SelectForm from "./_components/select-form";
import HistoryPanel from "./_components/HistoryPanel";
import OrderForm from "./_components/order-form";
import { URL } from "@/constants/url";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
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

const KenoMobilePage = () => {
  const config = Config();
  const { t } = useTranslation(NS.keno);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const { id } = useParams();
  const [theLoai, setTheLoai] = useState<string>("1");
  const [order, setOrder] = useState<OrderKenoProps>({
    value: "",
    price: 1000,
    type: "keo_doi",
  });

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
      if (data?.keno?.tile) {
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

  return (
    <div className="lottery-mobile keno-m">
      <GameNavBar title={noiDungTheLoai.title} />
      <div className="scrollList">
        <div className="wrapper-tontent">
          <div className="openResult">
            <div className="top">
              <div className="icon-img-wp">
                <img
                  alt=""
                  src={`/keno/keno-${theLoai}.png`}
                  // "https://www.xoso66.me/server/static/lottery_logo/v1/mien-bac.png?v=20231030"
                />
              </div>
              <div className="lottery-info-wp">
                <div className="info-top-wp">
                  <div className="lottery-name">{noiDungTheLoai.title}</div>
                  <div className="issue">
                    <div className="status whitespace-nowrap">
                      {t("dang mo keo")}
                    </div>
                  </div>
                </div>
                <div className="issueText">
                  <i>{phien}</i>
                </div>
                <div className="info-bottom-wp">
                  <div className="van-count-down">
                    <GameCountTime timeLeft={timeLeft} />
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
                <div className="kenoOpneResult">
                  <div>
                    <div className="koTitle">
                      <div className="pastResult">
                        <span className="lable">{t("ky")} </span>
                        <span className="Issue">{lsPhien[0]?.phien}</span>
                      </div>
                      <div className="classification">
                        <div className="classItem big">
                          {/* @ts-ignore */}
                          {t(findLabelsById(lsPhien[0]?.taixiu))}{" "}
                        </div>
                        <div className="classItem odd">
                          {/* @ts-ignore */}
                          {t(findLabelsById(lsPhien[0]?.chanle))}{" "}
                        </div>
                        <div className="classItem down">
                          {/*   @ts-ignore */}
                          {t(findLabelsById(lsPhien[0]?.trenHoaDuoi))}
                        </div>
                        <div className="classItem fire">
                          {t(
                            // @ts-ignore
                            findLabelsById(
                              lsPhien[0]?.nguHanh === "hoa"
                                ? "nh_hoa"
                                : lsPhien[0]?.nguHanh
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="resultList">
                      <div className="resultNum">
                        <ul id="aniUL" className="codeList">
                          {lsPhien[0] &&
                            lsPhien[0].result.split(",").length > 0 &&
                            lsPhien[0].result.split(",").map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  className="code"
                                  style={{ opacity: 1 }}
                                >
                                  <span> {item}</span>
                                </li>
                              );
                            })}
                        </ul>
                        {/**/}
                      </div>
                      <div className="resultSum delayShowResultSum">
                        {lsPhien[0]?.tong}
                      </div>
                    </div>
                  </div>
                  {/**/}
                </div>
                {isOpenHistory &&
                  lsPhien.slice(1) &&
                  lsPhien.slice(1).map((item: any, index) => (
                    <div key={index} className="kenoOpneResult">
                      <div>
                        <div className="koTitle">
                          <div className="pastResult">
                            <span className="lable">{t("ky")} </span>
                            <span className="Issue">{item?.phien}</span>
                          </div>
                          <div className="classification">
                            <div className="classItem big">
                              {/*   @ts-ignore */}
                              {t(findLabelsById(item?.taixiu))}{" "}
                            </div>
                            <div className="classItem odd">
                              {/*   @ts-ignore */}
                              {t(findLabelsById(item?.chanle))}{" "}
                            </div>
                            <div className="classItem down">
                              {/*   @ts-ignore */}
                              {t(findLabelsById(item?.trenHoaDuoi))}
                            </div>
                            <div className="classItem fire">
                              {/* {t(findLabelsById("nh_hoa"))} */}
                              {t(
                                // @ts-ignore
                                findLabelsById(
                                  item?.nguHanh === "hoa"
                                    ? "nh_hoa"
                                    : item?.nguHanh
                                )
                              )}{" "}
                            </div>
                          </div>
                        </div>
                        <div className="resultList">
                          <div className="resultNum">
                            <ul id="aniUL" className="codeList">
                              {item &&
                                item.result.split(",").length > 0 &&
                                item.result
                                  .split(",")
                                  .map((item: any, index: any) => {
                                    return (
                                      <li
                                        key={index}
                                        className="code"
                                        style={{ opacity: 1 }}
                                      >
                                        <span> {item}</span>
                                      </li>
                                    );
                                  })}
                            </ul>
                            {/**/}
                          </div>
                          <div className="resultSum delayShowResultSum">
                            {item?.tong}
                          </div>
                        </div>
                      </div>
                      {/**/}
                    </div>
                  ))}
              </div>
            </div>
            <div className="line"></div>
            <div className="kenoBet">
              <SelectForm order={order} setOrder={setOrder} tile={tiLe} />
              <HistoryPanel cau={cauData} />
            </div>
            {/* <SelectForm
              order={order}
              setOrder={setOrder}
              min={minCuoc}
              tiLe={tiLe}
            /> */}
            {order.value && <div className="w-full h-[200px]"></div>}
          </div>
        </div>
      </div>
      <OrderForm
        order={order}
        setOrder={setOrder}
        theloai={theLoai}
        tileList={tiLe}
        timeLeft={timeLeft}
      />
    </div>
  );
};

export default KenoMobilePage;
