import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

// import required modules
import { Grid, Navigation } from "swiper/modules";
import { useContext, useRef } from "react";
import SectionTitleMobile from "./section-title-mobile";
import { AppContext } from "@/contexts/app.context";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import dx1 from "@/assets/images/dx-1.png";
import dx3 from "@/assets/images/dx3Min.png";
import dx5 from "@/assets/images/bigSmallMD5.png";
import slotcs from "@/assets/images/slotCs.png";
import sd1 from "@/assets/images/sd-1.png";
import slot1 from "@/assets/images/slotLs-1.png";
import dice1 from "@/assets/images/dice-1.png";
import f35 from "@/assets/images/f35-1.png";
import baucua from "@/assets/images/baucua.png";
import hoaqua from "@/assets/images/slotFruit-1.png";
import onatuti from "@/assets/images/roshambo-1.png";
import fish from "@/assets/images/fish-1.png";
import trenduoi from "@/assets/images/guessBigSmall-1.png";
import minipoker from "@/assets/images/mini_poker-1.png";
import tayduky from "@/assets/images/slotXy-1.png";
import baccarat from "@/assets/images/bjl-1.png";
import phom from "@/assets/images/cardPhom-1.png";
import baothach from "@/assets/images/slotGemstone-1.png";
import matchuoc from "@/assets/images/slotMj-1.png";
import thantai from "@/assets/images/slotVigorous-1.png";
import tet from "@/assets/images/slotSpringFestival-1.png";
import longho from "@/assets/images/cardLhd2-1.png";
import bowl from "@/assets/images/slotBowl-1.png";
import neko from "@/assets/images/slotCat-1.png";
import ace from "@/assets/images/slotPoker.png";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const items = [
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/dx.png?v=20231014",
    icon: dx1,
    sub_game_code: "dx",
    game_name: "TÀI XỈU",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/dx.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/TAIXIU.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/dx.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/dx3Min.png?v=20231014",
    icon: dx3,
    sub_game_code: "dx3Min",
    game_name: "TÀI XỈU 3 Phút",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bigSmallMD3.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/TAIXIU3MIN.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/bigSmallMD3.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/bigSmallMD5.png?v=20231014",
    icon: dx5,
    sub_game_code: "bigSmallMD5",
    game_name: "TÀI XỈU MD5",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bigSmallMD5.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/TAIXIUMD5.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/bigSmallMD5.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotCs.png?v=20231014",
    icon: slotcs,
    sub_game_code: "slotCs",
    game_name: "THẦN TÀI",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotCs.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/THANTAI.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotCs.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/sd.png?v=20231014",
    icon: sd1,
    sub_game_code: "sd",
    game_name: "XÓC ĐĨA",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/sd.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/XOCDIA.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/sd.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotLs.png?v=20231014",
    icon: slot1,
    sub_game_code: "slotLs",
    game_name: "LONG THẦN",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotLs.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/LONGTHAN.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotLs.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/dice.png?v=20231014",
    icon: dice1,
    sub_game_code: "dice",
    game_name: "SICBO",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/dice.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/SICBO.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/dice.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/f35.png?v=20231014",
    icon: f35,
    sub_game_code: "f35",
    game_name: "F35",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/f35.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/F35.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/f35.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/yxx.png?v=20231014",
    icon: baucua,
    sub_game_code: "yxx",
    game_name: "BẤU CUA",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/yxx.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/BAUCUA.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/yxx.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotFruit.png?v=20231014",
    icon: hoaqua,
    sub_game_code: "slotFruit",
    game_name: "XÈNG HOA QUẢ",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotFruit.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/XENGHOAQUA.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotFruit.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/roshambo.png?v=20231014",
    icon: onatuti,
    sub_game_code: "roshambo",
    game_name: "OẲN TÙ TỲ",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/roshambo.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/OANTUTI.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/roshambo.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/fish.png?v=20231014",
    icon: fish,
    sub_game_code: "fish",
    game_name: "BẮN CÁ",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/fish.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/BANCA.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/fish.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/guessBigSmall.png?v=20231014",
    icon: trenduoi,
    sub_game_code: "guessBigSmall",
    game_name: "TRÊN DƯỚI",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/guessBigSmall.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/TRENDUOI.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/guessBigSmall.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/mini_poker.png?v=20231014",
    icon: minipoker,
    sub_game_code: "mini_poker",
    game_name: "MINI-POKER",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/mini_poker.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/MINIPOKER.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/mini_poker.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotXy.png?v=20231014",
    icon: tayduky,
    sub_game_code: "slotXy",
    game_name: "TÂY DU KÝ",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotXy.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/TAYDUKY.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotXy.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/bjl.png?v=20231014",
    icon: baccarat,
    sub_game_code: "bjl",
    game_name: "BACCARAT",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bjl.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/BACCARAT.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/bjl.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/cardPhom.png?v=20231014",
    icon: phom,
    sub_game_code: "cardPhom",
    game_name: "PHOM",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/cardPhom.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/PHOM.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/cardPhom.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotGemstone.png?v=20231014",
    icon: baothach,
    sub_game_code: "slotGemstone",
    game_name: "BẢO THẠCH KALA",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotGemstone.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/BAOTHACHKALA.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotGemstone.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotMj.png?v=20231014",
    icon: matchuoc,
    sub_game_code: "slotMj",
    game_name: "ĐƯỜNG MẠT CHƯỢC",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotMj.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/DUONGMATCHUOC.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotMj.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotVigorous.png?v=20231014",
    icon: thantai,
    sub_game_code: "slotVigorous",
    game_name: "THẦN TÀI 777",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotVigorous.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/slotVigorous.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotVigorous.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotSpringFestival.png?v=20231014",
    icon: tet,
    sub_game_code: "slotSpringFestival",
    game_name: "TẾT NGUYÊN ĐÁN",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotSpringFestival.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/slotSpringFestival.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotSpringFestival.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/cardLhd2.png?v=20231014",
    icon: longho,
    sub_game_code: "cardLhd2",
    game_name: " LONG HỔ 2",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/cardLhd2.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/cardLhd2.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/cardLhd2.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotBowl.png?v=20231014",
    icon: bowl,
    sub_game_code: "slotBowl",
    game_name: "TREASURE BOWL",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotBowl.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/slotBowl.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotBowl.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotCat.png?v=20231014",
    icon: neko,
    sub_game_code: "slotCat",
    game_name: "Neko May Mắn",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotCat.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/slotCat.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotCat.png?v=20231014",
    },
  },
  {
    // icon: "https://xoso66.me/server/static/img/thirdgame/luckywin/icon/slotPoker.png?v=20231014",
    icon: ace,
    sub_game_code: "slotPoker",
    game_name: "Siêu cấp Ace",
    extra: {
      nav_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotPoker.png?v=20231014",
      new_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/slotPoker.png?v=20231014",
      main_icon:
        "https://xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotPoker.png?v=20231014",
    },
  },
];

const Luckywin = () => {
  const { t } = useTranslation([NS["HOME"], NS["ALL"]]);
  const swiperRef = useRef<SwiperClass>();
  const { profile, isAuthenticated, auth } = useContext(AppContext);
  const handlePlayGame = () => {
    if (!isAuthenticated) {
      toast.error(t("ban_can_dang_nhap_de_thuc_hien", { ns: "all" }));
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
    <div className="w-full featured-page md:hidden">
      <SectionTitleMobile title={t("categories.luckywin", { ns: "home" })} />
      <div className="relative">
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 3,
              grid: {
                rows: 2,
              },
            },
          }}
          grid={{
            rows: 2,
            fill: "row",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          modules={[Grid, Navigation]}
        >
          {items.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div onClick={handlePlayGame} className="game-item">
                  <img src={item.icon} data-gamecode="dx" alt="" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* <div
          className="button-prev"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <div
          className="button-next"
          onClick={() => swiperRef.current?.slideNext()}
        /> */}
      </div>
    </div>
  );
};

export default Luckywin;
