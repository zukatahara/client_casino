// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// import required modules
import { EffectCards, Navigation, Pagination } from "swiper/modules";

export default function Slider() {
  return (
    <div className="h-[300px] flex justify-center items-center">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectCards, Navigation, Pagination]}
        className="vipSwiper w-1/2 max-w-[630px] !h-4/6 relative"
      >
        {Array.from(Array(11).keys())?.map((item) => (
          <SwiperSlide className="slider-vip flex !h-full">
            <div className="w-4/6 flex">
              <img src={`/vip/vip${item}.png`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
