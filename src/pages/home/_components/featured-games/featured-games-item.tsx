import { BodyLaunchGame, gameApi } from "@/apis/game.api";
import { Button } from "@/components/ui/button";
import { NS } from "@/constants/ns";
import { AppContext } from "@/contexts/app.context";
import { Game } from "@/types/game.type";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface FeaturedGameItemProps {
  title: string;
  imageUrl: string;
  game: Game;
}
const FeaturedGameItem: React.FC<FeaturedGameItemProps> = ({
  title,
  imageUrl,
  game,
}) => {
  const { t } = useTranslation(NS["HOME"]);
  const { isAuthenticated, profile, setProfile } = useContext(AppContext);
  // const handlePlayGame = () => {
  //   if(!isAuthenticated){
  //     toast.error('Bạn cần đăng nhập để thực hiện chức năng này')
  //     return
  //   }
  //   loginGameMutation.mutate()
  // }

  // const loginGameMutation = useMutation({
  //   mutationFn: () => gameApi.loginGame({
  //     username: profile?.username as string,
  //     token: auth as string
  //   }),
  //   onSuccess: (data) => {
  //     if(!data.data.status){
  //       toast.error('Game đang phát triển')
  //       return
  //     }else{
  //       window.open(`https://play.268bet.pro/game/?token=${data.data.token}`, "_blank");
  //     }
  //   },
  // })
  const launchGameMutation = useMutation({
    mutationFn: (body: BodyLaunchGame) => gameApi.lauchGame(body),
    onSuccess: (data) => {
      if (data.data.errMsg !== "SUCCESS") {
        toast.error(t("tro_choi_dang_bao_tri", { ns: "all" }));
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
  const handleLaunchGame = (game: Game) => {
    if (!isAuthenticated) {
      toast.error(t("ban_can_dang_nhap_de_thuc_hien", { ns: "all" }));
      return;
    }
    const data = {
      type: game.type,
      providercode: game.providercode,
      html5: "0",
    };
    launchGameMutation.mutate(data);
  };
  return (
    <div
      onClick={() => handleLaunchGame(game)}
      className="game md:h-[198px] dark:bg-[#313537]"
    >
      <div className="w-full scale-[0.6]">
        <img className="w-full h-full" src={imageUrl} alt="" />
      </div>
      <div className="gameName uppercase dark:bg-[#323337] dark:text-[#e3e3e3]">
        {title}
      </div>
      <div className="btnGame">
        <Button>{t("categories.vao_tro_choi")}</Button>
      </div>
    </div>
  );
};

export default FeaturedGameItem;
