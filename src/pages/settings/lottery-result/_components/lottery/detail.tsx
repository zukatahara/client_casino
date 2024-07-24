import { HistoryGameLottery } from "@/apis/game.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NS } from "@/constants/ns";
import { useTranslation } from "react-i18next";
const Detail = ({ lottery }: { lottery: HistoryGameLottery }) => {
  const { t } = useTranslation(NS.lotteryResult);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-main">{t("detail")}</div>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg max-h-screen">
        <DialogHeader>
          <DialogTitle>{t("reward_detail")}</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="w-full mt-4 grid grid-cols-2 text-center text-base text-slate-500 dark:text-slate-200 border border-slate-200 dark:border-slate-700 border-b-0">
            <ul className="w-full">
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("special_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.gdb}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("first_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.g1}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("second_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.g2}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("third_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.g3}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("fourth_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.g4}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("fifth_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.g5}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("sixth_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.g6}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("seventh_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.g7}
                </div>
              </li>
              <li className="flex">
                <div className="w-32 border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                  {t("eighth_prize")}
                </div>
                <div className="flex-1 leading-7 h-8 border-b">
                  {lottery.g8}
                </div>
              </li>
            </ul>
            <ul className="w-full flex">
              <div className="w-full">
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    0
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[0]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    1
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[1]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    2
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[2]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    3
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[3]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    4
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[4]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    5
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[5]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    6
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[6]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    7
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[7]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-200 dark:border-slate-700 leading-7">
                    8
                  </div>
                  <div className="leading-7 h-8 border-b w-full">
                    {lottery.dauduoi[8]}
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
