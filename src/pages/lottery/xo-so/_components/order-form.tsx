import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import config from "@/constants/config";
import { AppContext } from "@/contexts/app.context";
import { OrderProps } from "@/types/order.type";
import { formatCurrency } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";

import React, { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { minCuocProps } from "..";
import toast from "react-hot-toast";
import { findLabelsById } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";
import { ToasterToast } from "@/types/utils.type";
import { URL } from "@/constants/url";
import Config from "@/constants/config";

const arrMaxThuong = [
  "lo2",
  "lo2sodau",
  "lo2so1k",
  "lo3so",
  "lo4so",
  "de",
  "daude",
  "de7",
  "de1",
  "daude1",
  "dau",
  "duoi",
  "3cang",
  "3cangg1",
  "cang4",
];
interface Config {
  infoCuoc: {
    [key: string]: string;
  };
}

interface OrderFormProps {
  order: OrderProps;
  setOrder: React.Dispatch<React.SetStateAction<OrderProps>>;
  phien: number;
  title: string;
  id: string | undefined;
  min: minCuocProps | undefined;
  secondOrder: OrderProps[];
  setSecondOrder: React.Dispatch<React.SetStateAction<OrderProps[]>>;
  time: number;
  t: any;
}

const priceSampleList = [
  {
    lable: "+1k",
    value: 1000,
  },
  {
    lable: "+5k",
    value: 5000,
  },
  {
    lable: "+10k",
    value: 10000,
  },
  {
    lable: "+50k",
    value: 50000,
  },
  {
    lable: "+100k",
    value: 100000,
  },
  {
    lable: "+500k",
    value: 500000,
  },
  {
    lable: "+1M",
    value: 1000000,
  },
  {
    lable: "+5M",
    value: 5000000,
  },
  {
    lable: "+10M",
    value: 10000000,
  },
  {
    lable: "+50M",
    value: 50000000,
  },
];

interface HistoryUserProps {
  id: number;
  username: string;
  ref: null;
  cuoc: string;
  so: string;
  theloai: string;
  type: string;
  phien: string;
  thanhtoan: number;
  win: number;
  amount: string;
  date: Date;
  cachChoi: string;
  t: (key: string) => string;
}

const OrderForm = ({
  order,
  setOrder,
  phien,
  title,
  id,
  secondOrder,
  setSecondOrder,
  time,
  t,
}: OrderFormProps) => {
  const config = Config();
  const { toast: toast2 } = useToast();
  const [historyUser, setHistoryUser] = useState<HistoryUserProps[]>([]);
  const { sendJsonMessage, lastMessage } = useWebSocket(URL.webSocketUrl);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [oldOrder, setOldOrder] = useState({
    value: "",
    price: 0,
    tiLe: 0,
    soNhan: 0,
    type: "",
  });
  const configCuadat: Config = {
    infoCuoc: {
      tai: t("tai"),
      xiu: t("xiu"),
      chan: t("chan"),
      le: t("le"),
    },
  };

  const { profile, isAuthenticated, auth, reset } = useContext(AppContext);

  const queryClient = useQueryClient();

  function processString(input: string): string {
    // Split the input string by '('
    const arr = input.split("(").map((item) => {
      const trimItem = item.trim();
      return trimItem.replace(")", "");
    });

    // Process both parts of the split array and return them combined
    return `${t(arr[0])}  ${t(arr[1]) ? " (" + t(arr[1]) + ")" : ""}`;
  }

  useEffect(() => {
    handleGetHistoryByUser();
  }, [phien]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const xosoData = data.xoso || {};
      const noticeData = data.notice || {};

      if (xosoData?.noticeData) {
        const dataNotice = xosoData.noticeData;
        queryClient.invalidateQueries(["profile"]);
        Object.keys(dataNotice).map((key) => {
          const curPhien = key;
          const curData = dataNotice[key];
          // console.log(curData);

          toast2({
            title: (
              <div className="flex items-center">
                <img className="w-10 mr-2 block" src="/icon/gift.png" alt="" />
                <span className="dark:text-white">
                  {t("thong bao trung thuong")}
                </span>
              </div>
            ),
            description: (
              <div className="p-2">
                <div className="text-sm text-center w-full">
                  {t(curData[0].theloai)} - {curPhien}
                </div>
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500 border-slate-500">
                          <thead className="border-b font-medium dark:border-neutral-500 border-slate-500">
                            <tr>
                              <th
                                scope="col"
                                className="border-r px-6 py-4 dark:border-neutral-500 border-slate-500 dark:text-white"
                              >
                                {t("ten kieu cuoc")}
                              </th>
                              <th
                                scope="col"
                                className="border-r px-6 py-4 dark:border-neutral-500 border-slate-500 dark:text-white"
                              >
                                {t("dat cuoc")}
                              </th>
                              <th
                                scope="col"
                                className="border-r px-6 py-4 dark:border-neutral-500 border-slate-500 dark:text-white"
                              >
                                {t("tien thuong")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {curData.map((item: any, index: number) => (
                              <tr
                                key={index}
                                className="border-b dark:border-neutral-500 border-slate-500"
                              >
                                <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 border-slate-500 dark:text-white">
                                  {processString(item.cachChoi)}
                                </td>
                                <td className="border-r px-6 py-4 dark:border-neutral-500 border-slate-500 dark:text-white">
                                  <div className="w-10 line-clamp-1">
                                    {item.so.map((item: any) => (
                                      <>
                                        {["tai", "xiu", "chan", "le"].includes(
                                          item
                                        )
                                          ? t(findLabelsById(item))
                                          : item}
                                        ,
                                      </>
                                    ))}
                                  </div>
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500 border-slate-500 text-green-600 dark:text-green-400">
                                  {/* {item.win} */}
                                  {formatCurrency(Number(item.win))}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          } as ToasterToast);
        });
      }

      if (noticeData.msg === "Đăng nhập thành công") {
        handleGetHistoryByUser();
      }
      if (noticeData.msg === "Tài khoản đã bị khóa!") {
        toast.error(t("tai khoan bi khoa"));
        reset();
      }
      if (noticeData.msg === "Bạn đã bị khoá cược!") {
        toast.error(t("ban bi khoa cuoc"));
      }
      if (noticeData.msg === "Cuoc thanh cong!") {
        handleGetHistoryByUser();
        toast.success(t("dat cuoc thanh cong"));
        queryClient.invalidateQueries(["profile"]);
        setOrder({
          value: "",
          price: 0,
          tiLe: 0,
          soNhan: 0,
          type: "",
        });
      }
      if (xosoData && id) {
        if (xosoData[id]?.history) {
          if (xosoData[id]?.history?.data) {
            setHistoryUser(xosoData[id]?.history?.data);
          }
        }
      }
    }
  }, [lastMessage]);
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
  const handleOpenSelectForm = () => {
    setOldOrder(order);
    setIsOpen(true);
    setCurrentPrice(0);
  };
  const handleCloseSelectForm = () => {
    setIsOpen(false);
    setOrder(oldOrder);
  };
  useEffect(() => {
    if (!order.value) {
      setIsOpen(false);
      setOldOrder({
        value: "",
        price: 0,
        tiLe: 0,
        soNhan: 0,
        type: "",
      });
      setCurrentPrice(0);
    }
  }, [order]);

  const handleSelectPrice = (value: number) => {
    if (value === currentPrice) {
      setOrder((prev) => ({
        ...prev,
        price: prev.price + value,
      }));
    } else {
      setOrder((prev) => ({
        ...prev,
        price: value,
      }));
      setCurrentPrice(value);
    }
  };

  const handleOrder = () => {
    if (time <= 5) {
      toast.error(t("da het thoi gian cuoc"));
      return;
    }
    if (!isAuthenticated) {
      toast.error(t("ban can dang nhap de thuc hien chuc nang nay"));
      return;
    }
    if (order.price === 0) {
      return toast.error(t("vui long chon du so"));
    }
    const totalNum = [
      "xien2",
      "xien3",
      "xien4",
      "truotxien4",
      "truotxien8",
      "truotxien10",
    ].includes(order.type)
      ? 1
      : order.value.split(",").length;
    if (
      order.price * order.soNhan * (totalNum + getSoNhanSub()) >
      Number(profile?.money)
    ) {
      toast.error(t("so du khong du"));
      return;
    }
    const data = {
      so: order.value,
      sodiem: order.price,
      type: order.type,
      theloai: id,
    };
    // console.log(data);
    sendJsonMessage({
      xoso: { cuoc: data },
    });

    if (secondOrder && secondOrder.length > 0) {
      for (const item of secondOrder) {
        const data = {
          so: item.value,
          sodiem: item.price,
          type: item.type,
          theloai: id,
        };

        sendJsonMessage({
          xoso: { cuoc: data },
        });
      }
    }
    setSecondOrder([]);
  };

  const handleGetHistoryByUser = () => {
    if (id) {
      sendJsonMessage({
        xoso: {
          history: {
            theloai: id,
          },
        },
      });
    }
  };

  const handleRemoveSub = (value: string) => {
    const newSub = secondOrder.filter((item) => item.type !== value);
    setSecondOrder(newSub);
  };

  const getSoNhanSub = () => {
    let total = 0;
    if (secondOrder.length === 0) {
      return 0;
    }
    secondOrder.forEach((item) => {
      total += item.value.split(",").length;
    });
    return total ? total : 0;
  };

  const getType = (type: string) => {
    let title = "";
    config.listTheLoai.forEach((item) => {
      item.listType.forEach((item2) => {
        if (item2.value === type) {
          title = `[${item.title}]${item2.title}`;
          return;
        }
      });
    });
    return title;
  };
  const getMaxThuong = () => {
    let max = 1;
    if (id?.includes("xsmn") || id?.includes("xsmt")) {
      if (arrMaxThuong.includes(order.type)) {
        if (order.type === "lo2" || order.type === "lo2so1k") {
          max = 18;
        } else if (order.type === "lo3so" || order.type === "lo2sodau") {
          max = 17;
        } else if (order.type === "lo4so") {
          max = 16;
        }
      }
    } else {
      if (arrMaxThuong.includes(order.type)) {
        if (order.type === "lo2" || order.type === "lo2so1k") {
          max = 27;
        } else if (order.type === "lo2sodau" || order.type === "lo3so") {
          max = 23;
        } else if (order.type === "lo4so") {
          max = 20;
        }
      }
    }
    return max;
  };
  // {(![
  //   "xien2",
  //   "xien3",
  //   "xien4",
  //   "truotxien4",
  //   "truotxien8",
  //   "truotxien10",
  // ].includes(order.type)
  //   ? order.soNhan *
  //   (order.value.split(",").length + getSoNhanSub())
  //   : 1) || 0}
  return (
    <div className="fixed w-full max-w-[1400px] ">
      <Card className="w-[350px] border-slate-50 dark:border-slate-700 p-2 h-[630px] absolute  right-[40px] ">
        <Tabs defaultValue="account" className="w-full h-[500px]">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger className="text-[12px]" value="account">
              {t("bang cuoc")}
            </TabsTrigger>
            <TabsTrigger className="text-[12px]" value="password">
              {t("chua thanh toan")}
            </TabsTrigger>
            <TabsTrigger className="text-[12px]" value="3">
              {t("da thanh toan")}
            </TabsTrigger>
          </TabsList>
          <TabsContent className="h-full" value="account">
            <div className="p-2 flex justify-between items-center text-base text-slate-500 dark:text-slate-200 bg-slate-50 dark:bg-slate-500 rounded-md">
              <span>{title}</span>
              <span>{phien}</span>
            </div>
            <div className="mt-4 flex justify-start text-center relative h-full flex-col items-center">
              {!order.value && (
                <img
                  className="mt-11 w-[174px] h-[154px]"
                  src="/common/no-data.png"
                  alt=""
                />
              )}
              {order.value && (
                <>
                  <div className="w-full p-2 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-full flex justify-between items-center">
                      <span className="text-base text-slate-500 dark:text-slate-200 w-40 text-left line-clamp-1">
                        {getType(order.type)}@{order.tiLe}
                      </span>
                      <div className="text-base flex space-x-1 items-center">
                        <Input
                          onClick={() => handleOpenSelectForm()}
                          className="w-[120px] text-right"
                          maxLength={15}
                          value={formatCurrency(order.price)}
                          onChange={(e) => {
                            setOrder({
                              ...order,
                              price: Number(e.target.value.replace(/\D/g, "")),
                            });
                          }}
                        />
                        <Button
                          onClick={() =>
                            setOrder({
                              value: "",
                              tiLe: 0,
                              price: 0,
                              soNhan: 0,
                              type: "",
                            })
                          }
                          variant={"ghost"}
                          size={"icon"}
                        >
                          <Icons.trash className="h-4 w-4 text-rose-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="w-full h-20 overflow-y-scroll flex justify-between items-cente">
                      <span className="text-base text-slate-500 dark:text-slate-200 flex flex-wrap w-full">
                        {order.value.split(",").map((item, index) => {
                          return (
                            <span key={index}>
                              {["tai", "xiu", "chan", "le"].includes(item)
                                ? t(findLabelsById(item))
                                : item}
                              ,{" "}
                            </span>
                          );
                        })}
                      </span>
                    </div>
                  </div>
                  {secondOrder &&
                    secondOrder.length > 0 &&
                    secondOrder.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full p-2 border-b border-slate-200 dark:border-slate-700"
                        >
                          <div className="w-full flex justify-between items-center">
                            <span className="text-base text-slate-500 dark:text-slate-200">
                              {t("tong")}@{item.tiLe / 1000}
                            </span>
                            <div className="text-base flex space-x-1 items-center">
                              <Input
                                onClick={() => handleOpenSelectForm()}
                                className="w-[120px] text-right"
                                maxLength={15}
                                value={Number(item.price)}
                              />
                              <Button
                                onClick={() => handleRemoveSub(item.type)}
                                variant={"ghost"}
                                size={"icon"}
                              >
                                <Icons.trash className="h-4 w-4 text-rose-500" />
                              </Button>
                            </div>
                          </div>
                          <div className="w-full flex justify-between items-center">
                            <span className="text-base text-slate-500 dark:text-slate-200 flex flex-wrap w-full">
                              {item.value.split(",").map((item, index) => {
                                return (
                                  <span key={index}>
                                    {["tai", "xiu", "chan", "le"].includes(item)
                                      ? t(findLabelsById(item))
                                      : item}
                                    ,{" "}
                                  </span>
                                );
                              })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  {!isOpen && (
                    <>
                      <div className="w-full p-2 bg-slate-50 dark:bg-slate-500 text-base flex justify-between items-center rounded-md absolute bottom-36 right-0">
                        <span className="text-slate-500 dark:text-slate-200">
                          {t("cuoc don")}:
                        </span>
                        <Input
                          onClick={() => handleOpenSelectForm()}
                          className="w-[120px] text-right"
                          maxLength={15}
                          value={formatCurrency(Number(order.price))}
                          onChange={(e) => {
                            setOrder({
                              ...order,
                              price: Number(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="w-full p-2 bg-slate-50 dark:bg-slate-500 text-base flex justify-between items-center rounded-md absolute bottom-24 right-0">
                        <span className="text-slate-500 dark:text-slate-200">
                          {t("so nhan")}:
                        </span>
                        <span className="text-lg text-slate-500 dark:text-slate-200">
                          {(![
                            "xien2",
                            "xien3",
                            "xien4",
                            "truotxien4",
                            "truotxien8",
                            "truotxien10",
                          ].includes(order.type)
                            ? order.soNhan *
                              (order.value.split(",").length + getSoNhanSub())
                            : 1) || 0}
                        </span>
                      </div>
                      <div className="w-full p-2 bg-slate-50 dark:bg-slate-500 text-base flex justify-between items-center rounded-md absolute bottom-10 right-0">
                        <span className="text-slate-500 dark:text-slate-200">
                          {t("tong tien thuong")}:
                        </span>
                        <span className="text-lg text-yellow-500">
                          {![
                            "xien2",
                            "xien3",
                            "xien4",
                            "truotxien4",
                            "truotxien8",
                            "truotxien10",
                          ].includes(order.type)
                            ? formatCurrency(
                                order.price *
                                  order.tiLe *
                                  ((order.value.split(",").length >=
                                  getMaxThuong()
                                    ? getMaxThuong()
                                    : order.value.split(",").length) +
                                    getSoNhanSub())
                              )
                            : formatCurrency(order.price * order.tiLe)}
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
              {order.value && isOpen && (
                <div className="w-full absolute bottom-0 right-0 p-2 border-t border-slate-100 h-fit">
                  <div className="flex flex-wrap w-full gap-2">
                    {priceSampleList.map((item, index) => (
                      <div
                        onClick={() => handleSelectPrice(item.value)}
                        key={index}
                        className="fast-bet-money-item"
                      >
                        {item.lable}
                      </div>
                    ))}
                  </div>
                  <div className="w-full h-16 text-base text-center text-slate-700 flex p-4 justify-around items-center">
                    <span>{t("tien cuoc mac dinh")}</span> <span>1,000</span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleCloseSelectForm()}
                      variant={"secondary"}
                    >
                      {t("huy")}
                    </Button>
                    <Button onClick={() => setIsOpen(false)}>
                      {t("hoan thanh")}
                    </Button>
                  </div>
                </div>
              )}
              {!isOpen && (
                <div className="w-full absolute bottom-0 right-0 flex items-center justify-between">
                  {order.value && (
                    <Button
                      onClick={() => {
                        setOrder({
                          value: "",
                          price: 0,
                          tiLe: 0,
                          soNhan: 0,
                          type: "",
                        });
                        setSecondOrder([]);
                      }}
                      className="mr-4"
                      variant={"secondary"}
                    >
                      {t("huy")}
                    </Button>
                  )}
                  <Button onClick={() => handleOrder()} className="w-full">
                    {t("dat cuoc")}{" "}
                    {![
                      "xien2",
                      "xien3",
                      "xien4",
                      "truotxien4",
                      "truotxien8",
                      "truotxien10",
                    ].includes(order.type)
                      ? formatCurrency(
                          order.price *
                            order.soNhan *
                            (order.value.split(",").length + getSoNhanSub())
                        )
                      : order.price}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent className="w-full" value="password">
            {historyUser.filter((item) => item.thanhtoan === 0).length === 0 ? (
              <div className="w-full relative flex flex-col items-center">
                <img
                  className="mt-11 w-[174px] h-[154px]"
                  src="/common/no-data.png"
                  alt=""
                />
                <p className="text-slate-500 dark:text-slate-200">
                  {t("khong co du lieu")}
                </p>
              </div>
            ) : (
              <ScrollArea className="w-full h-[500px]">
                {historyUser &&
                  historyUser.map((item, index) => {
                    if (item.thanhtoan === 0) {
                      return (
                        <div
                          key={index}
                          className="w-full mt-2 rounded-md bg-slate-50 dark:bg-slate-500 p-2"
                        >
                          <div className="flex justify-between items-center text-base">
                            <span className="text-slate-900 line-clamp-1 text-sm">
                              {item.phien}
                            </span>
                            <span className="text-green-600">
                              <span className="text-yellow-500 mr-3">
                                +
                                {item.win
                                  ? formatCurrency(Number(item.win))
                                  : 0}
                              </span>
                              {item.thanhtoan === 0 && (
                                <span className="text-yellow-500">
                                  {t("cho mo giai")}
                                </span>
                              )}
                              {item.thanhtoan !== 0 && (
                                <>
                                  {item.win ? (
                                    <span className="text-green-600">
                                      {t("thang")}
                                    </span>
                                  ) : (
                                    <span className="text-red-600">
                                      {t("thua")}
                                    </span>
                                  )}
                                </>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-base mt-2">
                            <span className="text-slate-500 dark:text-slate-200">
                              {processString(item.cachChoi)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-base mt-2">
                            <span className="text-slate-900 w-full break-words">
                              {t("noi dung cuoc")}:{" "}
                              {item.so.split(",").map((item2) => (
                                <>
                                  {isNaN(Number(item2))
                                    ? configCuadat.infoCuoc[item2]
                                    : item2}{" "}
                                  ,
                                </>
                              ))}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })}
              </ScrollArea>
            )}
          </TabsContent>
          <TabsContent className="w-full" value="3">
            {historyUser.filter((item) => item.thanhtoan === 1).length === 0 ? (
              <div className="w-full relative flex flex-col items-center">
                <img
                  className="mt-11 w-[174px] h-[154px]"
                  src="/common/no-data.png"
                  alt=""
                />
                <p className="text-slate-500 dark:text-slate-200">
                  {t("khong co du lieu")}
                </p>
              </div>
            ) : (
              <ScrollArea className="w-full h-[500px]">
                {historyUser &&
                  historyUser.map((item, index) => {
                    if (item.thanhtoan === 1) {
                      return (
                        <>
                          <div
                            key={index}
                            className="w-full mt-2 rounded-md bg-slate-50 dark:bg-slate-500 p-2"
                          >
                            <div className="flex justify-between items-center text-base">
                              <span className="text-slate-900 line-clamp-1 text-sm">
                                {item.phien}
                              </span>
                              <span className="text-green-600">
                                <span className="text-yellow-500 mr-3">
                                  +
                                  {item.win
                                    ? formatCurrency(Number(item.win))
                                    : 0}
                                </span>
                                <>
                                  {item.win ? (
                                    <span className="text-green-600">
                                      {t("thang")}
                                    </span>
                                  ) : (
                                    <span className="text-red-600">
                                      {t("thua")}
                                    </span>
                                  )}
                                </>
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-base mt-2">
                              <span className="text-slate-500 dark:text-slate-200">
                                {processString(item.cachChoi)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-base mt-2">
                              <span className="text-slate-900 w-full break-words">
                                {t("noi dung cuoc")}:{" "}
                                {item.so.split(",").map((item2) => (
                                  <>
                                    {isNaN(Number(item2))
                                      ? configCuadat.infoCuoc[item2]
                                      : item2}{" "}
                                    ,
                                  </>
                                ))}
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default OrderForm;
