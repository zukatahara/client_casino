import { useTheme } from "@/components/theme-provider";
import { NS } from "@/constants/ns";
import { Game } from "@/types/game.type";
import { useTranslation } from "react-i18next";

interface CasinoItemProps {
  croupierUrl: string;
  foregroundUrl: string;
  platformLogoUrl: string;
  playCode: string;
  playRebate: string;
  game: Game;
}

const CasinoItem = ({
  croupierUrl,
  foregroundUrl,
  platformLogoUrl,
  playCode,
  game,
}: CasinoItemProps) => {
  const { t } = useTranslation(NS["HOME"]);
  const { theme } = useTheme();

  return (
    <div className={`${theme} third-game-live`}>
      <div className="liveItem">
        <div className="imgs">
          <img src={croupierUrl} alt="" className="croupier" />
          <img src={foregroundUrl} alt="" className="foreground" />
        </div>
        <div className="playInfo">
          <img src={platformLogoUrl} alt="" className="platLogo" />
          <p className="playCode">{playCode}</p>
          <div className="playRebateWp">
            {/**/}
            <span className="playRebate hidden md:inline-block dark:text-white">
              {t("categories.phi_hoan_toi_da")} {game.percent}%
            </span>
          </div>
          <div className="playButton dark:text-white  ">
            {t("categories.vao_tro_choi")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoItem;
