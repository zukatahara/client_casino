import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import classNames from "classnames";
import { IKenoCau, KenoLsPhien } from "..";
import HistoryPanel from "./HistoryPanel";
import { findItemInColorListById } from "@/constants/constants";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const MainResult: React.FC<{ history: KenoLsPhien[]; cau?: IKenoCau }> =
  React.memo(({ history, cau }) => {
    const { t } = useTranslation(NS.keno);
    const [selectHistory, setSelectHistory] = useState<string>(
      history[0]?.phien ?? ""
    );

    useEffect(() => {
      if (history && history.length > 0) {
        clickHistory(history[0]?.phien);
      }
    }, [history]);

    const clickHistory = useCallback((value: string) => {
      setSelectHistory(value);
    }, []);

    const renderListHistory = useMemo(() => {
      return history.map((it) => {
        const taixiu = findItemInColorListById(it?.taixiu);
        const chanle = findItemInColorListById(it?.chanle);
        const trenHoaDuoi = findItemInColorListById(it?.trenHoaDuoi);
        const nguHanh = findItemInColorListById(
          it.nguHanh === "hoa" ? "nh_hoa" : it.nguHanh
        );

        return (
          <li
            className={classNames("bf", {
              bg3: selectHistory === it.phien,
              bg2: !(selectHistory === it.phien),
            })}
            onClick={() => clickHistory(it.phien)}
          >
            <div className="rigitIssues">
              <div className="issue">{it.phien}</div>
              <div className="openCodeList">
                <span className="sumTotal">{it.tong}</span>
                <span className={`text-${taixiu?.color}-500`}>
                  {/* @ts-ignore */}
                  {t(taixiu?.label)}
                </span>
                <span className={`oddEven odd text-${chanle?.color}-500`}>
                  {/* @ts-ignore */}
                  {t(chanle?.label)}
                </span>
                <span className={`upDown down text-${trenHoaDuoi?.color}-500`}>
                  {/* @ts-ignore */}
                  {t(trenHoaDuoi?.label)}
                </span>
                <span
                  className={`fiveElements earth text-${nguHanh?.color}-500`}
                >
                  {/* @ts-ignore */}
                  {t(nguHanh?.label)}
                </span>
              </div>
            </div>
          </li>
        );
      });
    }, [clickHistory, history, selectHistory]);

    return (
      <div role="tabpanel" className="el-collapse-item__wrap">
        <div className="el-collapse-item__content">
          <div className="openData">
            <div style={{ display: "flex", width: "100%" }}>
              <ul className="kenoLottoOpenNumberList port1">
                <HistoryPanel cau={cau} />
              </ul>
              <ul className="kenoLottoOpenNumberList">
                <li className="header noboder justify-center">
                  <Select
                    value={selectHistory}
                    onValueChange={setSelectHistory}
                  >
                    <SelectTrigger className="w-[180px] bg-transparent border text-slate-200 border-blue-500">
                      <SelectValue placeholder={selectHistory} />
                    </SelectTrigger>
                    <SelectContent className="h-[400px]">
                      {history.map((option) => (
                        <SelectItem
                          onClick={() => {
                            setSelectHistory(String(option.phien));
                          }}
                          key={option.phien}
                          value={String(option.phien)}
                        >
                          {<span className="blue">{option.phien}</span>}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </li>
                <li className="data">
                  <ul>{renderListHistory}</ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  });

export default MainResult;
