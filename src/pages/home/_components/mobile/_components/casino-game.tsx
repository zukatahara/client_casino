import { Game } from "@/types/game.type";
import "@/styles/casino-list.css";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const CasinoGame = ({ games }: { games: Game[] }) => {
  const { t } = useTranslation(NS["HOME"]);
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
    <div
      data-v-79586a24
      data-v-dc4dbe90
      className="liveAndSports ios_safe_area tabGamePage live"
    >
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <div
        data-v-79586a24
        className="noBetterScroll list-effect van-row van-row--flex van-row--justify-space-between"
        style={{
          animation:
            "0.8s ease-in-out 0s 1 normal forwards running list-effect-ani",
        }}
      >
        {games &&
          games.length > 0 &&
          games.map((item, index) => {
            return (
              <div
                onClick={() => handleLaunchGame(item)}
                key={index}
                data-v-79586a24
                className="listcol van-col van-col--12 list-item-effect"
                style={{
                  position: "relative",
                  animation:
                    "0s ease-in-out 0s 1 normal forwards running list-effect-ani",
                  paddingRight: 7,
                }}
              >
                <div data-v-79586a24 className="liveItem">
                  <div data-v-79586a24 className="rebate-box">
                    <img
                      data-v-79586a24
                      alt=""
                      data-src={item.images_mobile}
                      src={item.images_mobile}
                    />
                    {item.type === "LC" && (
                      <div data-v-79586a24 className="rebates">
                        {/**/}
                        <span data-v-79586a24 className="dark:text-white">
                          {t("categories.phi_hoan_toi_da")} {item.percent}%{" "}
                        </span>
                      </div>
                    )}
                  </div>
                  {/**/}
                </div>
              </div>
            );
          })}
      </div>
      {/**/}
    </div>
  );
};

export default CasinoGame;
