import PrizeItem from "./prize-item";

interface PrizeItemProps {
  title: string;
  imageUrl: string;
  playInfo: string[];
  balls: string[];
  time?: string;
  link: string;
}

const PrizeBall = ({ title, imageUrl, playInfo, balls, time, link }: PrizeItemProps) => {
  return (
    <PrizeItem
      title={title}
      imageUrl={imageUrl}
      playInfo={playInfo}
      time={time}
      link={link}
      component={
        <>
          {balls.map((item, index) => (
            <div key={index} className="ball">
              {item}
            </div>
          ))}
        </>
      }
    />
  );
};

export default PrizeBall;
