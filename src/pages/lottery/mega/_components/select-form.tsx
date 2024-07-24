import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import TypeNumber from "./type-number";
import SelectQuickly from "./select-quickly";
import { OrderMegaProps, TileMega } from "@/types/order.type";
import Guide from "@/components/guide";
import Config from "@/constants/config";
import { factorial } from "@/utils/utils";
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
const SelectForm = ({ tileList, setOrder, order }: SelectFormProps) => {
  const config = Config();

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
    if (
      requiredNumber[type?.type as "truotxien5"] > 0 &&
      order.so.split(",").length >= requiredNumber[type?.type as "truotxien5"]
    ) {
      let soNhan = 1;
      const max = requiredNumber[type?.type as "truotxien5"];
      const length = order.so.split(",").length;
      if (order.so.split(",").length > max) {
        soNhan = factorial(length) / (factorial(max) * factorial(length - max));
      }
      setOrder({
        ...order,
        type: type?.type || "",
        sodiem: 1000,
        soNhan,
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
  useEffect(() => {
    setOrder({
      so: "",
      sodiem: 0,
      type: "",
    });
  }, [type]);

  return (
    <>
      <div className="mt-2 flex justify-start items-center space-x-2 flex-wrap p-4">
        {tileList &&
          tileList.length > 0 &&
          tileList.map((item, index) => {
            return (
              <Button
                key={index}
                variant={index === listType ? "default" : "outline"}
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
          <div className="flex space-x-1 flex-wrap">
            {tileList &&
              tileList.length > 0 &&
              tileList[listType] &&
              tileList[listType].list &&
              tileList[listType].list.map((item, index) => {
                return (
                  <Button
                    variant={item.type === type?.type ? "default" : "outline"}
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
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              variant={1 === typeNhap ? "default" : "outline"}
              size={"sm"}
              onClick={() => {
                setTypeNhap(1);
                setOrder({
                  so: "",
                  sodiem: 0,
                  type: "sothuong",
                });
              }}
            >
              {t("chon so nhanh")}
            </Button>
            <Button
              variant={2 === typeNhap ? "default" : "outline"}
              size={"sm"}
              onClick={() => {
                setTypeNhap(2);
                setOrder({
                  so: "",
                  sodiem: 0,
                  type: "sothuong",
                });
              }}
            >
              {t("nhap so")}
            </Button>
          </div>
        </div>
        <div className="text-xs text-main leading-7 flex justify-between">
          <span>
            {t("ti le")}：{Number(type?.tileTrathuong)}
          </span>
          <Guide
            content={{
              c: config.cachChoiMega[type?.type as "truotxien5"] || "",
              title: (type?.name as string) || "",
            }}
          />
        </div>
        {typeNhap === 1 && (
          <SelectQuickly
            max={maxSelect[type?.type as "chon5"]}
            order={order}
            setOrder={handleSetOrder}
          />
        )}
        {typeNhap === 2 && <TypeNumber setOrder={handleSetOrder} />}
      </div>
    </>
  );
};

export default SelectForm;
