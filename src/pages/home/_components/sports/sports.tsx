import { useContext, useRef, useState } from "react";
import SectionTitle from "../section-title";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import SportItem from "./sport-item";
import { Game } from "@/types/game.type";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface GameItemProps {
  games: Game[];
}

const Sports = ({ games }: GameItemProps) => {
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
      <SectionTitle title={t("categories.the_thao")} />
      <div className="relative">
        <Swiper
          slidesPerView={3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={15}
          modules={[Navigation]}
        >
          {games.map((item, index) => {
            return (
              <SwiperSlide key={index} onClick={() => handleLaunchGame(item)}>
                <SportItem game={item} />
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

export default Sports;
