import SectionTitle from "../section-title";

// Import Swiper styles
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

// import required modules
import { Grid, Navigation } from "swiper/modules";
// import FeaturedGamesItem from "./featured-games-item";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import { useContext, useRef, useState } from "react";
import { Game } from "@/types/game.type";
import { AppContext } from "@/contexts/app.context";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

// const items = [
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/dx.png?v=20231006",
//     sub_game_code: "dx",
//     game_name: "TÀI XỈU",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/dx.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TAIXIU.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/dx.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/dx3Min.png?v=20231006",
//     sub_game_code: "dx3Min",
//     game_name: "TÀI XỈU 3 Phút",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bigSmallMD3.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TAIXIU3MIN.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/bigSmallMD3.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/bigSmallMD5.png?v=20231006",
//     sub_game_code: "bigSmallMD5",
//     game_name: "TÀI XỈU MD5",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bigSmallMD5.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TAIXIUMD5.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/bigSmallMD5.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotCs.png?v=20231006",
//     sub_game_code: "slotCs",
//     game_name: "THẦN TÀI",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotCs.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/THANTAI.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotCs.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/sd.png?v=20231006",
//     sub_game_code: "sd",
//     game_name: "XÓC ĐĨA",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/sd.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/XOCDIA.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/sd.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotLs.png?v=20231006",
//     sub_game_code: "slotLs",
//     game_name: "LONG THẦN",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotLs.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/LONGTHAN.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotLs.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/dice.png?v=20231006",
//     sub_game_code: "dice",
//     game_name: "SICBO",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/dice.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/SICBO.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/dice.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/f35.png?v=20231006",
//     sub_game_code: "f35",
//     game_name: "F35",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/f35.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/F35.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/f35.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/yxx.png?v=20231006",
//     sub_game_code: "yxx",
//     game_name: "BẤU CUA",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/yxx.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/BAUCUA.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/yxx.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotFruit.png?v=20231006",
//     sub_game_code: "slotFruit",
//     game_name: "XÈNG HOA QUẢ",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotFruit.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/XENGHOAQUA.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotFruit.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/roshambo.png?v=20231006",
//     sub_game_code: "roshambo",
//     game_name: "OẲN TÙ TỲ",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/roshambo.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/OANTUTI.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/roshambo.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/fish.png?v=20231006",
//     sub_game_code: "fish",
//     game_name: "BẮN CÁ",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/fish.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/BANCA.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/fish.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/guessBigSmall.png?v=20231006",
//     sub_game_code: "guessBigSmall",
//     game_name: "TRÊN DƯỚI",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/guessBigSmall.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TRENDUOI.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/guessBigSmall.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/mini_poker.png?v=20231006",
//     sub_game_code: "mini_poker",
//     game_name: "MINI-POKER",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/mini_poker.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/MINIPOKER.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/mini_poker.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotXy.png?v=20231006",
//     sub_game_code: "slotXy",
//     game_name: "TÂY DU KÝ",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotXy.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/TAYDUKY.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotXy.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/bjl.png?v=20231006",
//     sub_game_code: "bjl",
//     game_name: "BACCARAT",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/bjl.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/BACCARAT.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/bjl.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/cardPhom.png?v=20231006",
//     sub_game_code: "cardPhom",
//     game_name: "PHOM",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/cardPhom.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/PHOM.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/cardPhom.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotGemstone.png?v=20231006",
//     sub_game_code: "slotGemstone",
//     game_name: "BẢO THẠCH KALA",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotGemstone.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/BAOTHACHKALA.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotGemstone.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotMj.png?v=20231006",
//     sub_game_code: "slotMj",
//     game_name: "ĐƯỜNG MẠT CHƯỢC",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotMj.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/DUONGMATCHUOC.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotMj.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotVigorous.png?v=20231006",
//     sub_game_code: "slotVigorous",
//     game_name: "THẦN TÀI 777",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotVigorous.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/slotVigorous.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotVigorous.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotSpringFestival.png?v=20231006",
//     sub_game_code: "slotSpringFestival",
//     game_name: "TẾT NGUYÊN ĐÁN",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotSpringFestival.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/slotSpringFestival.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotSpringFestival.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/cardLhd2.png?v=20231006",
//     sub_game_code: "cardLhd2",
//     game_name: " LONG HỔ 2",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/cardLhd2.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/cardLhd2.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/cardLhd2.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotBowl.png?v=20231006",
//     sub_game_code: "slotBowl",
//     game_name: "TREASURE BOWL",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotBowl.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/slotBowl.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotBowl.png?v=20231006",
//     },
//   },
//   {
//     icon: "https://www.xoso66.me/server/static/img/thirdgame/luckywin/icon/slotCat.png?v=20231006",
//     sub_game_code: "slotCat",
//     game_name: "Neko May Mắn",
//     extra: {
//       nav_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/nav_icon/slotCat.png?v=20231006",
//       new_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/slotCat.png?v=20231006",
//       main_icon:
//         "https://www.xoso66.me/server/static/img/thirdgame/luckywin/main_icon/slotCat.png?v=20231006",
//     },
//   },
// ];

const FeaturedGames = () => {
  const { t } = useTranslation([NS["HOME"]]);
  // const swiperRef = useRef<SwiperClass>();
  const { theme } = useTheme();
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
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data?.data?.data || [];
  const getGamesByType = (type: string) => {
    if (games && games.length > 0) {
      return games.filter((game) => game.type === type);
    }
    return [];
  };
  const swiperRef = useRef<SwiperClass>();
  return (
    <div className="container md:max-w-7xl mx-auto mt-5 box-border overflow-hidden hidden md:block">
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <SectionTitle title={t("categories.no_hu")} />
      <div className="relative">
        <Swiper
          slidesPerView={2}
          breakpoints={{
            300: {
              slidesPerView: 1,
              grid: {
                rows: 1,
              },
            },
            768: {
              slidesPerView: 2,
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
          {getGamesByType("SL").map((game, index) => {
            return (
              <SwiperSlide key={index}>
                <li
                  onClick={() => handleLaunchGame(game)}
                  key={index}
                  // className="third-game-slot list-none "
                  className={`third-game-slot list-none ${
                    theme == "light" ? "slot" : "slot-dark"
                  }`}
                >
                  <div className="img_games_2">
                    <div className="actionDom" />
                    <img src={game.images_pc} className="subImg jili" />
                    <div className="name">
                      <p className="nametext">{game.title}</p>
                      <p className="namesub">
                        {t("categories.nhung_dieu_bat_ngo_thu_vi")}
                      </p>
                    </div>
                    <div
                      className={`circleLogo  ${
                        theme == "dark" && "circleLogo-dark"
                      }`}
                    >
                      <img src={game.icon1} />
                    </div>
                    <div
                      className="playButton dark:text-white  "
                      style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "10px",
                      }}
                    >
                      {" "}
                      {t("categories.vao_tro_choi")}{" "}
                    </div>
                  </div>
                </li>
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

export default FeaturedGames;
