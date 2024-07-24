import { Button } from "@/components/ui/button";
import Config from "@/constants/config";
import React, { useEffect, useState } from "react";
import { minCuocProps, tiLeProps } from "..";

import { OrderProps } from "@/types/order.type";
import { cn } from "@/lib/utils";
import SelectNumber from "./select-number";
import TypeNumber from "./type-number";
import SelectQuickly from "./select-quickly";
import { ChevronDown } from "lucide-react";
import SelectType from "./select-type";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface SelectFormProps {
  min: minCuocProps | undefined;
  tiLe: tiLeProps | undefined;
  order: OrderProps;
  setOrder: React.Dispatch<React.SetStateAction<OrderProps>>;
  secondOrder: OrderProps[];
  setSecondOrder: React.Dispatch<React.SetStateAction<OrderProps[]>>;
  theLoai: string;
}

const typedif = ["dacsac", "thuvi"];
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
  // lo2: 2,
  lo3so: 3,
  lo4so: 4,
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
  theLoai,
}: SelectFormProps) => {
  const config = Config();
  const { t } = useTranslation(NS.lottery);
  const [open, setOpen] = useState(false);
  const [typeNhap, setTypeNhap] = useState<number>(0);
  const [listTypeNhap, setListTypeNhap] = useState(config.typeEnter.baolo);
  const [listTheLoaiNew, setListTheLoaiNew] = useState(config.listTheLoai);
  const [contentCachChoi, setContentCachChoi] = useState(
    config.listTheLoai[0].listType[0]
  );
  const [listType, setListType] = useState(config.listTheLoai[0]);

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

  const handleSetOrder = (order: Omit<OrderProps, "type">) => {
    if (order) {
      setOrder({
        ...order,
        type: contentCachChoi.value,
      });
    }
  };

  useEffect(() => {
    if (tiLe && min) {
      const newListTheLoai = listTheLoaiNew.map((theLoai: any) => {
        const newTypeList = theLoai.listType.map((type: any) => {
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
  }, [tiLe]);
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
  return (
    <>
      <SelectType
        setTypeNhap={setTypeNhap}
        setListTypeNhap={setListTypeNhap}
        open={open}
        setOpen={setOpen}
        order={order}
        setOrder={setOrder}
        listType={listType}
        setListType={setListType}
        listTheLoaiNew={listTheLoaiNew}
        setListTheLoaiNew={setListTheLoaiNew}
        contentCachChoi={contentCachChoi}
        setContentCachChoi={setContentCachChoi}
        theLoai={theLoai}
      />
      <div className="flex items-center gap-2 px-3">
        <button
          className="w-[40%] bg-transparent border-[.027rem] border-[#8b9dd6] text-[#8b9dd6] rounded-[20px] text-xs px-1 h-[29px] flex justify-around items-center"
          onClick={() => {
            setOpen(true);
          }}
        >
          {t("cach choi", { ns: "ui" })}
          <ChevronDown className="w-5 h-5 text-[#8b9dd6]" />
        </button>

        {/* <div className="w-full flex justify-between items-center"> */}
        <div className="flex gap-1 w-full overflow-x-scroll  p-3">
          {listType.listType.map((item: any, index: number) => {
            return (
              <Button
                key={index}
                variant={
                  item.value === contentCachChoi.value ? "default" : "outline"
                }
                className={cn(
                  item.value !== contentCachChoi.value &&
                    "bg-[#3d4977] border-0 min-w-[100px] px-1"
                )}
                onClick={() => {
                  setContentCachChoi(item);
                  setOrder({
                    value: "",
                    price: 0,
                    tiLe: 0,
                    soNhan: 0,
                    type: "",
                  });
                }}
              >
                {item.title}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="w-full p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="lotteryContent mt-4">
          <div className="van-tabs van-tabs--card">
            {!typedif.includes(listType.value) && (
              <div className="van-tabs__wrap">
                <div
                  role="tablist"
                  className="van-tabs__nav van-tabs__nav--card"
                  style={{ background: "rgb(41, 51, 86)", borderRadius: 24 }}
                >
                  {listTypeNhap.map((item, index) => {
                    if (
                      item.value === 2 &&
                      (contentCachChoi.value === "lo3so" ||
                        contentCachChoi.value === "lo4so")
                    ) {
                      return null;
                    }
                    return (
                      <div
                        key={index}
                        role="tab"
                        style={{ color: "rgb(233, 207, 164)" }}
                        aria-selected="true"
                        className={cn(
                          "van-tab",
                          item.value === typeNhap && "van-tab--active"
                        )}
                        onClick={() => {
                          setTypeNhap(item.value);
                          setOrder({
                            value: "",
                            price: 0,
                            tiLe: 0,
                            soNhan: 0,
                            type: "",
                          });
                        }}
                      >
                        <span className="van-tab__text van-tab__text--ellipsis">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="van-tabs__content">
              <div className="van-tab__pane">
                <div className="odds">
                  <div>
                    {!typedif.includes(listType.value) && (
                      <span>
                        {t("ti le")}：
                        {Number(
                          tiLe
                            ? tiLe[contentCachChoi.value as keyof tiLeProps]
                            : 0
                        ) || 0}
                      </span>
                    )}
                  </div>
                </div>
                {!typedif.includes(listType.value) && typeNhap === 0 && (
                  <>
                    <SelectNumber
                      type={contentCachChoi.value}
                      soNhan={Number(
                        min
                          ? min[contentCachChoi.value as keyof minCuocProps]
                          : 0
                      )}
                      tiLe={
                        Number(
                          tiLe
                            ? tiLe[contentCachChoi.value as keyof tiLeProps]
                            : 0
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
                                <p className="text-slate-500">{item.title}</p>
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
                                              getTile(false, item.value)
                                                ?.trathuong || 0,
                                            soNhan:
                                              getTile(false, item.value)
                                                ?.cuoc || 0,
                                            type: item.value,
                                          });
                                        }}
                                      >
                                        <p className="text-slate-500">
                                          {item2.title}
                                        </p>
                                        <p>
                                          {getTile(false, item.value)
                                            ?.trathuong || 0}
                                        </p>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </li>
                              <ul
                                style={{
                                  display: "grid",
                                }}
                                className="ballBox grid grid-cols-5"
                              >
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
                                              item.value,
                                              index.toString()
                                            )
                                              ? "clicked"
                                              : ""
                                          )}
                                          onClick={() => {
                                            handleSetOrderSub({
                                              value: index.toString(),
                                              price: 1000,
                                              tiLe:
                                                getTile(true, item.value)
                                                  ?.trathuong || 0,
                                              soNhan:
                                                getTile(true, item.value)
                                                  ?.cuoc || 0,
                                              type: item.value,
                                            });
                                          }}
                                        >
                                          <p className="text-slate-500">
                                            {index}
                                          </p>
                                          <p>
                                            {getTile(true, item.value)
                                              ?.trathuong || 0}
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
                          <ul
                            style={{
                              display: "grid",
                            }}
                            className="ballBox grid grid-cols-5"
                          >
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
                                      <p className="text-slate-500">{index}</p>
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
                                <p className="text-slate-500">{item2.title}</p>
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
                        <ul className="ballBox ballBox2 grid grid-cols-5">
                          {Array(100)
                            .fill(0)
                            .map((_, index) => {
                              const number =
                                index > 9 ? index.toString() : "0" + index;
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
                                    <p className="text-slate-500">{number}</p>
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
                  <>
                    <TypeNumber
                      max={
                        maxSelect[contentCachChoi.value as "truotxien4"] || 0
                      }
                      cachChoi={contentCachChoi}
                      soNhan={Number(
                        min
                          ? min[contentCachChoi.value as keyof minCuocProps]
                          : 0
                      )}
                      tiLe={
                        Number(
                          tiLe
                            ? tiLe[contentCachChoi.value as keyof tiLeProps]
                            : 0
                        ) || 0
                      }
                      setOrder={handleSetOrder}
                    />
                  </>
                )}
                {typeNhap === 2 && (
                  <SelectQuickly
                    type={contentCachChoi.value}
                    order={order}
                    soNhan={Number(
                      min ? min[contentCachChoi.value as keyof minCuocProps] : 0
                    )}
                    tiLe={
                      Number(
                        tiLe
                          ? tiLe[contentCachChoi.value as keyof tiLeProps]
                          : 0
                      ) || 0
                    }
                    setOrder={handleSetOrder}
                    max={maxSelect[contentCachChoi.value as "truotxien4"] || 0}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectForm;
