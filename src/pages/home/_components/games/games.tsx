import SectionTitle from "../section-title";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import GameItem from "./game-item";
import { useRef } from "react";
import { Game } from "@/types/game.type";

interface GameItemProps {
  title: string;
  games: Game[];
}

const Games = ({ title, games }: GameItemProps) => {
  const swiperRef = useRef<SwiperClass>();
  return (
    <div className="container md:max-w-7xl mx-auto mt-5 box-border overflow-hidden">
      <SectionTitle title={title} />
      <div className="relative">
        <Swiper
          slidesPerView={3}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          modules={[Navigation]}
        >
          {games &&
            games.length > 0 &&
            games.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <GameItem
                    title={item.title}
                    imageUrl={`${item.images_pc}`}
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

export default Games;
