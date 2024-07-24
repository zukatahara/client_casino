import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Config from "@/constants/config";
import { AppContext } from "@/contexts/app.context";
import { formatCurrency } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";

import React, { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { tiLeProps } from "..";
import toast from "react-hot-toast";
import { findLabelsById } from "@/constants/constants";
import { useToast } from "@/hooks/use-toast";
import { ToasterToast } from "@/types/utils.type";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface OrderFormProps {
  order: {
    value: string;
    price: number;
    type: string;
  };
  setOrder: React.Dispatch<
    React.SetStateAction<{
      value: string;
      price: number;
      type: string;
    }>
  >;
  phien: number;
  theloai: string;
  title: string;
  tileList?: tiLeProps;
  time: number;
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
  ref: any;
  cuoc: number;
  so: string;
  theloai: number;
  type: string;
  phien: string;
  thanhtoan: number;
  win: number;
  cuaDat: string;
  created_at: string;
  updated_at: string;
}

const OrderForm = ({
  order,
  setOrder,
  phien,
  theloai,
  title,
  tileList,
  time,
}: OrderFormProps) => {
  const { t } = useTranslation(NS.keno);
  const config = Config();
  const { toast: toast2 } = useToast();
  const [tile, setTile] = useState(0);
  const [historyUser, setHistoryUser] = useState<HistoryUserProps[]>([]);
  const { sendJsonMessage, lastMessage } = useWebSocket(URL.webSocketUrl);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [oldOrder, setOldOrder] = useState({
    value: "",
    price: 0,
    type: "keo_doi",
  });
  const { profile, isAuthenticated, auth, reset } = useContext(AppContext);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const kenoData = data.keno || {};

      const noticeData = data.notice || {};

      if (kenoData?.noticeData) {
        const dataNotice = kenoData.noticeData;
        queryClient.invalidateQueries(["profile"]);
        Object.keys(dataNotice).forEach((key) => {
          const curPhien = key;
          const curData = dataNotice[key];

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
                <div className="text-sm text-center w-full dark:text-white">
                  {title} - {curPhien}
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
                                <td className="border-r px-6 py-4 dark:border-neutral-500 border-slate-500 dark:text-white">
                                  <div className="w-24 line-clamp-1">
                                    {`[${
                                      config.listNameKeno[
                                        item.type as "tren_duoi"
                                      ].value
                                    }] `}
                                    {/* @ts-ignore */}
                                    {t(findLabelsById(item.so))}
                                  </div>
                                </td>
                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500 border-slate-500 text-green-600 dark:text-green-400">
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
        queryClient.invalidateQueries(["profile"]);
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
      if (noticeData.msg === "Đặt cược thành công!") {
        toast.success(t("dat cuoc thanh cong"));
        queryClient.invalidateQueries(["profile"]);
        handleGetHistoryByUser();
        setOrder({
          value: "",
          price: 0,
          type: "keo_doi",
        });
      }

      if (kenoData.finish) {
        handleGetHistoryByUser();
      }

      if (kenoData && kenoData[theloai]?.historyUser) {
        if (kenoData[theloai]?.historyUser.data) {
          const historyUserNew = kenoData[theloai]?.historyUser.data.map(
            (item: {
              type: keyof typeof config.listCuaDatKeno;
              so: string;
            }) => {
              // @ts-ignore
              return {
                ...item,
                cuaDat:
                  config.listCuaDatKeno[item.type as "keo_doi"][
                    item.so as "chan"
                  ],
              };
            }
          );

          setHistoryUser(historyUserNew);
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
        type: "keo_doi",
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
    if (order.price > Number(profile?.money)) {
      toast.error(t("so du khong du"));
      return;
    }
    sendJsonMessage({
      keno: {
        cuoc: {
          theloai: theloai,
          so: order.value === "nh_hoa" ? "hoa" : order.value,
          cuoc: order.price,
          type: order.type,
        },
      },
    });
  };

  const handleGetHistoryByUser = () => {
    sendJsonMessage({
      keno: {
        history: {
          theloai,
          limit: 50,
          trang: 1,
        },
      },
    });
  };

  useEffect(() => {
    if (tileList && Object.keys(tileList).length > 0 && order && order.type) {
      setTile(
        Number(tileList[order.type as "cuoc_gop"][order.value as "tai_le"])
      );
    }
  }, [tileList, order]);

  useEffect(() => {
    handleGetHistoryByUser();
  }, [phien]);

  return (
    <div className="fixed w-full max-w-[1400px] ">
      <Card className="w-[350px] border-slate-50 dark:border-slate-700 p-2 h-[630px] absolute  right-[25px] ">
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
            <div className="p-2 flex justify-between items-center text-xs text-slate-500 dark:text-slate-200 bg-slate-50 dark:bg-slate-500 rounded-md">
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
                      <span className="text-xs text-slate-500 dark:text-slate-200">
                        {`[${
                          config.listNameKeno[order.type as "cuoc_gop"].value
                        }]`}
                        {
                          config.listNameKeno[order.type as "cuoc_gop"]
                            .children[order.value as "tai_le"]
                        }
                        @{tile}
                      </span>
                      <div className="text-xs flex space-x-1 items-center">
                        <Input
                          onClick={() => handleOpenSelectForm()}
                          className="w-[120px] text-right"
                          maxLength={15}
                          value={formatCurrency(Number(order.price))}
                          onChange={(e) => {
                            setOrder({
                              ...order,
                              price: Number(e.target.value.replace(/\D/g, "")),
                            });
                          }}
                        />
                        <Button
                          onClick={() =>
                            setOrder({ value: "", price: 0, type: "keo_doi" })
                          }
                          variant={"ghost"}
                          size={"icon"}
                        >
                          <Icons.trash className="h-4 w-4 text-rose-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span className="text-base text-slate-500 dark:text-slate-200 flex flex-wrap w-full">
                        {order.value.split(",").map((item, index) => {
                          return (
                            // @ts-ignore
                            <span key={index}>{t(findLabelsById(item))}, </span>
                          );
                        })}
                      </span>
                    </div>
                  </div>
                  {!isOpen && (
                    <>
                      <div className="w-full p-2 bg-slate-50 dark:bg-slate-500 text-xs flex justify-between items-center rounded-md absolute bottom-24 right-0">
                        <span className="text-slate-500 dark:text-slate-200">
                          {t("cuoc don")}:
                        </span>
                        <Input
                          onClick={() => handleOpenSelectForm()}
                          className="w-[120px] text-right"
                          maxLength={15}
                          value={Number(order.price)}
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
                          1
                        </span>
                      </div>
                      <div className="w-full p-2 bg-slate-50 dark:bg-slate-500 text-xs flex justify-between items-center rounded-md absolute bottom-10 right-0">
                        <span className="text-slate-500 dark:text-slate-200">
                          {t("tong")} {t("tien thuong")}:
                        </span>
                        <span className="text-lg text-yellow-500">
                          {formatCurrency(order.price * tile)}
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
                        {t(item.lable)}
                      </div>
                    ))}
                  </div>
                  <div className="w-full h-16 text-xs text-center text-slate-700 flex p-4 justify-around items-center">
                    <span>{t("tien cuoc mac dinh")}</span> <span>1,000</span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleCloseSelectForm()}
                      variant={"secondary"}
                    >
                      {t("huy", { ns: "all" })}
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
                      onClick={() =>
                        setOrder({ value: "", price: 0, type: "keo_doi" })
                      }
                      className="mr-4"
                      variant={"secondary"}
                    >
                      {t("huy", { ns: "all" })}
                    </Button>
                  )}
                  <Button onClick={() => handleOrder()} className="w-full">
                    {t("dat cuoc")} {formatCurrency(order.price)}
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
                    if (item.thanhtoan !== 0) return;

                    return (
                      <>
                        <div
                          key={index}
                          className="w-full mt-2 rounded-md bg-slate-50 dark:bg-slate-500 p-2"
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-900">{item.phien}</span>
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
                          <div className="flex justify-between items-center text-xs mt-2">
                            <span className="text-slate-500 dark:text-slate-200">
                              {formatCurrency(item.cuoc)}
                            </span>
                            <span className="text-slate-900 w-40 line-clamp-1 text-right">
                              {`[${
                                config.listNameKeno[item.type as "tren_duoi"]
                                  .value
                              }] `}
                              {item.cuaDat}
                            </span>
                          </div>
                        </div>
                      </>
                    );
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
                    if (item.thanhtoan !== 1) return;
                    return (
                      <>
                        <div
                          key={index}
                          className="w-full mt-2 rounded-md bg-slate-50 dark:bg-slate-500 p-2"
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-900">{item.phien}</span>
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
                          <div className="flex justify-between items-center text-xs mt-2">
                            <span className="text-slate-500 dark:text-slate-200">
                              {formatCurrency(item.cuoc)}
                            </span>
                            <span className="text-slate-900 w-40 line-clamp-1 text-right">
                              {`[${
                                config.listNameKeno[item.type as "tren_duoi"]
                                  .value
                              }] `}
                              {t(item.cuaDat)}
                            </span>
                          </div>
                        </div>
                      </>
                    );
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
