import { HistoryGameLottery } from "@/apis/game.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const Detail = ({ lottery }: { lottery: HistoryGameLottery }) => {
  const { t } = useTranslation(NS.lottery);
  if (!lottery) return <></>;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="results-item px-2">
          <div className="time text-center">
            <p>{lottery?.phien}</p>
          </div>
          <div className="balls-wp">
            {history &&
              lottery &&
              lottery?.gdb?.split("").map((item, index) => (
                <div key={index} className="ball2" style={{ margin: "3px" }}>
                  <span>{item}</span>
                </div>
              ))}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#1b233d]">
        <DialogHeader>
          <DialogTitle className="text-slate-300">{t("chi tiet")}</DialogTitle>
        </DialogHeader>
        <div className="w-full ">
          <div className="w-full mt-4 flex text-center text-xs text-slate-300 dark:text-slate-200 border border-slate-500 dark:border-slate-700 border-b-0">
            <ul className="w-2/3">
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                  {t("gdb")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b tracking-wider text-base border-slate-500">
                  {lottery.gdb}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                  {t("g1")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b tracking-wider text-base border-slate-500">
                  {lottery.g1}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                  {t("g2")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b tracking-wider text-base border-slate-500">
                  {lottery.g2?.split(",").join(", ").toString()}
                </div>
              </li>
              <li className="flex">
                <div className="w-12  border-b border-r border-slate-500 dark:border-slate-700 text-base leading-10">
                  {t("g3")}
                </div>
                <div className="flex-1 leading-6 h-20 tracking-wider text-base items-center border-b border-slate-500 break-words w-11 pt-2">
                  {lottery.g3?.split(",").join(", ").toString()}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                  {t("g4")}
                </div>
                <div className="flex-1 leading-7 h-14 border-b tracking-wider text-base border-slate-500">
                  {lottery.g4?.split(",").join(", ").toString()}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                  {t("g5")}
                </div>
                <div className="flex-1 leading-5 h-12 border-b tracking-wider text-base border-slate-500 break-words w-11 pt-1">
                  {lottery.g5?.split(",").join(", ").toString()}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                  {t("g6")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b tracking-wider text-base border-slate-500">
                  {lottery.g6?.split(",").join(", ").toString()}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                  {t("g7")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b tracking-wider text-base border-slate-500">
                  {lottery.g7?.split(",").join(", ").toString()}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                  {t("g8")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b tracking-wider text-base border-slate-500">
                  {lottery.g8}
                </div>
              </li>
            </ul>
            <ul className="w-1/3 flex">
              <div className="w-full">
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    0
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[0]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    1
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[1]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    2
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[2]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    3
                  </div>
                  <div className="leading-7 h-10 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[3]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    4
                  </div>
                  <div className="leading-7 h-10 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[4]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    5
                  </div>
                  <div className="leading-7 h-14 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[5]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    6
                  </div>
                  <div className="leading-7 h-12 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[6]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    7
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[7]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    8
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[8]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 text-base leading-7">
                    9
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 text-base w-full">
                    {lottery.dauduoi[9]}
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Detail;
