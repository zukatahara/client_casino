import ModalLaunchGame from "@/components/modal-launch-game";
import { NS } from "@/constants/ns";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import "@/styles/slot-list.css";
import { Game } from "@/types/game.type";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const SlotGame = ({ games }: { games: Game[] }) => {
  const { t, i18n } = useTranslation(NS["HOME"]);
  const newStartPlayImage =
    i18n.language === "vi-VN"
      ? "/start-play.png"
      : "/th-images/bat dau choi.png";

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
    <div data-v-cab8b132 className="headItem slot slotAndFishContainer">
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <div data-v-cab8b132 className="head">
        {/**/}
        <div data-v-cab8b132 className="list-wp slotList list-effect">
          {games &&
            games.length > 0 &&
            games.map((game) => (
              <div
                onClick={() => handleLaunchGame(game)}
                key={game.id}
                data-v-cab8b132
                className="list-item"
              >
                <img data-v-cab8b132 alt="" src={game.images_mobile} />
                <div data-v-cab8b132 className="brand-icon mg">
                  <img data-v-cab8b132 alt="" src={game.icon1} />
                </div>
                <span data-v-cab8b132 className="brand-name">
                  {game.title}
                </span>
                <img
                  data-v-cab8b132
                  src={newStartPlayImage}
                  alt=""
                  className="btn"
                />
                {/**/}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SlotGame;
