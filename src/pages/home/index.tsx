import Banner from "./_components/banner";
// import Footer from "./_components/footer/footer";
// import Games from "./_components/games/games";
import Prize from "./_components/prize/prize";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import FeaturedGames from "./_components/featured-games/featured-games";
// import AppInfo from "./_components/app-info";
import Sports from "./_components/sports/sports";
import AppInfo from "./_components/app-info";
import Footer from "./_components/footer/footer";
import Casino from "./_components/casino/casino";
import Lottery from "./_components/mobile/lottery";
import HotLottery from "./_components/mobile/hot-lottery";
// import Luckywin from "./_components/mobile/lucky-win";
import GameMobile from "./_components/mobile/game-mobile";
import NavBarMobile from "@/components/nav-bar-mobile";
import homeApi from "@/apis/home.api";
import { LiveChatWidget } from "@livechat/widget-react";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
// import AppInfo from "./_components/app-info";

const HomePage = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data?.data?.data;
  const getGamesByType = (type: string) => {
    if (games && games.length > 0) {
      return games.filter((game) => game.type === type);
    }
    return [];
  };

  const { data: dataSetting } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const chatId = dataSetting?.data.data.id_livechat;

  return (
    <>
      <NavBarMobile />
      <Banner />
      {/* <Luckywin /> */}
      <GameMobile
        className="live"
        games={getGamesByType("LC")}
        title={t("casino_truc_tuyen", { ns: "all" })}
      />

      <GameMobile
        className="sports"
        games={getGamesByType("SB")}
        title={t("the_thao", { ns: "all" })}
      />
      <GameMobile
        className="slot3"
        games={getGamesByType("SL")}
        title={t("no_hu", { ns: "all" })}
      />
      <GameMobile
        className="chess"
        games={getGamesByType("CB")}
        title={t("game_bai", { ns: "all" })}
      />
      <Casino games={getGamesByType("LC")} />
      <Sports games={getGamesByType("SB")} />
      <Lottery />
      <HotLottery />

      <Prize />
      <FeaturedGames />

      {/* <Games title="Trận cầu đỉnh cao" games={getGamesByType("SB")} /> */}

      {/* <Games title="Live Casino" games={getGamesByType("LC")} /> */}
      {/* <Games title="Nổ hũ" games={getGamesByType("SL")} />
      <Games title="Bắn cá" games={getGamesByType("FH")} />
      <Games title="E-Sports" games={getGamesByType("ES")} /> */}
      <AppInfo />
      <Footer />
      {chatId && <LiveChatWidget license={chatId} />}
    </>
  );
};

export default HomePage;
