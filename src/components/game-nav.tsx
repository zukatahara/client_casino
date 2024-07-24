import { AppContext } from "@/contexts/app.context";
import { Game } from "@/types/game.type";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
// import required modules
import { Grid, Navigation } from "swiper/modules";
import { useRef } from "react";
import ModalLaunchGame from "./modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface GameItemProps {
  games: Game[];
  isLucky?: boolean;
}

const GameNav = ({ games, isLucky }: GameItemProps) => {
  const { t } = useTranslation([NS["HOME"]]);
  const { isAuthenticated } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [gameSelect, setGameSelect] = useState<Game>();
  const swiperRef = useRef<SwiperClass>();
  return (
    <div className="relative w-[800px] md:w-[1000px] lg:w-[1500px]">
      <Swiper
        breakpoints={{
          300: {
            slidesPerView: 3,
            grid: {
              rows: 1,
            },
          },
          768: {
            slidesPerView: 6,
            grid: {
              rows: 1,
            },
          },
        }}
        grid={{
          rows: 1,
          fill: "row",
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={10}
        modules={[Grid, Navigation]}
        className="w-[90%] max-w-[90%]"
      >
        {!isLucky &&
          games &&
          games.map((game, index) => {
            if (
              game.type === "LC" ||
              game.type === "SL" ||
              game.type === "FH" ||
              game.type === "KY" ||
              game.type === "PK"
            ) {
              return (
                <>
                  <SwiperSlide key={index}>
                    <li className="game3">
                      <div
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast.error(
                              t("categories.ban_can_dang_nhap_de_choi")
                            );
                            return;
                          }
                          setOpen(true);
                          setGameSelect(game);
                        }}
                        className={
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative w-full"
                        }
                      >
                        {game.status === 0 && (
                          <div className="flex items-center">
                            <Wrench className="w-6 h-6 text-red-500" />
                            <span className="text-red-500 pl-4 font-semibold">
                              {t("categories.game_dang_phat_trien")}
                            </span>
                          </div>
                        )}
                        <div
                          className={cn(
                            "w-[150px] h-[150px] rounded-full border border-solid border-slate-300 block mx-auto relative",
                            game.type === "LC" ? "bg-casino" : ""
                          )}
                        >
                          <img
                            className="object-contain absolute w-full h-full top-0 left-0"
                            src={`${game.images_pc}`}
                            alt=""
                          />
                        </div>

                        {game.type === "PK" && (
                          <img
                            src={game.icon2}
                            className="absolute top-16 left-0 z-50 w-16"
                            alt=""
                          />
                        )}

                        <div className="border border-solid border-slate-400 dark:border-slate-700 rounded-3xl p-2 text-slate-700 uppercase text-center flex flex-col justify-center items-center text-sm">
                          {game.type === "LC" && (
                            <img className="w-36" src={game.icon1} alt="" />
                          )}
                          {game.type === "SL" && (
                            <img className="w-20" src={game.icon1} alt="" />
                          )}
                          {/* <span className="text-lg">{game.title}</span> */}
                          <p className="capitalize dark:text-white">
                            {t("categories.phi_hoan_toi_da")} {game.percent}%
                          </p>
                        </div>
                        {game.status !== 0 && (
                          <div className="btnGame">
                            <Button className="dark:text-white">
                              {t("categories.vao_tro_choi")}
                            </Button>
                          </div>
                        )}
                      </div>
                    </li>
                  </SwiperSlide>
                </>
              );
            } else {
              return (
                <SwiperSlide key={index}>
                  <li className="game3 w-full">
                    <div
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error(
                            t("categories.ban_can_dang_nhap_de_choi")
                          );
                          return;
                        }
                        setOpen(true);
                        setGameSelect(game);
                      }}
                      className={
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative w-full h-96"
                      }
                    >
                      {game.status === 0 && (
                        <div className="flex items-center">
                          <Wrench className="w-6 h-6 text-red-500" />
                          <span className="text-red-500 pl-4 font-semibold">
                            {t("categories.game_dang_phat_trien")}
                          </span>
                        </div>
                      )}
                      {game.type === "SB" && (
                        <img
                          src={game.icon2}
                          className="absolute top-16 left-0 z-50 w-16"
                          alt=""
                        />
                      )}
                      {game.type === "CB" && (
                        <img
                          src={game.icon2}
                          className="absolute top-16 left-0 z-50 w-16"
                          alt=""
                        />
                      )}
                      <img
                        className="w-full h-4/5 object-contain absolute top-0 left-0"
                        src={`${game.images_pc}`}
                        alt=""
                      />
                      <div className="w-full border-solid border border-slate-400 dark:border-slate-700 rounded-md p-2 text-slate-500 dark:text-slate-200 text-center absolute bottom-[10px] left-0">
                        <p className="text-lg">{game.title}</p>
                        <p>
                          {" "}
                          {t("categories.phi_hoan_toi_da")} {game.percent}%
                        </p>
                      </div>

                      {game.status !== 0 && (
                        <div className="btnGame">
                          <Button>{t("categories.vao_tro_choi")}</Button>
                        </div>
                      )}
                    </div>
                  </li>
                </SwiperSlide>
              );
            }
          })}
      </Swiper>
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <div
        className="button-prev2"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft className="w-10 h-10 text-main cursor-pointer" />
      </div>
      <div
        className="button-next2"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight className="w-10 h-10 text-main cursor-pointer" />
      </div>
    </div>
  );
};

export default GameNav;
