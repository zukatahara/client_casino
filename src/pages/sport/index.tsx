import { useQuery } from "@tanstack/react-query";
import Footer from "../home/_components/footer/footer";
import { gameApi } from "@/apis/game.api";
import SportItem from "../home/_components/sports/sport-item";
import banerThehao from "@/assets/images/banner-thethao.png";
import { useToast } from "@/hooks/use-toast";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { Game } from "@/types/game.type";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const SportPage = () => {
  const { t, i18n } = useTranslation([NS["HOME"]]);
  const newBanner =
    i18n.language === "vi-VN"
      ? banerThehao
      : "/th-images/banner-thethao.png";

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
              src={newBanner}
              // src="https://www.xoso66.me/server/upload/images/20231030/a62470f727bd93c9f077ee81c02b104c.png?v=20240107"
              width="100%"
              height="100%"
              className="nor rounded-md"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-20">
            {getGamesByType("SB").map((game, index) => (
              <div onClick={() => handleLaunchGame(game)}>
                <SportItem key={index} game={game} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SportPage;
