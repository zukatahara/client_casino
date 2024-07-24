import GameCountTime from "@/components/game-count-time";
import { cn } from "@/lib/utils";

interface HeadResultProps {
  theloai: string;
  timeLeft: number;
  result:
    | {
        gdb: string;
        phien: number;
      }
    | undefined;
  phien?: number;
  t: (key: string) => string;
}

const HeadResult = ({
  theloai,
  timeLeft,
  result,
  phien,
  t,
}: HeadResultProps) => {
  return (
    <div className="w-full p-6 grid grid-cols-2">
      <div className="flex items-center space-x-2 border-r border-slate-200 dark:border-slate-700">
        <div className="w-[102px] h-20 relative text-center">
          <img
            src={`/xoso/${theloai}.png`}
            alt=""
            className="h-20 w-20 top-0 left-2 absolute"
          />
          <span
            className={cn(
              "absolute w-32 h-6 text-white bottom-0 left-[-20px] text-center rounded-sm text-base p-2 flex justify-center items-center whitespace-nowrap",
              timeLeft <= 5 ? "bg-red-600" : "bg-green-600"
            )}
          >
            {timeLeft <= 5 ? t("dang dong keo") : t("dang mo keo")}
          </span>
        </div>
        <div className="text-slate-500 dark:text-slate-200 text-base">
          <p>
            {t("ky")} {phien ? phien : Number(result?.phien) + 1}
          </p>
          <p>
            {timeLeft <= 5 ? t("dang dong keo cuoc") : t("dang mo keo cuoc")}
          </p>
          <GameCountTime timeLeft={timeLeft} />
        </div>
      </div>
      <div className="flex flex-col justify-start space-y-4 text-center items-center text-base text-slate-500 dark:text-slate-200 p-6">
        <p>
          {t("ky")} {result && result.phien}, {t("giai dac biet")}
        </p>
        <div className="flex flex-wrap w-full justify-center ball-lt">
          {result &&
            result.gdb.split("").map((item, index) => (
              <div key={index} className="ball">
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeadResult;
