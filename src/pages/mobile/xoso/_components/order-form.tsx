import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findLabelsById } from "@/constants/constants";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { OrderProps } from "@/types/order.type";
import { ToasterToast } from "@/types/utils.type";
import { formatCurrency } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { useRef } from "react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useWebSocket from "react-use-websocket";
import { URL } from "@/constants/url";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface OrderFormProps {
  order: OrderProps;
  setOrder: React.Dispatch<React.SetStateAction<OrderProps>>;
  id: string | undefined;
  secondOrder: OrderProps[];
  setSecondOrder: React.Dispatch<React.SetStateAction<OrderProps[]>>;
  timeLeft: number;
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

const OrderForm = ({
  order,
  setOrder,
  id,
  secondOrder,
  setSecondOrder,
  timeLeft,
}: OrderFormProps) => {
  // console.log("order", order);
  const { t } = useTranslation(NS.lottery);
  const config = Config();
  const { toast: toast2 } = useToast();
  const { sendJsonMessage, lastMessage } = useWebSocket(URL.webSocketUrl);
  const [currentPrice, setCurrentPrice] = useState(0);

  function processString(input: string): string {
    // Split the input string by '('
    const arr = input.split("(").map((item) => {
      const trimItem = item.trim();
      return trimItem.replace(")", "");
    });
    // Process both parts of the split array and return them combined
    return t(arr[0]) + " (" + t(arr[1]) + ")";
  }

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

      const xosoData = data.xoso || {};

      if (xosoData?.noticeData) {
        const dataNotice = xosoData.noticeData;
        queryClient.invalidateQueries(["profile"]);
        Object.keys(dataNotice).map((key) => {
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
                <div className="text-sm text-center w-full">
                  {config.listLottery[curData[0].theloai as "45"]} - {curPhien}
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
                                          ? findLabelsById(item)
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
      if (noticeData.msg === "Tài khoản đã bị khóa!") {
        toast.error(t("tai khoan bi khoa"));
        reset();
      }
      if (noticeData.msg === "Bạn đã bị khoá cược!") {
        toast.error(t("ban bi khoa cuoc"));
      }
      if (noticeData.msg === "Cuoc thanh cong!") {
        // handleGetHistoryByUser();
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
    setCurrentPrice(0);
  };

  useEffect(() => {
    if (!order.value) {
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
    if (!isAuthenticated) {
      toast.error(t("ban can dang nhap de thuc hien chuc nang nay"), {
        duration: 2000,
      });
      return;
    }

    if (timeLeft <= 5) {
      return toast.error(t("da het thoi gian cuoc"), {
        duration: 2000,
      });
    }
    if (order.price === 0) {
      return toast.error(t("vui long chon du so"), {
        duration: 2000,
      });
    }
    if (
      order.price * order.soNhan * order.value.split(",").length >
      Number(profile?.money)
    ) {
      toast.error(t("so du khong du"), {
        duration: 2000,
      });
      return;
    }
    const data = {
      so: order.value,
      sodiem: order.price,
      type: order.type,
      theloai: id,
    };
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
    // toast.success("Đặt cược thành công");
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

  // const handleGetHistoryByUser = () => {
  //   if (id) {
  //     sendJsonMessage({
  //       xoso: {
  //         history: {
  //           theloai: id,
  //         },
  //       },
  //     });
  //   }
  // };

  if (!order.value) return <></>;

  return (
    <>
      <div
        className={cn(
          "w-full h-[270px] fixed bottom-0 left-0 bg-[#1b233d] z-50 px-4"
        )}
      >
        <div className="mt-4 flex justify-start text-center relative h-full flex-col items-center">
          {order.value && (
            <>
              <div className="w-full p-2  text-xs flex justify-center items-center rounded-md ">
                <RiMoneyDollarCircleLine
                  className="text-yellow-500 text-2xl"
                  size={18}
                />
                <span className="text-yellow-500 mr-1">
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
                        order.price * order.tiLe * order.value.split(",").length
                      )
                    : formatCurrency(order.price * order.tiLe)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-300 w-full  py-1 ">
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
                      className="!min-w-[55px] !bg-slate-600 !rounded-md !text-slate-200"
                    >
                      {item.lable}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="w-full  text-xs flex justify-between items-center rounded-md my-2">
                <span className="text-slate-300">
                  {t("so nhan")}:
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
                <div className="flex items-center">
                  <span className="text-slate-300 mr-2">{t("cuoc don")}:</span>
                  <Input
                    onClick={() => handleOpenSelectForm()}
                    type="text"
                    value={Number(order.price).toLocaleString()}
                    className="w-[120px] text-right bg-[#020817] border-[#020817] text-slate-200"
                    maxLength={12}
                    onChange={(e) => {
                      setOrder({
                        ...order,
                        price: Number(e.target.value.replace(/\D/g, "")),
                      });
                    }}
                  />
                </div>
              </div>
            </>
          )}

          <div className="w-full absolute bottom-8 right-0 flex items-center justify-between">
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
                className="mr-4 !bg-slate-600 rounded-md !text-slate-200"
                variant={"secondary"}
              >
                {t("huy", { ns: "all" })}
              </Button>
            )}
            <Button
              onClick={() => handleOrder()}
              className="w-full !rounded-md !text-slate-200"
            >
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
        </div>
      </div>
    </>
  );
};

export default OrderForm;
