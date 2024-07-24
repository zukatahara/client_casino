import { gameApi } from "@/apis/game.api";
import { useQuery } from "@tanstack/react-query";
import CasinoItem from "../home/_components/casino/casino-item";
import Footer from "../home/_components/footer/footer";
// import bannerLive from "@/assets/images/live_banner.ebf3a2fe.png";
import bannerLiveDark from "@/assets/images/live_banner-dark.png";
// import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { Game } from "@/types/game.type";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const CasinoPage = () => {
  const { t, i18n } = useTranslation(NS["HOME"]);
  const newBanner =
    i18n.language === "vi-VN"
      ? bannerLiveDark
      : "/th-images/live_banner-dark.png";
  // const { theme } = useTheme();
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

  const { toast } = useToast();
  const { isAuthenticated } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [gameSelect, setGameSelect] = useState<Game>();

  const handleLaunchGame = (game: any) => {
    if (!isAuthenticated) {
      toast({
        title: t("categories.ban_can_dang_nhap_de_choi"),
        variant: "destructive",
      });
      return;
    }
    setOpen(true);
    setGameSelect(game);
  };

  return (
    <div className="thirdGames routerView">
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <div className="flexContainer live">
        <div className="container">
          <div className="banner">
            <img
              // src="https://www.xoso66.me/home/static/img/live_banner.ebf3a2fe.png"
              src={newBanner}
              width="100%"
              height="100%"
              className="nor"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-20">
            {getGamesByType("LC").map((game, index) => (
              <div onClick={() => handleLaunchGame(game)}>
                <CasinoItem
                  key={index}
                  croupierUrl={game.images_pc}
                  foregroundUrl={""}
                  platformLogoUrl={game.icon2}
                  playCode={game.title}
                  playRebate={`${game.percent}`}
                  game={game}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CasinoPage;
