import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const MothuongHistory = ({
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
    phien: number;
  }[];
}) => {
  const { t } = useTranslation(NS.sicbo);
  return (
    <div className="rounded-md bg-slate-200 dark:bg-slate-700 p-4 px-1 overflow-y-auto">
      <p className="px-3 py-2 text-xs rounded-lg border border-main text-main text-center">
        {t("lich su mo thuong")}
      </p>
      <ScrollArea className="mt-4 flex flex-col justify-center w-full space-y-1 h-[300px]">
        {history &&
          history.map((item, index) => {
            const sum = item.ketqua.reduce(
              (
                a: number,
                b: {
                  value: string;
                }
              ) => a + Number(b.value),
              0
            );
            return (
              <div
                key={index}
                className="w-full flex items-center space-x-2 mt-2"
              >
                <div className="text-xs text-slate-500 dark:text-slate-200">
                  {item.phien}
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs p-2 bg-slate-300 rounded-2xl w-2/5">
                  <span className="text-main">{sum}</span>
                  <span className="text-[#FF5523]">
                    {sum < 11 ? t("xiu") : t("tai")}
                  </span>
                  <span className="text-[#33BBFF]">
                    {sum % 2 === 0 ? t("chan") : t("le")}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {item.ketqua.map((item, index) => (
                    <div
                      key={index}
                      className={`dice dice-${item.value} dice-mini`}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
      </ScrollArea>
    </div>
  );
};

export default MothuongHistory;
