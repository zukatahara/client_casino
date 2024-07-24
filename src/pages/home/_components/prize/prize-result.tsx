import PrizeItem from "./prize-item";

interface PrizeItemProps {
  title: string;
  imageUrl: string;
  playInfo: string[];
  results: string[];
  time?: string;
  link: string;
}

const PrizeResult = ({
  title,
  imageUrl,
  playInfo,
  results,
  time,
  link,
}: PrizeItemProps) => {
  const sum = results?.reduce((a, b) => Number(a) + Number(b), 0) || 0;
  return (
    <PrizeItem
      title={title}
      imageUrl={imageUrl}
      playInfo={playInfo}
      time={time}
      link={link}
      component={
        <>
          <div className="open_results">{sum}</div>
          {/* <div className="open_results name">Xỉu</div>
          <div className="open_results name">Chẵn</div> */}
          {results && results.length > 0 && results.map((item, index) => (
            <div key={index} className={`dice dice-${item}`}></div>
          ))}
        </>
      }
    />
  );
};

export default PrizeResult;
