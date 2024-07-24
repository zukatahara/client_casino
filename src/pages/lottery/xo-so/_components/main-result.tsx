import { HistoryGameLottery } from "@/apis/game.api";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
interface MainResultProps {
  history: HistoryGameLottery[];
  theloai?: string;
  t: (key: string) => string;
}

const MainResult = ({ history, theloai, t }: MainResultProps) => {
  const [phienSelected, setPhienSelected] = useState<HistoryGameLottery>();
  const [selectHistory, setSelectHistory] = useState<HistoryGameLottery>();
  useEffect(() => {
    if (history && history.length > 0 && history[0] !== selectHistory) {
      setPhienSelected(history[0]);
      setSelectHistory(history[0]);
    }
  }, [history]);

  const getTaiXiu = (num: number) => {
    if (num >= 5) {
      return <span className="ball big">{t("tai")}</span>;
    } else {
      return <span className="ball small">{t("xiu")}</span>;
    }
  };
  const getChanLe = (num: number) => {
    if (num % 2 === 0) {
      return <span className="ball even">{t("chan")}</span>;
    } else {
      return <span className="ball odd">{t("le")}</span>;
    }
  };

  return (
    <>
      {history && history.length > 0 && phienSelected && (
        <div className="w-full mt-4 flex text-center text-base text-slate-500 dark:text-slate-200 border border-slate-200 dark:border-slate-700 border-b-0 border-r-0 border-l-0">
          <div className="w-4/5 flex flex-wrap">
            {!theloai?.includes("xsmn") && !theloai?.includes("xsmt") && (
              <div className="w-full flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7 flex text-center justify-center items-center">
                  {t("giai 5 chu so")}
                </div>
                <div className="flex-1 h-24 border-b openNum onlyNorthern showMoreData p-3">
                  <div>
                    <span className="label">{t("tai xiu")}</span>
                    {phienSelected.gdb
                      .split("")
                      .map((item) => getTaiXiu(Number(item)))}
                  </div>
                  <div>
                    <span className="label">{t("chan le")}</span>
                    {phienSelected.gdb
                      .split("")
                      .map((item) => getChanLe(Number(item)))}
                  </div>
                  <div>
                    <span className="label">{t("tong")}</span>
                    <span className="ball sumTotal">
                      {phienSelected.gdb
                        .split("")
                        .reduce((a, b) => a + Number(b), 0)}
                    </span>
                    <span className="ball big">
                      {phienSelected.gdb
                        .split("")
                        .reduce((a, b) => a + Number(b), 0) >= 23
                        ? t("tai")
                        : t("xiu")}
                    </span>
                    <span className="ball even">
                      {phienSelected.gdb
                        .split("")
                        .reduce((a, b) => a + Number(b), 0) %
                        2 ===
                      0
                        ? t("chan")
                        : t("le")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <ul className="w-3/4">
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("giai dac biet")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {phienSelected.gdb}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("giai nhat")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {phienSelected.g1}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("giai nhi")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {phienSelected.g2}
                </div>
              </li>
              <li className="flex">
                <div
                  className={`w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7 ${
                    !theloai?.includes("xsmn") && !theloai?.includes("xsmt")
                      ? "flex items-center justify-center"
                      : ""
                  }`}
                >
                  {t("giai ba")}
                </div>
                <div
                  className={`flex-1 leading-7  border-b ${
                    !theloai?.includes("xsmn") && !theloai?.includes("xsmt")
                      ? "flex items-center justify-center h-16"
                      : "h-8"
                  }`}
                >
                  {phienSelected.g3}
                </div>
              </li>
              <li className="flex">
                <div
                  className={`w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7 ${
                    theloai?.includes("xsmn") || theloai?.includes("xsmt")
                      ? "flex items-center justify-center"
                      : ""
                  }`}
                >
                  {t("giai tu")}
                </div>
                <div
                  className={`flex-1 leading-7  border-b ${
                    theloai?.includes("xsmn") || theloai?.includes("xsmt")
                      ? "flex items-center justify-center h-16"
                      : "h-8"
                  }`}
                >
                  {phienSelected.g4}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("giai nam")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {phienSelected.g5}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("giai sau")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {phienSelected.g6}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("giai bay")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {phienSelected.g7}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("giai tam")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {phienSelected.g8}
                </div>
              </li>
            </ul>
            <ul className="w-1/4 flex">
              <div className="w-full">
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    0
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {phienSelected.dauduoi[0]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    1
                  </div>
                  <div className="leading-7 h-8 border-b w-full border-r border-slate-200 dark:border-slate-700">
                    {phienSelected.dauduoi[1]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    2
                  </div>
                  <div className="leading-7 h-8 border-b w-full border-r border-slate-200 dark:border-slate-700">
                    {phienSelected.dauduoi[2]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    3
                  </div>
                  <div className="leading-7 h-8 border-b w-full border-r border-slate-200 dark:border-slate-700">
                    {phienSelected.dauduoi[3]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    4
                  </div>
                  <div className="leading-7 h-8 border-b w-full border-r border-slate-200 dark:border-slate-700">
                    {phienSelected.dauduoi[4]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    5
                  </div>
                  <div className="leading-7 h-8 border-b w-full border-r border-slate-200 dark:border-slate-700">
                    {phienSelected.dauduoi[5]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    6
                  </div>
                  <div className="leading-7 h-8 border-b w-full border-r border-slate-200 dark:border-slate-700">
                    {phienSelected.dauduoi[6]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    7
                  </div>
                  <div className="leading-7 h-8 border-b w-full  border-r border-slate-200 dark:border-slate-700">
                    {phienSelected.dauduoi[7]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    8
                  </div>
                  <div className="leading-7 h-8 border-b w-full  border-r border-slate-200 dark:border-slate-700">
                    {phienSelected.dauduoi[8]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    9
                  </div>
                  <div className="leading-7 h-8 border-b w-full border-r border-slate-200 dark:border-slate-700 ">
                    {phienSelected.dauduoi[9]}
                  </div>
                </li>
              </div>
            </ul>
          </div>
          <ul className={`w-1/5 `}>
            {history.map((item, index) => {
              if (
                !theloai?.includes("xsmn") && !theloai?.includes("xsmt")
                  ? index <= 12
                  : index <= 9
              ) {
                return (
                  <div
                    key={index}
                    className={cn(
                      "leading-7 h-8  border-b w-full",
                      phienSelected.id === item.id
                        ? "bg-blue-100 text-main"
                        : ""
                    )}
                    onClick={() => {
                      setPhienSelected(item);
                    }}
                  >
                    {item.phien}
                  </div>
                );
              }
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default MainResult;
