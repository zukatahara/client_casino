import { useQuery } from "@tanstack/react-query";
import Footer from "../home/_components/footer/footer";
import { gameApi } from "@/apis/game.api";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/types/game.type";

import chessBanner from "@/assets/images/chess_banner.049282be.png";
import tp from "@/assets/images/tp.png";
import tp1 from "@/assets/images/tp(1).png";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const ChessPage = () => {
  const { t, i18n } = useTranslation(NS["HOME"]);
  const newBanner =
    i18n.language === "vi-VN" ? chessBanner : "/th-images/chess_banner.png";
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data?.data?.data;
  const getGamesByType = () => {
    if (games && games.length > 0) {
      return games.filter((game) => game.type === "PK" || game.type === "CB");
    }
    return [];
  };
  const { isAuthenticated } = useContext(AppContext);
  const { toast } = useToast();
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
              // src="https://www.xoso66.me/home/static/img/chess_banner.049282be.png"
              width="100%"
              height="100%"
              className="nor"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-20">
            {getGamesByType().map((game, index) => (
              <>
                <li
                  onClick={() => handleLaunchGame(game)}
                  key={index}
                  className="third-game-chess actived fourFelx chess list-none"
                >
                  <div className="newThemeChessItem">
                    <div className="imgs">
                      <img
                        src={tp}
                        // src="https://www.xoso66.me/server/static/img/thirdgame/imgs/pc/chess/intersperse_1/tp.png?v=20231222"
                        className="intersperse_1"
                      />
                      <img
                        src={tp1}
                        // src="https://www.xoso66.me/server/static/img/thirdgame/imgs/pc/chess/intersperse_2/tp.png?v=20231222"
                        className="intersperse_2"
                      />
                      <img src={game.images_pc} className="croupier" />
                    </div>
                    <div className="rt">
                      <p className="name">{game.title}</p>

                      <span className="playRebate dark:text-white">
                        {t("categories.phi_hoan_toi_da")} {game.percent}%
                      </span>
                      <div className="playButton dark:text-white  ">
                        {" "}
                        {t("categories.vao_tro_choi")}{" "}
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChessPage;
