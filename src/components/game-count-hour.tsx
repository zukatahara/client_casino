const GameCountHour = ({ timeLeft }: { timeLeft: string }) => {
    const newTime = timeLeft.toString().split(":");
  
    return (
      <div className="count">
        <div className="item">
          <span>{newTime[0].split("")[0]}</span>
          <span>{newTime[0].split("")[1]}</span>
        </div>
        <span className="relative top-[-12px]">:</span>
        {/* <div className="dot"></div> */}
        <div className="item">
          <span>{newTime[1].split("")[0]}</span>
          <span>{newTime[1].split("")[1]}</span>
        </div>
        <span className="relative top-[-12px]">:</span>
        {/* <div className="dot"></div> */}
        <div className="item">
          <span>{newTime[2].split("")[0]}</span>
          <span>{newTime[2].split("")[1]}</span>
        </div>
      </div>
    );
  };
  
  export default GameCountHour;
  