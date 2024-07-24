import { useQuery } from "@tanstack/react-query";
import Footer from "../home/_components/footer/footer";
import { gameApi } from "@/apis/game.api";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/types/game.type";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import banner from "@/assets/images/img_fish_bg.a789e556.png";
// import { url } from "inspector";
const FishPage = () => {
  const { t, i18n } = useTranslation(NS["HOME"]);
  const newBanner =
    i18n.language === "vi-VN" ? banner : "/th-images/img_fish_bg.a789e556.png";
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
    <div className="Fish routerView fish">
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <div className="flexContainer">
        <div
          className="container fish"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        >
          <div className="bg fish">
            <div className="main">
              <div className="providerList providerListFish">
                <ul>
                  {getGamesByType("FH").map((game) => (
                    <li onClick={() => handleLaunchGame(game)} key={game.id}>
                      <img src={game.images_pc} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FishPage;
