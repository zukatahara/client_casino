import { cn } from "@/lib/utils";

const GameCountTime = ({ timeLeft }: { timeLeft: number }) => {
  const hour = Math.floor(timeLeft / 3600) || 0;
  const minute = Math.floor((timeLeft % 3600) / 60) || 0;
  const second = Math.floor(((timeLeft % 3600) % 60) % 60) || 0;
  const isClose = timeLeft <= 5;
  return (
    <div className={cn("count", isClose && "close")}>
      <div className="item">
        {
          hour > 9 ? <>{hour.toString().split("").map((item, index) => <span key={index}>{item}</span>)}</> : <><span>0</span><span>{hour}</span></>
        }
      </div>
      {/* <div className="dot"></div> */}
      <span className="relative top-[-12px]">:</span>
      <div className="item">
        {
          minute > 9 ? <><span>{minute.toString().split("")[0]}</span><span>{minute.toString().split("")[1]}</span></> : <><span>0</span><span>{minute}</span></>
        }
      </div>
      {/* <div className="dot"></div> */}
      <span className="relative top-[-12px]">:</span>
      <div className="item">
        {
          second > 9 ? <><span>{second.toString().split("")[0]}</span><span>{second.toString().split("")[1]}</span></> : <><span>0</span><span>{second}</span></>
        }
      </div>
    </div>
  );
};

export default GameCountTime;
