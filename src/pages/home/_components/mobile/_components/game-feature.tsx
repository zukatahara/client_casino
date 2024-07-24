import { gameApi } from "@/apis/game.api";
import { AppContext } from "@/contexts/app.context";
import "@/styles/game-feature.css";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";

import taixiu from "@/assets/images/dx.png";
import bigSmallMD3 from "@/assets/images/bigSmallMD3.png";
import bigSmallMD5 from "@/assets/images/bigSmallMD5-1.png";
import sd from "@/assets/images/sd.png";
import slotLs from "@/assets/images/slotLs.png";
import dice from "@/assets/images/dice.png";
import f35 from "@/assets/images/f35.png";
import yxx from "@/assets/images/yxx.png";
import slotFruit from "@/assets/images/slotFruit.png";
import roshambo from "@/assets/images/roshambo.png";
import fish from "@/assets/images/fish.png";
import guessBigSmall from "@/assets/images/guessBigSmall.png";
import miniPoker from "@/assets/images/mini_poker.png";
import slotXy from "@/assets/images/slotXy.png";
import bjl from "@/assets/images/bjl.png";
import cardPhom from "@/assets/images/cardPhom.png";
import slotGemstone from "@/assets/images/slotGemstone.png";
import slotMj from "@/assets/images/slotMj.png";
import slotVigorous from "@/assets/images/slotVigorous.png";
import slotSpringFestival from "@/assets/images/slotSpringFestival.png";
import cardLhd2 from "@/assets/images/cardLhd2.png";
import slotBowl from "@/assets/images/slotBowl.png";
import slotCat from "@/assets/images/slotCat.png";
import slotCs from "@/assets/images/slotCs.png";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const items = [
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/dx.png?v=20231006",
    sub_game_code: "dx",
    game_name: "TÀI XỈU",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/dx.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TAIXIU.png?v=20231006",
      main_icon: taixiu,
      // main_icon:
      //   "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/dx.png?v=20231006",
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/dx3Min.png?v=20231006",
    sub_game_code: "dx3Min",
    game_name: "TÀI XỈU 3 Phút",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bigSmallMD3.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TAIXIU3MIN.png?v=20231006",
      main_icon: bigSmallMD3,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/bigSmallMD5.png?v=20231006",
    sub_game_code: "bigSmallMD5",
    game_name: "TÀI XỈU MD5",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bigSmallMD5.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TAIXIUMD5.png?v=20231006",
      main_icon: bigSmallMD5,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotCs.png?v=20231006",
    sub_game_code: "slotCs",
    game_name: "THẦN TÀI",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotCs.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/THANTAI.png?v=20231006",
      main_icon: slotCs,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/sd.png?v=20231006",
    sub_game_code: "sd",
    game_name: "XÓC ĐĨA",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/sd.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/XOCDIA.png?v=20231006",
      main_icon: sd,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotLs.png?v=20231006",
    sub_game_code: "slotLs",
    game_name: "LONG THẦN",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotLs.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/LONGTHAN.png?v=20231006",
      main_icon: slotLs,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/dice.png?v=20231006",
    sub_game_code: "dice",
    game_name: "SICBO",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/dice.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/SICBO.png?v=20231006",
      main_icon: dice,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/f35.png?v=20231006",
    sub_game_code: "f35",
    game_name: "F35",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/f35.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/F35.png?v=20231006",
      main_icon: f35,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/yxx.png?v=20231006",
    sub_game_code: "yxx",
    game_name: "BẤU CUA",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/yxx.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/BAUCUA.png?v=20231006",
      main_icon: yxx,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotFruit.png?v=20231006",
    sub_game_code: "slotFruit",
    game_name: "XÈNG HOA QUẢ",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotFruit.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/XENGHOAQUA.png?v=20231006",
      main_icon: slotFruit,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/roshambo.png?v=20231006",
    sub_game_code: "roshambo",
    game_name: "OẲN TÙ TỲ",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/roshambo.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/OANTUTI.png?v=20231006",
      main_icon: roshambo,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/fish.png?v=20231006",
    sub_game_code: "fish",
    game_name: "BẮN CÁ",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/fish.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/BANCA.png?v=20231006",
      main_icon: fish,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/guessBigSmall.png?v=20231006",
    sub_game_code: "guessBigSmall",
    game_name: "TRÊN DƯỚI",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/guessBigSmall.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TRENDUOI.png?v=20231006",
      main_icon: guessBigSmall,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/mini_poker.png?v=20231006",
    sub_game_code: "mini_poker",
    game_name: "MINI-POKER",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/mini_poker.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/MINIPOKER.png?v=20231006",
      main_icon: miniPoker,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotXy.png?v=20231006",
    sub_game_code: "slotXy",
    game_name: "TÂY DU KÝ",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotXy.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TAYDUKY.png?v=20231006",
      main_icon: slotXy,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/bjl.png?v=20231006",
    sub_game_code: "bjl",
    game_name: "BACCARAT",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bjl.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/BACCARAT.png?v=20231006",
      main_icon: bjl,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/cardPhom.png?v=20231006",
    sub_game_code: "cardPhom",
    game_name: "PHOM",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/cardPhom.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/PHOM.png?v=20231006",
      main_icon: cardPhom,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotGemstone.png?v=20231006",
    sub_game_code: "slotGemstone",
    game_name: "BẢO THẠCH KALA",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotGemstone.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/BAOTHACHKALA.png?v=20231006",
      main_icon: slotGemstone,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotMj.png?v=20231006",
    sub_game_code: "slotMj",
    game_name: "ĐƯỜNG MẠT CHƯỢC",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotMj.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/DUONGMATCHUOC.png?v=20231006",
      main_icon: slotMj,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotVigorous.png?v=20231006",
    sub_game_code: "slotVigorous",
    game_name: "THẦN TÀI 777",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotVigorous.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/slotVigorous.png?v=20231006",
      main_icon: slotVigorous,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotSpringFestival.png?v=20231006",
    sub_game_code: "slotSpringFestival",
    game_name: "TẾT NGUYÊN ĐÁN",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotSpringFestival.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/slotSpringFestival.png?v=20231006",
      main_icon: slotSpringFestival,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/cardLhd2.png?v=20231006",
    sub_game_code: "cardLhd2",
    game_name: " LONG HỔ 2",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/cardLhd2.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/cardLhd2.png?v=20231006",
      main_icon: cardLhd2,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotBowl.png?v=20231006",
    sub_game_code: "slotBowl",
    game_name: "TREASURE BOWL",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotBowl.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/slotBowl.png?v=20231006",
      main_icon: slotBowl,
    },
  },
  {
    icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotCat.png?v=20231006",
    sub_game_code: "slotCat",
    game_name: "Neko May Mắn",
    extra: {
      nav_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotCat.png?v=20231006",
      new_icon:
        "https://www.xoso66.me/server/static/img/thirdgame/luckywin/slotCat.png?v=20231006",
      main_icon: slotCat,
    },
  },
];

const GameFeature = () => {
  const { t } = useTranslation([NS["HOME"], NS["ALL"]]);
  const { profile, isAuthenticated, auth } = useContext(AppContext);
  const handlePlayGame = () => {
    if (!isAuthenticated) {
      toast.error(t("categories.ban_can_dang_nhap_de_choi", { ns: "home" }));
      return;
    }
    loginGameMutation.mutate();
  };

  const loginGameMutation = useMutation({
    mutationFn: () =>
      gameApi.loginGame({
        username: profile?.username as string,
        token: auth as string,
      }),
    onSuccess: (data) => {
      if (!data.data.status) {
        toast.error(t("game_dang_phat_trien", { ns: "all" }));
        return;
      } else {
        window.open(
          `https://play.268bet.pro/game/?token=${data.data.token}`,
          "_blank"
        );
      }
    },
  });
  return (
    <div data-v-89e33d08 className="third-game-feature">
      <div className="game-list">
        {items.map((item, index) => (
          <div
            key={index}
            className="feature-game-item"
            onClick={() => handlePlayGame()}
          >
            <div className="main">
              <img src={item.extra.main_icon} />
            </div>
            {/**/}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameFeature;
