import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { OrderMegaProps, TileMega } from "@/types/order.type";
import { cn } from "@/lib/utils";
import SelectQuickly from "./select-quickly";
import TypeNumber from "./type-number";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface SelectFormProps {
  tileList: TileMega[] | [];
  order: OrderMegaProps;
  setOrder: React.Dispatch<React.SetStateAction<OrderMegaProps>>;
}

const maxSelect = {
  chon5: 8,
  chon6: 9,
  chon7: 10,
  chon8: 11,
  chon9: 12,
  chon10: 13,
  truotxien5: 8,
  truotxien6: 9,
  truotxien7: 10,
  truotxien8: 11,
  truotxien9: 12,
  truotxien10: 13,
  "4so": 8,
  "3so": 9,
  "2so": 14,
};
const requiredNumber = {
  truotxien5: 5,
  truotxien6: 6,
  truotxien7: 7,
  truotxien8: 8,
  truotxien9: 9,
  truotxien10: 10,
  "4so": 4,
  "3so": 3,
  "2so": 2,
  chon5: 5,
  chon6: 6,
  chon7: 7,
  chon8: 8,
  chon9: 9,
  chon10: 10,
};

const SelectForm = ({ tileList, setOrder }: SelectFormProps) => {
  const { t } = useTranslation(NS.mega);
  const [typeNhap, setTypeNhap] = useState<number>(1);
  const [type, setType] = useState<{
    name: string;
    tileCuoc: number;
    tileTrathuong: number;
    type: string;
  }>();
  const [listType, setListType] = useState(0);

  useEffect(() => {
    if (tileList && tileList.length > 0) {
      setType(tileList[0].list[0]);
      setListType(0);
    }
  }, [tileList]);

  const handleSetOrder = (order: Omit<OrderMegaProps, "type">) => {
    if (
      requiredNumber[type?.type as "truotxien5"] > 0 &&
      order.so.split(",").length < requiredNumber[type?.type as "truotxien5"]
    ) {
      setOrder({
        ...order,
        type: type?.type || "",
        sodiem: 0,
      });
      return;
    }
    if (order) {
      setOrder({
        ...order,
        type: type?.type || "",
      });
    }
  };

  return (
    <>
      <div className="mt-2 grid grid-cols-3 gap-2 p-4">
        {tileList.map((item, index) => {
          return (
            <Button
              key={index}
              variant={index === listType ? "default" : "outline"}
              className={cn(index !== listType && "bg-[#3d4977] border-0")}
              onClick={() => {
                setListType(index);
                setType(item.list[0]);
                setOrder({
                  so: "",
                  sodiem: 0,
                  type: "sothuong",
                });
              }}
            >
              {t(item.name)}
            </Button>
          );
        })}
      </div>
      <div className="w-full p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-1 flex-wrap ">
            {tileList &&
              tileList.length > 0 &&
              tileList[listType] &&
              tileList[listType].list &&
              tileList[listType].list.map((item, index) => {
                return (
                  <Button
                    variant={item.type === type?.type ? "default" : "outline"}
                    className={`${cn(
                      item.type !== type?.type && "bg-[#3d4977]"
                    )}`}
                    key={index}
                    size={"sm"}
                    onClick={() => {
                      setType(item);
                      setOrder({
                        so: "",
                        sodiem: 0,
                        type: "sothuong",
                      });
                    }}
                  >
                    {t(item.name)}
                  </Button>
                );
              })}
          </div>
        </div>
        <div className="lotteryContent mt-4">
          <div className="van-tabs van-tabs--card">
            <div className="van-tabs__wrap">
              <div
                role="tablist"
                className="van-tabs__nav van-tabs__nav--card"
                style={{ background: "rgb(41, 51, 86)" }}
              >
                <div
                  role="tab"
                  style={{ color: "rgb(233, 207, 164)" }}
                  aria-selected="true"
                  className={cn("van-tab", 1 === typeNhap && "van-tab--active")}
                  onClick={() => {
                    setTypeNhap(1);
                    setOrder({
                      so: "",
                      sodiem: 0,
                      type: "sothuong",
                    });
                  }}
                >
                  <span className="van-tab__text van-tab__text--ellipsis">
                    {t("chon so nhanh")}
                  </span>
                </div>
                <div
                  role="tab"
                  style={{ color: "rgb(233, 207, 164)" }}
                  aria-selected="true"
                  className={cn("van-tab", 2 === typeNhap && "van-tab--active")}
                  onClick={() => {
                    setTypeNhap(2);
                    setOrder({
                      so: "",
                      sodiem: 0,
                      type: "sothuong",
                    });
                  }}
                >
                  <span className="van-tab__text van-tab__text--ellipsis">
                    {t("nhap so")}
                  </span>
                </div>
              </div>
            </div>
            <div className="van-tabs__content">
              <div className="van-tab__pane">
                <div className="odds">
                  <div>
                    <span>
                      {t("ti le")}：{Number(type?.tileTrathuong)}
                    </span>
                  </div>
                </div>
                {typeNhap === 1 && (
                  <SelectQuickly
                    max={maxSelect[type?.type as "chon5"]}
                    setOrder={handleSetOrder}
                  />
                )}
                {typeNhap === 2 && <TypeNumber setOrder={handleSetOrder} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectForm;
