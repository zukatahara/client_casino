import { HistoryGameLottery } from "@/apis/game.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import moment from "moment";
const Detail = ({ lottery }: { lottery: HistoryGameLottery }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full p-2 flex">
          <div className="w-1/3">
            <div>{lottery.phien}</div>
            <div>{moment(lottery.created_at).format("DD/MM/YYYY")}</div>
            <div>{moment(lottery.created_at).format("HH:mm:ss")}</div>
          </div>
          <div className="w-2/3">
            <div className="flex justify-end items-center">
              {String(lottery.gdb)
                .split("")
                .map((item, index) => {
                  return (
                    <div key={index} className="ball row-up ball2">
                      <div className="ball-inner-wp">
                        <span className="inner-ball lott-ball">{item}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#1b233d]">
        <DialogHeader>
          <DialogTitle className="text-slate-300">Chi tiết</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="w-full mt-4 flex text-center text-xs text-slate-300 dark:text-slate-200 border border-slate-500 dark:border-slate-700 border-b-0">
            <ul className="w-2/3">
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  GDB
                </div>
                <div className="flex-1 leading-7 h-8 border-b border-slate-500">
                  {lottery.gdb}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  G1
                </div>
                <div className="flex-1 leading-7 h-8 border-b border-slate-500">
                  {lottery.g1}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  G2
                </div>
                <div className="flex-1 leading-7 h-8 border-b border-slate-500">
                  {lottery.g2}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  G3
                </div>
                <div className="flex-1 leading-4 h-8 border-b border-slate-500 break-words w-11">
                  {lottery.g3}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  G4
                </div>
                <div className="flex-1 leading-7 h-8 border-b border-slate-500">
                  {lottery.g4}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  G5
                </div>
                <div className="flex-1 leading-4 h-8 border-b border-slate-500 break-words w-11">
                  {lottery.g5}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  G6
                </div>
                <div className="flex-1 leading-7 h-8 border-b border-slate-500">
                  {lottery.g6}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  G7
                </div>
                <div className="flex-1 leading-7 h-8 border-b border-slate-500">
                  {lottery.g7}
                </div>
              </li>
              <li className="flex">
                <div className="w-12 border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                  G8
                </div>
                <div className="flex-1 leading-7 h-8 border-b border-slate-500">
                  {lottery.g8}
                </div>
              </li>
            </ul>
            <ul className="w-1/3 flex">
              <div className="w-full">
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    0
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
                    {lottery.dauduoi[0]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    1
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
                    {lottery.dauduoi[1]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    2
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
                    {lottery.dauduoi[2]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    3
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
                    {lottery.dauduoi[3]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    4
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
                    {lottery.dauduoi[4]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    5
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
                    {lottery.dauduoi[5]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    6
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
                    {lottery.dauduoi[6]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    7
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
                    {lottery.dauduoi[7]}
                  </div>
                </li>
                <li className="flex">
                  <div className="w-10 border-l border-b border-r border-slate-500 dark:border-slate-700 leading-7">
                    8
                  </div>
                  <div className="leading-7 h-8 border-b border-slate-500 w-full">
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
