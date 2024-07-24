import { useContext, useRef, useState } from "react";
import SectionTitle from "../section-title";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

// import required modules
import { Grid, Navigation } from "swiper/modules";
import CasinoItem from "./casino-item";
import { Game } from "@/types/game.type";
import ModalLaunchGame from "@/components/modal-launch-game";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface GameItemProps {
  games: Game[];
}

const Casino = ({ games }: GameItemProps) => {
  const { t } = useTranslation([NS["HOME"]]);
  const swiperRef = useRef<SwiperClass>();
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
    <div className="container md:max-w-7xl mx-auto mt-5 box-border overflow-hidden hidden md:block">
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <SectionTitle title={t("categories.casino_truc_tuyen")} />

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
          {games.map((item, index) => {
            return (
              <SwiperSlide key={index} onClick={() => handleLaunchGame(item)}>
                <CasinoItem
                  croupierUrl={item.images_pc}
                  foregroundUrl={""}
                  platformLogoUrl={item.icon2}
                  playCode={item.title}
                  playRebate={`${item.percent}`}
                  game={item}
                />
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

export default Casino;
