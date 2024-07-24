import { useEffect, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import useWebSocket from "react-use-websocket";
import { cn } from "@/lib/utils";
import { URL } from "@/constants/url";
import Config from "@/constants/config";

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
  const config = Config();
  const swiperRef = useRef<SwiperClass>();
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
          if (tiLeData?.hasOwnProperty(key)) {
            tonghop[i].tiLe = tiLeData[key];
          }
        }

        setTongHop(tonghop);
      }
    }
  }, [lastMessage, tonghop]);
  const handleGetTiLe = () => {
    sendJsonMessage({
      taixiu: { getTiLe: true },
    });
  };

  useEffect(() => {
    handleGetTiLe();
  }, []);
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

  return (
    <div>
      <div className="relative opt-wp-2 pt-4">
        <Swiper
          slidesPerView={1}
          grid={{
            rows: 1,
            fill: "row",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          modules={[Grid, Navigation]}
        >
          <SwiperSlide>
            <div className="opt-wp tow-col">
              {tonghop.map((item, index) => {
                if (index < 4) {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelect(item.value)}
                      className={cn(
                        "opt",
                        order.value === item.value && "active"
                      )}
                    >
                      <h3
                        className={cn(
                          "text-3xl text-yellow-500 text-center mt-8 font-bold",
                          order.value === item.value && "text-slate-50"
                        )}
                      >
                        {item.content}
                      </h3>
                      <p className="text-center mt-8 text-xs x-times">
                        x{item.tiLe}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full gap-4 grid grid-cols-4 grid-wp">
              {tonghop.map((item, index) => {
                if (index >= 4 && index <= 17) {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelect(item.value)}
                      className={cn(
                        "grid",
                        order.value === item.value && "active"
                      )}
                    >
                      <div className="num">{item.content}</div>
                      <p className="g-x-times">x{item.tiLe}</p>
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
                      className={`container-dice-item ${
                        order?.value === item?.value ? "active" : ""
                      }`}
                    >
                      <div className="group-dices flex">
                        {item?.content?.split("")?.map((child, indexChild) => (
                          <div key={indexChild} className={`dice-${child}`} />
                        ))}
                      </div>
                      <p
                        className={`${
                          order?.value === item?.value ? "text-white" : ""
                        } text-xs tile-dice`}
                      >
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
                        className={`container-dice-item ${
                          order?.value === item?.value ? "active" : ""
                        }`}
                      >
                        <div className="group-dices flex">
                          {item?.content
                            ?.split("")
                            ?.map((child, indexChild) => (
                              <div
                                key={indexChild}
                                className={`dice-${child}`}
                              />
                            ))}
                        </div>
                        <p
                          className={`${
                            order?.value === item?.value ? "text-white" : ""
                          } text-xs tile-dice`}
                        >
                          x{item?.tiLe}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
              <div
                className={`dice-random-style-vip bg-light w-full mt-3 rounded-lg ${
                  order?.value === "number_three_any" ? "active" : ""
                }`}
                onClick={() => handleSelect("number_three_any")}
              >
                <div
                  className={`container-dice-lonxon grid grid-cols-3 gap-x-3`}
                >
                  <div className="group-dices flex">
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
                <div
                  className={`${
                    order?.value === "number_three_any" ? "text-white" : ""
                  } text-xs tile-dice mt-4`}
                >
                  ×{tonghop[36]?.tiLe}
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
