import { useQuery } from "@tanstack/react-query";
import Footer from "../home/_components/footer/footer";
import { gameApi } from "@/apis/game.api";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
// import gameCock from "@/assets/images/gamecock_ws168_tab_nor.png";
import img_cockfight from "@/assets/images/img_cockfight_bg.119b4bc4.png";
import img_cockfight_dark from "@/assets/images/img_cockfight_bg-dark.png";
import ws168_left from "@/assets/images/ws168_left.43622812.png";
import { useTheme } from "@/components/theme-provider";
import ModalLaunchGame from "@/components/modal-launch-game";
import { Game } from "@/types/game.type";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const CockfightingPage = () => {
  const { t, i18n } = useTranslation([NS["HOME"], NS["ALL"]]);
  const newBanner =
    i18n.language === "vi-VN"
      ? "/cock-fighting/1.png"
      : "/th-images/dagalive.png";

  const { theme } = useTheme();
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data?.data?.data;
  const getGamesByType = () => {
    if (games && games.length > 0) {
      return games.filter((game) => game.providercode === "DM");
    }
    return [];
  };
  const { isAuthenticated } = useContext(AppContext);
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [gameSelect, setGameSelect] = useState<Game>();

  const handleLaunchGame = () => {
    if (!isAuthenticated) {
      toast({
        title: t("categories.ban_can_dang_nhap_de_choi"),
        variant: "destructive",
      });
      return;
    }
    const game = getGamesByType()[0];
    setOpen(true);
    setGameSelect(game);
  };

  return (
    <>
      <div className="thirdGames routerView">
        <ModalLaunchGame
          open={open}
          setOpen={setOpen}
          gameSelect={gameSelect}
        />
        <div className="flexContainer cockfighting">
          <img
            // src="https://www.xoso66.me/home/static/img/img_cockfight_bg.119b4bc4.png"
            src={theme === "light" ? img_cockfight : img_cockfight_dark}
            className="bg-img"
          />
          <div className="container px-0">
            {/**/}
            <div className="cockfightingList">
              <div className="providerList">
                <ul>
                  <li className="actived">
                    {/* <img
                      // src="https://www.xoso66.me/server/static/img/thirdgame/pc/gamecock/gamecock_ws168_tab_nor.png?v=20240107"
                      src={gameCock}
                      width="100%"
                      height="100%"
                      className="nor"
                    /> */}
                    <img
                      src={newBanner}
                      width="100%"
                      height="100%"
                      className="sel"
                    />
                  </li>
                </ul>
              </div>
              <img
                // src="https://www.xoso66.me/home/static/img/ws168_left.43622812.png"
                src={ws168_left}
                className="leftImg"
              />
              <img
                src={
                  theme === "light"
                    ? "./cock-fighting/2.png"
                    : "./cock-fighting/2-dark.png"
                }
                className="rightImg"
              />
              <div className="btn-play">
                <div className="icon-play" />
                <div onClick={handleLaunchGame} className="btn-txt">
                  {t("play_now", { ns: "all" })}
                </div>
              </div>
              {/**/}
            </div>
          </div>
          {/**/}
        </div>
        <div className="el-dialog__wrapper" style={{ display: "none" }}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="dialog"
            className="el-dialog el-dialog--center game-list-dailog"
            style={{ marginTop: "15vh" }}
          >
            <div className="el-dialog__header">
              <span className="el-dialog__title" />
              <button
                type="button"
                aria-label="Close"
                className="el-dialog__headerbtn"
              >
                <i className="el-dialog__close el-icon el-icon-close" />
              </button>
            </div>
            {/**/}
            {/**/}
          </div>
        </div>
      </div>
      <div className="mt-[17vh]">
        <Footer />
      </div>
    </>
  );
};

export default CockfightingPage;
