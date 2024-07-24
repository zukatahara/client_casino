import React, { useEffect, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { NS } from "@/constants/ns";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useWebSocket from "react-use-websocket";
import { URL } from "@/constants/url";
import Config from "@/constants/config";
// import { cn } from "@/lib/utils";
// const GroupDice = {
//   1: [
//     {
//       item: ["dice-1"],
//     },
//     {
//       item: ["dice-2"],
//     },
//     {
//       item: ["dice-3"],
//     },
//     {
//       item: ["dice-4"],
//     },
//     {
//       item: ["dice-5"],
//     },
//     {
//       item: ["dice-6"],
//     },
//     {
//       item: ["dice-11", "dice-11"],
//     },
//     {
//       item: ["dice-22", "dice-22"],
//     },
//     {
//       item: ["dice-33", "dice-33"],
//     },
//     {
//       item: ["dice-44", "dice-44"],
//     },
//     {
//       item: ["dice-55", "dice-55"],
//     },
//     {
//       item: ["dice-66", "dice-66"],
//     },
//   ],
//   2: [
//     {
//       item: ["dice-111", "dice-111", "dice-111"],
//     },
//     {
//       item: ["dice-222", "dice-222", "dice-222"],
//     },
//     {
//       item: ["dice-333", "dice-333", "dice-333"],
//     },
//     {
//       item: ["dice-444", "dice-444", "dice-444"],
//     },
//     {
//       item: ["dice-555", "dice-555", "dice-555"],
//     },
//     {
//       item: ["dice-666", "dice-666", "dice-666"],
//     },
//   ],
// };
interface SelectFormProps {
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
}

const SelectForm = ({ order, setOrder }: SelectFormProps) => {
  // const { t } = useTranslation(NS.sicbo);
  const config = Config();
  const swiperRef = useRef<SwiperClass>();
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);

  const [tonghop, setTongHop] = useState<
    {
      tiLe: number;
      value: string;
      content: string;
    }[]
  >(config.tonghopOld);
  const { lastMessage, sendJsonMessage } = useWebSocket(URL.webSocketUrl);
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const taixiuData = data.taixiu || {};

      if (taixiuData.tile) {
        const tiLeData = taixiuData.tile;

        for (let i = 0; i < tonghop.length; i++) {
          const key = tonghop[i].value;
          // eslint-disable-next-line no-prototype-builtins
          if (tiLeData.hasOwnProperty(key)) {
            tonghop[i].tiLe = tiLeData[key];
          }
        }
        setTongHop(tonghop);
      }
    }
  }, [lastMessage, tonghop]);
  const handleSelect = (value: string) => {
    if (order.value && order.value === value) {
      setOrder({
        value: "",
        totalPrice: 0,
        tiLe: 0,
      });
      return;
    }
    const item = tonghop.find((item) => item.value === value);
    setOrder({
      value: item?.value || "",
      totalPrice: 1000,
      tiLe: item?.tiLe || 0,
    });
  };
  const handleGetTiLe = () => {
    sendJsonMessage({
      taixiu: { getTiLe: true },
    });
  };

  useEffect(() => {
    handleGetTiLe();
  }, []);

  return (
    <div>
      <div className="relative">
        <Swiper
          className="sicbo-swiper"
          slidesPerView={1}
          grid={{
            rows: 1,
            fill: "row",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          navigation={true}
          loop={true}
          spaceBetween={10}
          modules={[Grid, Navigation, Pagination]}
        >
          <SwiperSlide>
            <div className="flex flex-wrap w-full justify-center items-center gap-4">
              {tonghop.map((item, index) => {
                if (index < 4) {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelect(item.value)}
                      // className={cn(
                      //   "w-[272px] h-32 rounded-sm bg-white dark:bg-slate-500 opt  cursor-pointer",
                      //   order.value === item.value ? "border-4 border-main" : ""
                      // )}
                      className={`container-dice-item-pc gap-0 w-[272px] h-32 rounded-lg bg-white dark:bg-slate-500 opt cursor-pointer  border-none shadow-md  ${
                        order?.value === item?.value
                          ? "active dark:bg-blue-500 dark:border-none"
                          : ""
                      } dark:${
                        order?.value === item?.value ? "bg-blue-500" : ""
                      }`}
                    >
                      <h3 className="text-slate-900 text-lg text-center mt-8 font-bold dark:text-white">
                        {item.content}
                      </h3>
                      <p className="text-center mt-8 text-xs text-black dark:text-[#c0cbdb]">
                        x{item.tiLe}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-5/6 gap-4 grid grid-cols-4">
              {tonghop.map((item, index) => {
                if (index >= 4 && index <= 17) {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelect(item.value)}
                      // className={cn(
                      //   "w-full h-14 rounded-md border border-slate-200 dark:border-slate-700 p-2 text-center bg-white dark:bg-slate-500 flex flex-col justify-between items-center cursor-pointer border-none shadow-md",
                      //   order.value === item.value ? "border-4 border-main" : ""
                      // )}
                      className={`container-dice-item-pc dark:bg-slate-500 cursor-pointer bg-white border-none shadow-md h-14 p-2 gap-1 ${
                        order?.value === item?.value
                          ? "active  dark:bg-blue-600 dark:border-none"
                          : ""
                      }`}
                    >
                      <div className="text-slate-900 dark:text-white">
                        {item.content}
                      </div>
                      <p className="text-xs text-black dark:text-[#c0cbdb]">
                        x{item.tiLe}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-5/6 gap-3 grid grid-cols-3">
              {tonghop.map((item, index) => {
                if (index >= 18 && index <= 29) {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelect(item.value)}
                      className={`container-dice-item-pc dark:bg-slate-500 cursor-pointer bg-white border-none shadow-md ${
                        order?.value === item?.value
                          ? " active dark:bg-blue-600 dark:border-none"
                          : ""
                      }`}
                    >
                      <div className="group-dices flex">
                        {item?.content?.split("")?.map((child, indexChild) => (
                          <div key={indexChild} className={`dice-${child}`} />
                        ))}
                      </div>
                      <p className="text-xs text-black dark:text-[#c0cbdb]">
                        x{item?.tiLe}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-5/6 grid">
              <div className="w-ful gap-3 grid grid-cols-3">
                {tonghop.map((item, index) => {
                  if (index >= 30 && index <= 35) {
                    return (
                      <div
                        key={index}
                        onClick={() => handleSelect(item.value)}
                        // className={`container-dice-item-pc cursor-pointer bg-white border-none shadow-md  ${order?.value === item?.value ? "active" : ""
                        //   }`}
                        className={`container-dice-item-pc dark:bg-slate-500 cursor-pointer bg-white border-none shadow-md ${
                          order?.value === item?.value
                            ? " active dark:bg-blue-600 dark:border-none"
                            : ""
                        }`}
                      >
                        <div className="group-dices flex ">
                          {item?.content
                            ?.split("")
                            ?.map((child, indexChild) => (
                              <div
                                key={indexChild}
                                className={`dice-${child}`}
                              />
                            ))}
                        </div>
                        <p className="text-xs text-black dark:text-[#c0cbdb]">
                          x{item?.tiLe}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
              <div
                className={`dice-random-style-vip-pc dark:bg-slate-500 cursor-pointer bg-white border-none shadow-md ${
                  order?.value === "number_three_any"
                    ? " active dark:bg-blue-600 dark:border-none"
                    : ""
                }`}
                onClick={() => handleSelect("number_three_any")}
              >
                <div
                  className={`container-dice-lonxon grid grid-cols-3 gap-x-3 mt-3`}
                >
                  <div className="group-dices flex ">
                    <div className="dice-11"></div>
                    <div className="dice-11"></div>
                    <div className="dice-11"></div>
                  </div>
                  <div className="group-dices flex">
                    <div className="dice-2"></div>
                    <div className="dice-2"></div>
                    <div className="dice-2"></div>
                  </div>
                  <div className="group-dices flex">
                    <div className="dice-3"></div>
                    <div className="dice-3"></div>
                    <div className="dice-3"></div>
                  </div>
                  <div className="group-dices flex">
                    <div className="dice-4"></div>
                    <div className="dice-4"></div>
                    <div className="dice-4"></div>
                  </div>
                  <div className="group-dices flex">
                    <div className="dice-5"></div>
                    <div className="dice-5"></div>
                    <div className="dice-5"></div>
                  </div>
                  <div className="group-dices flex">
                    <div className="dice-6"></div>
                    <div className="dice-6"></div>
                    <div className="dice-6"></div>
                  </div>
                </div>
                <div className="text-xs mt-2 text-black dark:text-[#c0cbdb]">
                  ×33
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SelectForm;
