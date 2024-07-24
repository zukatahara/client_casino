import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const TaiXiuHistory = ({
  history,
}: {
  history: {
    id: string;
    ketqua: {
      value: string;
      img: string;
      img3D: string;
    }[];
    md5: string;
    hash: string;
    date: Date;
  }[];
}) => {
  const { t } = useTranslation(NS.sicbo);
  const [historyTx, setHistoryTx] = useState<string[][]>([]);
  const [historyCl, setHistoryCl] = useState<string[][]>([]);
  const [txPercent, setTxPercent] = useState<{
    t: number;
    x: number;
  }>({
    t: 0,
    x: 0,
  });
  const [clPercent, setClPercent] = useState<{
    c: number;
    l: number;
  }>({
    c: 0,
    l: 0,
  });
  useEffect(() => {
    if (history && history.length > 0) {
      const items = history.map((item) => {
        const sum = item.ketqua.reduce((a, b) => a + Number(b.value), 0);
        return {
          tx: sum < 11 ? "X" : "T",
          cl: sum % 2 === 0 ? "C" : "L",
        };
      });
      // console.log(items);

      let currentColTx = items[0].tx;
      let currentColCl = items[0].cl;
      let arrTx: string[] = [];
      let arrCl: string[] = [];
      const newHistoryTx: string[][] = [];
      const newHistoryCl: string[][] = [];
      items.forEach((item, index) => {
        // TX
        if (item.tx === currentColTx && index === items.length - 1) {
          arrTx.push(item.tx);
          newHistoryTx.push(arrTx);
        }
        if (item.tx === currentColTx) {
          arrTx.push(item.tx);
        }
        if (item.tx !== currentColTx) {
          newHistoryTx.push(arrTx);
          currentColTx = item.tx;
          arrTx = [];
          arrTx.push(item.tx);
        }

        // CL
        if (item.cl === currentColCl && index === items.length - 1) {
          arrCl.push(item.cl);
          newHistoryCl.push(arrCl);
        }
        if (item.cl === currentColCl) {
          arrCl.push(item.cl);
        }
        if (item.cl !== currentColCl) {
          // console.log(item);

          newHistoryCl.push(arrCl);
          currentColCl = item.cl;
          arrCl = [];
          arrCl.push(item.cl);
        }
      });
      const percentT =
        (items.filter((item) => item.tx === "T").length / items.length) * 100;

      const percentX =
        (items.filter((item) => item.tx === "X").length / items.length) * 100;
      setTxPercent({
        t: percentT,
        x: percentX,
      });
      const percentC =
        (items.filter((item) => item.cl === "C").length / items.length) * 100;
      const percentL =
        (items.filter((item) => item.cl === "L").length / items.length) * 100;
      setClPercent({
        c: percentC,
        l: percentL,
      });
      // console.log(newHistoryCl);

      setHistoryTx(newHistoryTx);
      setHistoryCl(newHistoryCl);
    }
  }, [history]);

  const { theme } = useTheme();
  return (
    <div className="rounded-md bg-slate-200 dark:bg-slate-700 p-4 flex justify-center items-start">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex">
          <TabsTrigger
            value="account"
            className="flex-1 data-[state=active]:bg-[#4a69ff] data-[state=active]:text-white "
          >
            {t("tai xiu")}
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex-1 data-[state=active]:bg-[#4a69ff] data-[state=active]:text-white "
          >
            {t("chan le")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="w-full grid grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#FF5523] text-white flex justify-center items-center text-center">
                {t("tai")}
              </div>
              <CircularProgressbar
                className="w-10 h10"
                value={txPercent.t}
                text={`${Math.floor(txPercent.t)}%`}
                styles={buildStyles({
                  pathColor: "#FF5523",
                  textColor: theme === "light" ? "#FF5523" : "#fff",
                  textSize: "30px",
                })}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#33BBFF] text-white flex justify-center items-center text-center">
                {t("xiu")}
              </div>
              <CircularProgressbar
                className="w-10 h10"
                value={txPercent.x}
                text={`${Math.floor(txPercent.x)}%`}
                styles={buildStyles({
                  pathColor: "#33BBFF",
                  textColor: theme === "light" ? "#33BBFF" : "#fff",
                  textSize: "30px",
                })}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#FFBB33] text-white flex justify-center items-center text-center">
                {t("bao")}
              </div>
              <CircularProgressbar
                className="w-10 h10"
                value={0}
                text={`${0}%`}
                styles={buildStyles({
                  pathColor: "#FFBB33",
                  textColor: theme === "light" ? "#FFBB33" : "#fff",
                  textSize: "30px",
                })}
              />
            </div>
          </div>
          <div className="w-full mt-4 flex items-start space-x-1 overflow-x-auto gap-[2.2px]">
            {historyTx &&
              historyTx.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center space-y-2"
                  >
                    {item.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={cn(
                            "w-4 h-4 rounded-full text-xs text-white flex justify-center items-center text-center",
                            item === "X"
                              ? "bg-[#33BBFF]"
                              : item === "T"
                              ? "bg-[#FF5523]"
                              : "bg-[#FFBB33]"
                          )}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="w-full grid grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#FF5523] text-white flex justify-center items-center text-center">
                {t("le")}
              </div>
              <CircularProgressbar
                className="w-10 h10"
                value={clPercent.l}
                text={`${Math.floor(clPercent.l)}%`}
                styles={buildStyles({
                  pathColor: "#FF5523",
                  textColor: theme === "light" ? "#FF5523" : "#fff",
                  textSize: "30px",
                })}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#33BBFF] text-white flex justify-center items-center text-center">
                {t("chan")}
              </div>
              <CircularProgressbar
                className="w-10 h10"
                value={clPercent.c}
                text={`${Math.floor(clPercent.c)}%`}
                styles={buildStyles({
                  pathColor: "#33BBFF",
                  textColor: theme === "light" ? "#33BBFF" : "#fff",
                  textSize: "30px",
                })}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#FFBB33] text-white flex justify-center items-center text-center">
                {t("bao")}
              </div>
              <CircularProgressbar
                className="w-10 h10"
                value={0}
                text={`${0}%`}
                styles={buildStyles({
                  pathColor: "#FFBB33",
                  textColor: theme === "light" ? "#FFBB33" : "#fff",
                  textSize: "30px",
                })}
              />
            </div>
          </div>
          <div className="w-full mt-4 flex items-start space-x-1 overflow-x-auto">
            {historyCl &&
              historyCl.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center space-y-2"
                  >
                    {item.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={cn(
                            "w-4 h-4 rounded-full text-xs text-white flex justify-center items-center text-center",
                            item === "C"
                              ? "bg-[#33BBFF]"
                              : item === "L"
                              ? "bg-[#FF5523]"
                              : "bg-[#FFBB33]"
                          )}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaiXiuHistory;
