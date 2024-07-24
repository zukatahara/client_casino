import { Button } from "@/components/ui/button";
import Config from "@/constants/config";
import React, { useEffect, useState } from "react";
import { minCuocProps, tiLeProps } from "..";
import SelectNumber from "./select-number";
import TypeNumber from "./type-number";
import SelectQuickly from "./select-quickly";
import { OrderProps } from "@/types/order.type";
import classNames from "classnames";
import "@/styles/keno.css";
import { cn } from "@/lib/utils";
import Guide from "@/components/guide";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
// import required modules
import { Grid, Navigation } from "swiper/modules";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SelectFormProps {
  min: minCuocProps | undefined;
  tiLe: tiLeProps | undefined;
  order: OrderProps;
  setOrder: React.Dispatch<React.SetStateAction<OrderProps>>;
  secondOrder: OrderProps[];
  setSecondOrder: React.Dispatch<React.SetStateAction<OrderProps[]>>;
  theloai: string;
  t: (key: string) => string;
}

const lis2Type = [
  "ds_sodau",
  "ds_sohai",
  "ds_soba",
  "ds_sobon",
  "ds_sonam",
  "thuvi",
];

const maxSelect = {
  truotxien4: 4,
  truotxien8: 8,
  truotxien10: 10,
  xien2: 2,
  xien3: 3,
  xien4: 4,
};

