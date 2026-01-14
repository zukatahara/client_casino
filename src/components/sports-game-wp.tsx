import SectionTitle from "@/pages/home/_components/section-title";
import HorizonSwiper from "./horizon-swiper";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import "@/styles/home-sections.css";
import { mockSportsGames } from "@/data/mock-home-data";
import { Game } from "@/types/game.type";

const SportsGameWp = () => {
  const { t } = useTranslation([NS["HOME"]]);
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data?.data?.data || [];
  // Use mock data if API data is not available
  const sportsGames: Game[] = games.length > 0
    ? games.filter((game: any) => game.type === "SB")
    : mockSportsGames as Game[];

  return (
    <div className="sports-game-wp hidden md:block" style={{ width: '100%', maxWidth: '1400px', margin: '16px auto', padding: '0 16px' }}>
      <div className="section-title">
        <SectionTitle title={t("categories.the_thao", { ns: "home" })} />
      </div>
      <div className="section-content" style={{ width: '100%', position: 'relative' }}>
        {sportsGames && sportsGames.length > 0 ? (
          <HorizonSwiper listData={sportsGames} slideType="sports" />
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
            {t("categories.dang_tai_du_lieu", { ns: "home", defaultValue: "Đang tải dữ liệu..." })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsGameWp;
