import SectionTitle from "@/pages/home/_components/section-title";
import HorizonSwiper from "./horizon-swiper";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import "@/styles/home-sections.css";
import { mockLiveGames } from "@/data/mock-home-data";
import { Game } from "@/types/game.type";

const LiveGameWp = () => {
  const { t } = useTranslation([NS["HOME"]]);
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data?.data?.data || [];
  // Use mock data if API data is not available
  const liveGames: Game[] = games.length > 0 
    ? games.filter((game: any) => game.type === "LC")
    : mockLiveGames as Game[];

  return (
    <div className="live-game-wp hidden md:block" style={{ width: '100%', maxWidth: '1400px', margin: '16px auto', padding: '0 16px' }}>
      <div className="section-title">
        <SectionTitle title={t("categories.casino_truc_tuyen", { ns: "home" })} />
      </div>
      <div className="section-content" style={{ width: '100%', position: 'relative' }}>
        {liveGames && liveGames.length > 0 ? (
          <HorizonSwiper listData={liveGames} slideType="live" />
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
            {t("categories.dang_tai_du_lieu", { ns: "home", defaultValue: "Đang tải dữ liệu..." })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveGameWp;
