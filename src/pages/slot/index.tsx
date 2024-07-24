import { useQuery } from "@tanstack/react-query";
import Footer from "../home/_components/footer/footer";
import { gameApi } from "@/apis/game.api";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/types/game.type";
// import slotHotBanner from "@/assets/images/slot_hot_banner.5edfef94.png";
import slotHotBannerDark from "@/assets/images/slot_hot_banner-dark.png";
import { useTheme } from "@/components/theme-provider";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const SlotPage = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation([NS["HOME"]]);

  const newBanner =
    i18n.language === "vi-VN"
      ? slotHotBannerDark
      : "/th-images/slot_hot_banner-dark.png";
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data?.data?.data;
  const getGamesByType = () => {
    if (games && games.length > 0) {
      return games.filter((game) => game.type === "SL");
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
              // src="https://www.xoso66.me/home/static/img/slot_hot_banner.5edfef94.png"
              src={newBanner}
              width="100%"
              height="100%"
              className="nor rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-20">
            {getGamesByType().map((game, index) => (
              <>
                <li
                  onClick={() => handleLaunchGame(game)}
                  key={index}
                  className={`third-game-slot list-none ${
                    theme == "light" ? "slot" : "slot-dark"
                  }`}
                >
                  <div className="img_games_2">
                    <div className="actionDom" />
                    <img src={game.images_pc} className="subImg jili" />
                    <div className="name">
                      <p className="nametext ">{game.title}</p>
                      <p className="namesub ">
                        {" "}
                        {t("categories.nhung_dieu_bat_ngo_thu_vi", {
                          ns: "home",
                        })}
                      </p>
                    </div>
                    <div
                      className={`circleLogo  ${
                        theme == "dark" && "circleLogo-dark"
                      }`}
                    >
                      <img src={game.icon1} />
                    </div>
                    <div
                      className="playButton dark:text-white  "
                      style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "10px",
                      }}
                    >
                      {" "}
                      {t("categories.vao_tro_choi")}{" "}
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

export default SlotPage;
