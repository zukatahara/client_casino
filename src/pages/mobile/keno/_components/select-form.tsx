import React, { useEffect, useMemo, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import useWebSocket from "react-use-websocket";
import { labelTile, tiLeProps } from "..";
import classNames from "classnames";
import { findLabelsById } from "@/constants/constants";
import { URL } from "@/constants/url";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface SelectFormProps {
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
  tile?: tiLeProps;
}

const SelectForm = ({ order, setOrder, tile }: SelectFormProps) => {
  const config = Config();
  const { t } = useTranslation(NS.keno);
  const [tonghop, setTongHop] = useState<
    {
      tiLe: number;
      value: string;
      content: string;
    }[]
  >(config.tonghopOld);
  const { lastMessage } = useWebSocket(URL.webSocketUrl);
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const taixiuData = data.taixiu || {};

      if (taixiuData.tile) {
        const tiLeData = taixiuData.tile[0];

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

  const renderSelectBoxTile = useMemo(() => {
    if (tile) {
      return Object.keys(tile).map((key: any) => {
        const getCurrentValue = (tile as any)[key];

        const getChildKey = Object.keys(getCurrentValue);
        return (
          <li>
            <div className="title">{t(labelTile[key]) ?? ""}</div>
            <ul className="ballBox">
              {getChildKey.map((it) => {
                const findLabel = findLabelsById(it);
                return (
                  <li
                    className={classNames(
                      "flex-1",
                      order.value === it ? "clicked" : ""
                    )}
                    onClick={() => {
                      if (order.value !== it) {
                        setOrder({
                          type: key,
                          price: 1000,
                          value: it,
                        });
                      } else {
                        setOrder({
                          ...order,
                          value: "",
                        });
                      }
                    }}
                  >
                    {/* @ts-ignore */}

                    <p className="text-sm">{t(findLabel)}</p>
                    <p className="text-xs">
                      {Number(getCurrentValue[it as any]).toFixed(1)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      });
    }
    return null;
  }, [tile, order]);

  return (
    <div className="relative kenoBet">
      <ul className="row">{renderSelectBoxTile}</ul>
    </div>
  );
};

export default SelectForm;
