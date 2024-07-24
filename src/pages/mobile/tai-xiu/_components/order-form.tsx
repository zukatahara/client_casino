import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/contexts/app.context";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";

import React, { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useToast } from "@/hooks/use-toast";
import { ToasterToast } from "@/types/utils.type";
import { URL } from "@/constants/url";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface OrderFormProps {
  order: {
    value: string;
    totalPrice: number;
    tiLe: number;
  };
  setOrder: React.Dispatch<
    React.SetStateAction<{
      value: string;
      totalPrice: number;
      tiLe: number;
    }>
  >;
  theloai: string;
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

const OrderForm = ({ order, setOrder, theloai, time }: OrderFormProps) => {
  const { t } = useTranslation(NS.sicbo);
  const config = Config();
  const { toast: toast2 } = useToast();
  const { sendJsonMessage, lastMessage } = useWebSocket(URL.webSocketUrl);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { profile, isAuthenticated, auth, reset } = useContext(AppContext);

  // Sử dụng useRef để lưu trữ tham chiếu đến ô input
  const inputRef = useRef<HTMLInputElement>(null);
  const handleIconClick = (): void => {
    // Đặt trạng thái của ô input thành focus
    // Đặt focus vào ô input bằng cách sử dụng useRef
    inputRef.current?.focus();
  };
  const queryClient = useQueryClient();

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const noticeData = data.notice || {};
      const taixiuData = data.taixiu || {};

      if (taixiuData?.noticeData) {
        const dataNotice = taixiuData.noticeData;
        queryClient.invalidateQueries(["profile"]);
        // toast.success("Trung thuong");
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
                  {t("sicbo")} {curData[0].theloai} {t("giay")} - {curPhien}
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
                                className="border-b dark:border-neutral-500 border-slate-500 dark:text-white"
                              >
                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500 border-slate-500 dark:text-white">
                                  {config.infoCuoc[item.cuadat as "tai"]}
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
      }

      if (noticeData.msg === "Đăng nhập thành công") {
      }
      if (noticeData.msg === "Tài khoản đã bị khóa!") {
        toast.error(t("tai khoan bi khoa"));
        reset();
      }
      if (noticeData.msg === "Bạn đã bị khoá cược!") {
        toast.error(t("ban bi khoa cuoc"));
      }
      if (noticeData.msg === "Đặt cược thành công!") {
        toast.success(t("dat cuoc thanh cong"), {
          duration: 2000,
        });
        queryClient.invalidateQueries(["profile"]);
        setOrder({
          value: "",
          totalPrice: 0,
          tiLe: 0,
        });
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
    setIsOpen(true);
    setCurrentPrice(0);
  };

  useEffect(() => {
    if (!order.value) {
      setIsOpen(false);

      setCurrentPrice(0);
    }
  }, [order]);

  const handleSelectPrice = (value: number) => {
    if (value === currentPrice) {
      setOrder((prev) => ({
        ...prev,
        totalPrice: prev.totalPrice + value,
      }));
    } else {
      setOrder((prev) => ({
        ...prev,
        totalPrice: value,
      }));
      setCurrentPrice(value);
    }
  };

  const handleOrder = () => {
    if (!isAuthenticated) {
      toast.error(t("ban chua dang nhap de thuc hien chuc nang nay"), {
        duration: 2000,
      });
      return;
    }
    if (time <= 5) {
      toast.error(t("da het thoi gian cuoc"), {
        duration: 2000,
      });
      return;
    }

    if (order.totalPrice > Number(profile?.money)) {
      toast.error(t("so du khong du"), {
        duration: 2000,
      });
      return;
    }

    sendJsonMessage({
      taixiu: {
        cuoc: { cuadat: order.value, sotien: order.totalPrice, theloai },
      },
    });
  };

  if (!order.value) return <></>;

  return (
    <div
      className={cn(
        "w-full h-[270px] fixed bottom-0 left-0 bg-[#1b233d] z-50 px-4"
      )}
    >
      <div className="mt-4 flex justify-start text-center relative h-full flex-col items-center">
        {order.value && (
          <>
            <div className="w-full p-2 text-xs flex justify-center items-center rounded-md">
              <RiMoneyDollarCircleLine
                className="text-yellow-500 text-2xl"
                size={18}
              />
              <span className="text-yellow-500 mr-1">
                {t("tong tien thuong")}:
              </span>
              <span className="text-lg text-yellow-500">
                {formatCurrency(order.totalPrice * order.tiLe)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-300 w-full py-1 ">
              <div className="flex items-center">
                <p>
                  {t("mac_dinh", { ns: "all" })}:{" "}
                  <span className="text-green-500">1,000</span>
                </p>
                <FiEdit3
                  onClick={handleIconClick}
                  size={16}
                  className="cursor-pointer text-xl text-slate-300 ml-1"
                />
              </div>
              <div>
                <span> {t("so_du", { ns: "all" })}: </span>
                <span className="text-green-500">
                  {formatCurrency(profile?.money ?? 0)}
                </span>
              </div>
            </div>
            <div className="w-full  p-2 mb-1 border-b border-t border-slate-500">
              <div className="grid grid-cols-5 w-full gap-2">
                {priceSampleList.map((item, index) => (
                  <Button
                    onClick={() => handleSelectPrice(item.value)}
                    key={index}
                    variant={"secondary"}
                    className="min-w-[!55px] !bg-slate-600 !rounded-md !text-slate-300"
                  >
                    {item.lable}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full p-2  text-xs flex justify-between items-center rounded-md">
              <span className="text-slate-300">{t("cuoc don")}:</span>
              <div className="flex items-center">
                <Input
                  onClick={() => {
                    if (!isOpen) {
                      handleOpenSelectForm();
                    }
                  }}
                  type="text"
                  className="w-[120px] text-right bg-[#020817] border-[#020817] text-slate-200"
                  maxLength={12}
                  value={Number(order.totalPrice).toLocaleString()}
                  onChange={(e) => {
                    setOrder({
                      ...order,
                      totalPrice: Number(e.target.value.replace(/\D/g, "")),
                    });
                  }}
                  ref={inputRef}
                />
              </div>
            </div>
          </>
        )}

        <div className="w-full  flex items-center justify-between">
          {order.value && (
            <Button
              onClick={() => setOrder({ value: "", totalPrice: 0, tiLe: 0 })}
              className="mr-4 !bg-slate-600 !rounded-md !text-slate-300"
              variant={"secondary"}
            >
              {t("huy", { ns: "all" })}
            </Button>
          )}
          <Button
            onClick={() => handleOrder()}
            className="w-full !rounded-md text-slate-200"
          >
            {t("dat cuoc")} {formatCurrency(order.totalPrice)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
