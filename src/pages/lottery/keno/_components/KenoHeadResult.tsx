import GameCountTime from "@/components/game-count-time";
import { IKenoResult } from "..";
import { useMemo } from "react";
import { findLabelsById } from "@/constants/constants";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface KenoHeadResultProps {
  id: string;
  phien: string | number;
  timeLeft: number;
  result: IKenoResult | undefined;
}

const KenoHeadResult = ({
  id,
  phien,
  timeLeft,
  result,
}: KenoHeadResultProps) => {
  const { t } = useTranslation(NS.keno);
  const codeList = result?.result;
  const lastResultPhien = result?.phien;
  const sum = result?.tong || 0;

  const renderClassItem = useMemo(() => {
    if (
      result?.taixiu &&
      result?.chanle &&
      result?.nguHanh &&
      result?.trenHoaDuoi
    ) {
      const getLabelTaixiu = findLabelsById(result?.taixiu);
      const getLabelChanle = findLabelsById(result?.chanle);
      const getLabelTrenHoaDuoi = findLabelsById(result?.trenHoaDuoi);
      const getLabelNguHanh = findLabelsById(result?.nguHanh);

      return (
        <div className="flex ml-4 justify-around">
          {/* @ts-ignore */}
          <div className="classItem">{t(getLabelTaixiu)}</div>
          {/* @ts-ignore */}
          <div className="classItem">{t(getLabelChanle)}</div>
          {/* @ts-ignore */}
          <div className="classItem">{t(getLabelTrenHoaDuoi)}</div>
          {/* @ts-ignore */}
          <div className="classItem">{t(getLabelNguHanh)}</div>
        </div>
      );
    }
    return null;
  }, [result]);

  const statusClosed = timeLeft <= 5;

  return (
    <div className="w-full p-6 grid grid-cols-2">
      <div className="flex items-center space-x-2 border-r border-slate-200 dark:border-slate-700">
        <div className="w-[102px] h-20 relative text-center lotteryInfo">
          <img
            src={`/keno/keno-${id}.png`}
            alt=""
            className="h-20 w-20 top-0 left-2 absolute"
          />
          <span className={classNames("status", { closed: statusClosed })}>
            {statusClosed ? t("dang dong keo") : t("dang mo keo")}
          </span>
        </div>
        <div className="text-slate-500 dark:text-slate-200 text-xs">
          <p>
            {t("ky")} {phien}
          </p>
          <p>
            {statusClosed ? t("dang dong keo cuoc") : t("dang mo keo cuoc")}
          </p>
          <GameCountTime timeLeft={timeLeft} />
        </div>
      </div>
      <div className="flex flex-col justify-start space-y-4 text-center items-center text-xs text-slate-500 dark:text-slate-200 p-2">
        <div className="koTitle flex justify-start items-center">
          <p>
            {t("ky")} {lastResultPhien}
          </p>
          {renderClassItem}
        </div>
        <div className="resultList">
          <div className="resultNum">
            <ul className="codeList">
              {codeList &&
                codeList.split(",").map((item) => (
                  <li
                    data-index={0}
                    className="code staggered-fade-enter-to"
                    style={{ opacity: 1 }}
                  >
                    <span>
                      <i>{item}</i>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="resultSum">{sum}</div>
        </div>
      </div>
    </div>
  );
};

export default KenoHeadResult;
