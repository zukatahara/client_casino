import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface PrizeItemProps {
  title: string;
  imageUrl: string;
  playInfo: string[];
  time?: string;
  component?: React.ReactNode | null;
  link: string;
}

const PrizeItem = ({
  title,
  imageUrl,
  playInfo,
  component,
  time,
  link,
}: PrizeItemProps) => {
  const { t } = useTranslation(NS.lottery);
  return (
    <Card
      className="h-[179px] pl-4 py-5 relative w-full rounded-2xl dark:bg-[#031c32] border-none"
      style={{
        boxShadow:
          "0 0 0 0 transparent, inset 0 -1px 3px 0 rgba(0,0,0,.11), 0 0 8px 0 rgba(0,0,0,.12)",
      }}
    >
      <div className="countdown-wp">
        <div className="text-white text-base md:text-base">{time}</div>
      </div>
      <div className="flex justify-between gap-4 my-1">
        <div className="bg-third  dark:bg-[#032846] w-[72px] h-[72px] flex rounded-md items-center justify-center">
          <img src={imageUrl} alt="" className="w-[66px] h-[66px]" />
        </div>
        <div className="flex-1">
          <div className="dark:bg-[#032846] bg-third text-fourth text-base py-2 px-4">
            {title}
          </div>
          <div className="flex justify-start mt-4 mr-5 mb-2 gap-2">
            {playInfo.map((item, index) => (
              <div
                key={index}
                className="dark:bg-[#032846] bg-third text-[#90a2dc] text-[10px] md:text-xs py-2 px-4 cursor-pointer whitespace-nowrap"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 my-1">
        <div className="flex flex-wrap max-w-[270px]">{component}</div>
        <Link to={link}>
          <Button className="mt-1 mr-2 dark:text-slate-200">
            {t("dat cuoc")}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PrizeItem;
