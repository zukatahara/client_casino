import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MegaHistory, MegaStatistic } from "..";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const LottoOpenNumber: React.FC<{
  history: MegaHistory[];
  statistic: MegaStatistic[];
}> = React.memo(({ history, statistic }) => {
  const { t } = useTranslation(NS.mega);
  const [selectHistory, setSelectHistory] = useState<string>("");

  const clickHistory = useCallback((value: string) => {
    setSelectHistory(value);
  }, []);

  const renderListHistory = useMemo(() => {
    return history.map((it) => {
      const resultSplit = it.result?.split(",");

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
            <div
              className="openCodeList"
              style={{ marginLeft: 0, padding: "0 5px" }}
            >
              {resultSplit.map((item, index) => (
                <span
                  className="ball ballRight "
                  style={{ margin: 0 }}
                  key={"result-ball" + index.toString()}
                >
                  <i>{item}</i>
                </span>
              ))}
            </div>
          </div>
        </li>
      );
    });
  }, [clickHistory, history, selectHistory]);

  const renderStatistic = useMemo(() => {
    return statistic.map((it) => {
      return (
        <div className="appear">
          <div style={{ flex: "1.4 1 0%" }}>
            <span className="ball">{it.so}</span>
          </div>
          <div className="blue">
            {it.soKyMoThuong === 0 ? "-" : it.soKyMoThuong}
          </div>
          <div className="red">
            {it.soLanKhongXuatHien === 0 ? "-" : it.soLanKhongXuatHien}
          </div>
        </div>
      );
    });
  }, [statistic]);

  useEffect(() => {
    if (history && history.length > 0) {
      setSelectHistory(history[0].phien);
    }
  }, [history]);

  return (
    <div role="tabpanel" className="el-collapse-item__wrap">
      <div className="el-collapse-item__content">
        <div className="openData">
          <div style={{ display: "flex", width: "100%" }}>
            <ul className="lottoOpenNumberList port1">
              <li className="header">
                <div className="left">
                  <div className="blue">
                    <i className="iconfont icon-icon_radio_button_sel" />
                    {t("mau xanh note")}
                  </div>
                  <div className="red">
                    <i className="iconfont icon-icon_radio_button_sel" />{" "}
                    {t("mau do note")}
                  </div>
                </div>
                <i className="newThemeEl_i" />
                <div className="mid">
                  <span>
                    <i className="iconfont icon-icon_remind" />{" "}
                    {t("thong ke 300 ky")}
                  </span>
                </div>
                <i className="newThemeEl_i" />
              </li>
              <li className="appearStatistics">{renderStatistic}</li>
            </ul>
            <ul className="lottoOpenNumberList">
              <li className="header noboder justify-center">
                <Select value={selectHistory} onValueChange={setSelectHistory}>
                  <SelectTrigger className="w-[180px] bg-transparent border text-slate-200 border-blue-500">
                    <SelectValue placeholder={selectHistory} />
                  </SelectTrigger>
                  <SelectContent className="h-[400px]">
                    {history.map((option) => (
                      <SelectItem
                        onClick={() => {
                          setSelectHistory(String(option.phien));
                        }}
                        key={option.id}
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

export default LottoOpenNumber;
