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

export default function SliderMobile({ setTabActive }: any) {
  return (
    <div className="h-auto flex justify-center items-center py-8 w-full overflow-hidden">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        pagination={true}
        onSlideChange={(e) => setTabActive(e.activeIndex)}
        navigation={true}
        modules={[EffectCards, Navigation, Pagination]}
        className="vipSwiperMobile w-full h-auto relative"
      >
        {Array.from(Array(11).keys())?.map((item) => (
          <SwiperSlide className="slider-vip h-auto flex">
            <div className="w-4/6 flex">
              <img src={`/vip/vip${item}.png`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