const SelectForm = ({
  min,
  tiLe,
  order,
  setOrder,
  secondOrder,
  setSecondOrder,
  theloai,
  t,
}: SelectFormProps) => {
  const config = Config();
  const listKeodoi = [
    {
      title: t("tai"),
      value: "tai",
    },
    {
      title: t("xiu"),
      value: "xiu",
    },
    {
      title: t("chan"),
      value: "chan",
    },
    {
      title: t("le"),
      value: "le",
    },
  ];

  const dacsacListSub = [
    {
      title: t("so dau"),
      value: "ds_sodau",
    },
    {
      title: t("so hai"),
      value: "ds_sohai",
    },
    {
      title: t("so ba"),
      value: "ds_soba",
    },
    {
      title: t("so bon"),
      value: "ds_sobon",
    },
    {
      title: t("so nam"),
      value: "ds_sonam",
    },
  ];
  const swiperRef = useRef<SwiperClass>();
  const handleSetOrderSub = (value: OrderProps) => {
    if (order.type === "lo2") {
      setOrder(value);
      return;
    }
    if (!order.type) {
      setOrder(value);
      return;
    }
    if (
      order.type &&
      order.type === value.type &&
      !order.value.split(",").includes(value.value)
    ) {
      setOrder({
        ...order,
        value: order.value.split(",").concat([value.value]).join(","),
      });
      return;
    }
    if (
      order.type &&
      order.type === value.type &&
      order.value.split(",").includes(value.value)
    ) {
      if (
        order.value.split(",").filter((item) => item !== value.value).length ===
        0
      ) {
        setOrder({
          price: 0,
          value: "",
          type: "",
          soNhan: 0,
          tiLe: 0,
        });
        return;
      }
      // if(order.value
      //   .split(",")
      //   .filter((item) => item !== value.value))
      setOrder({
        ...order,
        value: order.value
          .split(",")
          .filter((item) => item !== value.value)
          .join(","),
      });
      return;
    }
    if (order.type && order.type !== value.type) {
      const indexOfSub = secondOrder.findIndex(
        (item) => item.type === value.type
      );
      if (indexOfSub === -1) {
        setSecondOrder((prev) => [...prev, value]);
      } else {
        const sub = secondOrder[indexOfSub];
        if (!sub.value.split(",").includes(value.value)) {
          sub.value = sub.value.split(",").concat([value.value]).join(",");
          const newSub = [...secondOrder];
          newSub[indexOfSub] = sub;
          setSecondOrder(newSub);
        } else {
          if (sub.value.split(",").length === 1) {
            const newSub = [...secondOrder];
            newSub.splice(indexOfSub, 1);
            setSecondOrder(newSub);
            return;
          }
          sub.value = sub.value
            .split(",")
            .filter((item) => item !== value.value)
            .join(",");
          const newSub = [...secondOrder];
          newSub[indexOfSub] = sub;
          setSecondOrder(newSub);
        }
      }
    }
  };

  const handleSelectThuvi = (value: string) => {
    const isNumber = !["tai", "xiu", "chan", "le"].includes(value);

    if (
      order.value.split(",").includes(value) &&
      order.tiLe === getTile(isNumber)?.trathuong
    ) {
      if (order.value.split(",").length === 1) {
        setOrder({
          value: "",
          price: 0,
          type: "",
          soNhan: 0,
          tiLe: 0,
        });
        return;
      }
      setOrder({
        ...order,
        value: order.value
          .split(",")
          .filter((item) => item !== value)
          .join(","),
      });
      return;
    }

    if (order.value && order.tiLe !== getTile(isNumber)?.trathuong) {
      if (secondOrder.length === 0) {
        setSecondOrder([
          {
            value: value,
            price: 1000,
            type: "thuvi",
            soNhan: getTile(isNumber)?.cuoc || 0,
            tiLe: getTile(isNumber)?.trathuong || 0,
          },
        ]);
        return;
      } else {
        const subOrder = secondOrder[0];
        if (subOrder.value.includes(value)) {
          subOrder.value = subOrder.value
            .split(",")
            .filter((item) => item !== value)
            .join(",");
          const newSub = [...secondOrder];
          newSub[0] = subOrder;
          setSecondOrder(newSub);
          return;
        } else {
          subOrder.value = subOrder.value.split(",").concat([value]).join(",");
          const newSub = [...secondOrder];
          newSub[0] = subOrder;
          setSecondOrder(newSub);
          return;
        }
      }
    }

    if (!order.value.split(",").includes(value)) {
      if (order.value.split(",").length === 1 && order.value === "") {
        setOrder({
          value: value,
          price: 1000,
          tiLe: getTile(isNumber)?.trathuong || 0,
          soNhan: getTile(isNumber)?.cuoc || 0,
          type: "thuvi",
        });
      } else {
        setOrder({
          value: order.value.split(",").concat([value]).join(","),
          price: 1000,
          tiLe: getTile(isNumber)?.trathuong || 0,
          soNhan: getTile(isNumber)?.cuoc || 0,
          type: "thuvi",
        });
      }
    }
  };

  const checkExistThuvi = (value: string) => {
    if (order.value.split(",").includes(value)) {
      return true;
    }
    if (secondOrder.length > 0) {
      const subOrder = secondOrder[0];
      if (subOrder.value.includes(value)) {
        return true;
      }
    }
    return false;
  };

  const checkExist = (type: string, value: string) => {
    if (order.type === "lo2") {
      return false;
    }
    if (
      order.type &&
      order.type === type &&
      order.value.split(",").includes(value)
    ) {
      return true;
    }
    if (
      order.type &&
      order.type !== type &&
      secondOrder &&
      secondOrder.length > 0
    ) {
      const indexOfSub = secondOrder.findIndex((item) => item.type === type);
      if (indexOfSub === -1) {
        return false;
      } else {
        if (
          secondOrder[indexOfSub]?.value &&
          secondOrder[indexOfSub].value.split(",").includes(value)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  // console.log("sub:::", secondOrder);
  // console.log("order:::", order);

  const [typeNhap, setTypeNhap] = useState<number>(0);
  const [listTypeNhap, setListTypeNhap] = useState(config.typeEnter.baolo);
  const [listTheLoaiNew, setListTheLoaiNew] = useState(config.listTheLoai);
  const [contentCachChoi, setContentCachChoi] = useState(
    config.listTheLoai[0].listType[0]
  );
  const handleSetOrder = (order: Omit<OrderProps, "type">) => {
    if (order) {
      setOrder({
        ...order,
        type: contentCachChoi.value,
      });
    }
  };
  const [listType, setListType] = useState(config.listTheLoai[0]);
  useEffect(() => {
    if (tiLe && min) {
      const newListTheLoai = listTheLoaiNew.map((theLoai) => {
        const newTypeList = theLoai.listType.map((type) => {
          return {
            ...type,
            tiLe: Number(tiLe[type.value as keyof tiLeProps]),
            min: Number(min[type.value as keyof minCuocProps]),
          };
        });

        return {
          ...theLoai,
          listType: newTypeList,
        };
      });

      setListTheLoaiNew(newListTheLoai);
      //   setListType(newListTheLoai[0].listType);
      // setContentCachChoi(newListTheLoai[0].listType[0]);
      const type = newListTheLoai[0].value as "baolo" | "loxien";
      setTypeNhap(config.typeEnter[type][0].value);
      setListTypeNhap(config.typeEnter[type]);
      //   setIsRender(!isRender);
    }
  }, [tiLe, min]);

  const typedif = ["dacsac", "thuvi"];
  const getTile = (isNumber: boolean, type = contentCachChoi.value) => {
    if (!tiLe || !min) {
      return {
        cuoc: 0,
        trathuong: 0,
      };
    }
    if (lis2Type.includes(type)) {
      const m = isNumber
        ? Number(min[`${type}_so_don` as keyof minCuocProps])
        : Number(min[`${type}_keo_doi` as keyof minCuocProps]);
      const t = isNumber
        ? Number(tiLe[`${type}_so_don` as keyof tiLeProps])
        : Number(tiLe[`${type}_keo_doi` as keyof tiLeProps]);
      return {
        cuoc: m,
        trathuong: t,
      };
    }
    if (!lis2Type.includes(type)) {
      return {
        cuoc: Number(min[`${type}` as keyof minCuocProps]),
        trathuong: Number(tiLe[`${type}` as keyof tiLeProps]),
      };
    }
  };

  useEffect(() => {
    setSecondOrder([]);
  }, [contentCachChoi]);

  return (
    <>
      <div className="relative w-full pb-4">
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 3,
              grid: {
                rows: 1,
              },
            },
            768: {
              slidesPerView: 8,
              grid: {
                rows: 1,
              },
            },
          }}
          grid={{
            rows: 1,
            fill: "row",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={0}
          modules={[Grid, Navigation]}
          className="w-[90%] max-w-[90%] pt-4"
        >
          {listTheLoaiNew.map((item, index) => {
            // nếu la xsmn hoac xsmt thì ẩn trò đặc sắc
            if (
              (theloai.includes("xsmn") || theloai.includes("xsmt")) &&
              item.value === "dacsac"
            ) {
              return null;
            }
            return (
              <SwiperSlide key={index}>
                <div
                  className={cn(
                    "btn_select text-xs relative w-full",

                    item.value === listType.value ? "active" : ""
                  )}
                  onClick={() => {
                    setListType(item);
                    setContentCachChoi(item.listType[0]);
                    const type = item.value as "baolo" | "loxien";
                    setTypeNhap(config.typeEnter[type][0].value);
                    setListTypeNhap(config.typeEnter[type]);
                    setOrder({
                      value: "",
                      price: 0,
                      tiLe: Number(
                        tiLe
                          ? tiLe[contentCachChoi.value as keyof tiLeProps]
                          : 0
                      ),
                      soNhan: Number(
                        min
                          ? min[contentCachChoi.value as keyof minCuocProps]
                          : 0
                      ),
                      type: "",
                    });
                  }}
                >
                  {item.isHot && (
                    <span
                      style={{
                        top: -12,
                      }}
                      slot="label"
                      className="lotterLabel lotterLabel_hot"
                    />
                  )}

                  {item.title}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          className="button-prev2"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="w-6 h-6 text-main cursor-pointer" />
        </div>
        <div
          className="button-next2"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="w-6 h-6 text-main cursor-pointer" />
        </div>
      </div>
      <div className="w-full p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {listType.listType.map((item, index) => {
              return (
                <Button
                  className={cn(
                    "btn_select2",
                    item.value === contentCachChoi.value ? "active" : ""
                  )}
                  key={index}
                  size={"sm"}
                  onClick={() => {
                    setContentCachChoi(item);
                    setOrder({
                      value: "",
                      price: 0,
                      tiLe: Number(
                        tiLe
                          ? tiLe[contentCachChoi.value as keyof tiLeProps]
                          : 0
                      ),
                      soNhan: Number(
                        min
                          ? min[contentCachChoi.value as keyof minCuocProps]
                          : 0
                      ),
                      type: "",
                    });
                  }}
                >
                  {item.title}
                </Button>
              );
            })}
          </div>
          <div className="w-1/2 flex flex-wrap justify-end gap-2">
            {!typedif.includes(listType.value) &&
              listTypeNhap.map((item, index) => {
                if (
                  (contentCachChoi?.value == "lo3so" ||
                    contentCachChoi.value == "lo4so") &&
                  item.value == 2
                ) {
                  return null;
                } else {
                  return (
                    <Button
                      variant={item.value === typeNhap ? "default" : "outline"}
                      key={index}
                      size={"sm"}
                      onClick={() => {
                        setTypeNhap(item.value);
                        setOrder({
                          value: "",
                          price: 0,
                          tiLe: Number(
                            tiLe
                              ? tiLe[contentCachChoi.value as keyof tiLeProps]
                              : 0
                          ),
                          soNhan: Number(
                            min
                              ? min[contentCachChoi.value as keyof minCuocProps]
                              : 0
                          ),
                          type: "",
                        });
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                }
              })}
          </div>
        </div>
        <div className="text-sm text-main leading-7 my-2 flex justify-between">
          {!typedif.includes(listType.value) && (
            <>
              <span>
                {t("ti le")}：
                {Number(
                  tiLe ? tiLe[contentCachChoi.value as keyof tiLeProps] : 0
                ) || 0}
              </span>
            </>
          )}
          <Guide content={contentCachChoi} />
        </div>
        {!typedif.includes(listType.value) && typeNhap === 0 && (
          <>
            <SelectNumber
              type={contentCachChoi.value}
              soNhan={Number(
                min ? min[contentCachChoi.value as keyof minCuocProps] : 0
              )}
              tiLe={
                Number(
                  tiLe ? tiLe[contentCachChoi.value as keyof tiLeProps] : 0
                ) || 0
              }
              order={order}
              setOrder={handleSetOrder}
            />
          </>
        )}
        {listType.value === "dacsac" && (
          <div className="relative kenoBet">
            <ul className="row">
              <li>
                <div className="title">{t("keo doi")}</div>
                <ul className="ballBox">
                  {listKeodoi.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={classNames(
                          "flex-1",
                          checkExist(contentCachChoi.value, item.value)
                            ? "clicked"
                            : ""
                        )}
                        onClick={() => {
                          handleSetOrderSub({
                            value: item.value,
                            price: 1000,
                            tiLe: getTile(false)?.trathuong || 0,
                            soNhan: getTile(false)?.cuoc || 0,
                            type: contentCachChoi.value,
                          });
                        }}
                      >
                        <p>{item.title}</p>
                        <p>{getTile(false)?.trathuong || 0}</p>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            {contentCachChoi.value === "ds_tong" &&
              dacsacListSub.map((item, index) => {
                return (
                  <ul key={index} className="row">
                    <li>
                      <div className="title">{item.title}</div>
                      <li>
                        <ul className="ballBox">
                          {listKeodoi.map((item2, index) => {
                            return (
                              <li
                                key={index}
                                className={classNames(
                                  "flex-1",
                                  checkExist(item.value, item2.value)
                                    ? "clicked"
                                    : ""
                                )}
                                onClick={() => {
                                  handleSetOrderSub({
                                    value: item2.value,
                                    price: 1000,
                                    tiLe:
                                      getTile(false, item.value)?.trathuong ||
                                      0,
                                    soNhan:
                                      getTile(false, item.value)?.cuoc || 0,
                                    type: item.value,
                                  });
                                }}
                              >
                                <p>{item2.title}</p>
                                <p>
                                  {getTile(false, item.value)?.trathuong || 0}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <ul className="ballBox">
                        {Array(10)
                          .fill(0)
                          .map((_, index) => {
                            return (
                              <>
                                <li
                                  key={index}
                                  className={classNames(
                                    "flex-1",
                                    checkExist(item.value, index.toString())
                                      ? "clicked"
                                      : ""
                                  )}
                                  onClick={() => {
                                    handleSetOrderSub({
                                      value: index.toString(),
                                      price: 1000,
                                      tiLe:
                                        getTile(true, item.value)?.trathuong ||
                                        0,
                                      soNhan:
                                        getTile(true, item.value)?.cuoc || 0,
                                      type: item.value,
                                    });
                                  }}
                                >
                                  <p>{index}</p>
                                  <p>
                                    {getTile(true, item.value)?.trathuong || 0}
                                  </p>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </li>
                  </ul>
                );
              })}
            {contentCachChoi.value !== "ds_tong" && (
              <ul className="row">
                <li>
                  <div className="title">{t("so don")}</div>
                  <ul className="ballBox">
                    {Array(10)
                      .fill(0)
                      .map((_, index) => {
                        return (
                          <>
                            <li
                              key={index}
                              className={classNames(
                                "flex-1",
                                checkExist(
                                  contentCachChoi.value,
                                  index.toString()
                                )
                                  ? "clicked"
                                  : ""
                              )}
                              onClick={() => {
                                handleSetOrderSub({
                                  value: index.toString(),
                                  price: 1000,
                                  tiLe: getTile(true)?.trathuong || 0,
                                  soNhan: getTile(true)?.cuoc || 0,
                                  type: contentCachChoi.value,
                                });
                              }}
                            >
                              <p>{index}</p>
                              <p>{getTile(true)?.trathuong || 0}</p>
                            </li>
                          </>
                        );
                      })}
                  </ul>
                </li>
              </ul>
            )}
          </div>
        )}
        {listType.value === "thuvi" && (
          <div className="relative kenoBet">
            <ul className="row">
              <li>
                <div className="title">{t("keo doi")}</div>
                <ul className="ballBox">
                  {listKeodoi.map((item2, index) => {
                    return (
                      <li
                        key={index}
                        className={classNames(
                          "flex-1",
                          checkExistThuvi(item2.value) ? "clicked" : ""
                        )}
                        onClick={() => {
                          handleSelectThuvi(item2.value);
                        }}
                      >
                        <p>{item2.title}</p>
                        <p>{getTile(false)?.trathuong || 0}</p>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            <ul className="row">
              <li>
                <div className="title">{t("so don")}</div>
                <ul className="ballBox ballBox2 grid grid-cols-10">
                  {Array(100)
                    .fill(0)
                    .map((_, index) => {
                      const number = index > 9 ? index.toString() : "0" + index;
                      return (
                        <>
                          <li
                            key={index}
                            className={classNames(
                              "flex-1",
                              checkExistThuvi(number) ? "clicked" : ""
                            )}
                            onClick={() => {
                              handleSelectThuvi(number);
                            }}
                          >
                            <p>{number}</p>
                            <p>{getTile(true)?.trathuong || 0}</p>
                          </li>
                        </>
                      );
                    })}
                </ul>
              </li>
            </ul>
          </div>
        )}
        {typeNhap === 1 && (
          <TypeNumber
            soNhan={Number(
              min ? min[contentCachChoi.value as keyof minCuocProps] : 0
            )}
            tiLe={
              Number(
                tiLe ? tiLe[contentCachChoi.value as keyof tiLeProps] : 0
              ) || 0
            }
            setOrder={handleSetOrder}
            max={maxSelect[contentCachChoi.value as "truotxien4"] || 0}
            cachChoi={contentCachChoi}
          />
        )}
        {typeNhap === 2 && (
          <SelectQuickly
            order={order}
            soNhan={Number(
              min ? min[contentCachChoi.value as keyof minCuocProps] : 0
            )}
            tiLe={
              Number(
                tiLe ? tiLe[contentCachChoi.value as keyof tiLeProps] : 0
              ) || 0
            }
            setOrder={handleSetOrder}
            type={contentCachChoi.value}
            max={maxSelect[contentCachChoi.value as "truotxien4"] || 0}
          />
        )}
      </div>
    </>
  );
};

export default SelectForm;
