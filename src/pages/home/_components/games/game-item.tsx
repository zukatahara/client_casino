import { BodyLaunchGame, gameApi } from "@/apis/game.api";
import { Button } from "@/components/ui/button";
import { NS } from "@/constants/ns";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/types/game.type";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

interface GameItemProps {
  title: string;
  imageUrl: string;
}

interface GameItemProps {
  title: string;
  imageUrl: string;
  game: Game;
}

const GameItem: React.FC<GameItemProps> = ({ title, imageUrl, game }) => {
  const { t } = useTranslation([NS["HOME"], NS["ALL"]]);

  const { isAuthenticated, profile, setProfile } = useContext(AppContext);
  const { toast } = useToast();
  const launchGameMutation = useMutation({
    mutationFn: (body: BodyLaunchGame) => gameApi.lauchGame(body),
    onSuccess: (data) => {
      if (data.data.errMsg !== "SUCCESS") {
        toast({
          title: t("tro_choi_dang_bao_tri", { ns: "all" }),
          variant: "destructive",
        });
        return;
      }
      // @ts-ignore
      setProfile({
        ...profile,
        money: data?.data?.money as number,
      });
      window.open(data.data.gameUrl, "_blank");
    },
  });
  const handleLaunchGame = () => {
    if (!isAuthenticated) {
      return toast({
        title: t("ban_can_dang_nhap_de_thuc_hien", { ns: "all" }),
        variant: "destructive",
      });
    }
    const data = {
      type: game.type,
      providercode: game.providercode,
      html5: "0",
    };
    launchGameMutation.mutate(data);
  };
  return (
    <div className="game">
      <div className="w-full h-full">
        <img className="w-full h-full object-contain" src={imageUrl} alt="" />
      </div>
      <div className="gameName uppercase">{title}</div>
      <div className="btnGame">
        <Button
          isLoading={launchGameMutation.isLoading}
          onClick={handleLaunchGame}
        >
          {t("categories.vao_tro_choi", { ns: "home" })}
        </Button>
      </div>
    </div>
  );
};

export default GameItem;
