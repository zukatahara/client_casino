
import { NS } from "@/constants/ns";
import { Game } from "@/types/game.type";
import { useTranslation } from "react-i18next";


interface SportItemProps {
  game: Game;
}

const SportItem = ({ game }: SportItemProps) => {
const {t} = useTranslation([NS["HOME"]]);
  return (
    <li className="third-game-sport">
      <div className="sportsItem">
        <div>
          <div className="row-l">
            <div className="platLogo">
              <img src={game.icon2} alt="" />
            </div>
            <p className="playCode">{game.title}</p>
            <div className="playRebateWp">
              <span className="playRebate dark:text-white"> {t("categories.phi_hoan_toi_da")} 1.2%</span>
            </div>
            <div className="playButton dark:text-white  " > {t("categories.vao_tro_choi")}</div>
          </div>
          <div className="game-img-athlete">
            <img
              src={game.images_pc}
              width="100%"
              height="100%"
              alt=""
              className="athlete showAni object-contain"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SportItem;
