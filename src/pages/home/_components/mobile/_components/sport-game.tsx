import ModalLaunchGame from "@/components/modal-launch-game";
import { NS } from "@/constants/ns";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import "@/styles/game-list.css";
import { Game } from "@/types/game.type";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const SportGame = ({ games }: { games: Game[] }) => {
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
      className="liveAndSports ios_safe_area tabGamePage sports"
    >
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <div data-v-79586a24 className="noBetterScroll list-effect">
        {games &&
          games.length > 0 &&
          games.map((item, index) => {
            return (
              <div
                style={{
                  height: item.type === "FH" ? 92 : 138,
                }}
                onClick={() => handleLaunchGame(item)}
                key={index}
                data-v-79586a24
                className="item list-item-effect"
              >
                <img
                  data-v-79586a24
                  alt=""
                  data-src={item.logo}
                  src={item.images_mobile}
                />
                {/**/}
                {item.type !== "FH" &&
                  item.type !== "DM" &&
                  !["DM", "ES", "LK", "OT"].includes(item.type) && (
                    <p data-v-79586a24>
                      {t("categories.phi_hoan_toi_da")} {item.percent}%{" "}
                    </p>
                  )}
                {item.type === "FH" && (
                  <p
                    style={{
                      right: "-5.2vw",
                    }}
                    data-v-79586a24
                    className="dark:text-white"
                  >
                    {t("categories.phi_hoan_toi_da")} {item.percent}%{" "}
                  </p>
                )}
                {["DM", "ES", "LK", "OT"].includes(item.type) && (
                  <p
                    style={{
                      top: "31.533333vw",
                    }}
                    data-v-79586a24
                    className="dark:text-white"
                  >
                    {t("categories.phi_hoan_toi_da")} {item.percent}%{" "}
                  </p>
                )}
                {/**/}
              </div>
            );
          })}
      </div>
      {/**/}
    </div>
  );
};

export default SportGame;
