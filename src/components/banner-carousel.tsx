import { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { useQuery } from "@tanstack/react-query";
// import homeApi from "@/apis/home.api";
// import { languages } from "@/i18n";
// import { useTranslation } from "react-i18next";
// import { URL } from "@/constants/url";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BannerCarousel = () => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperClass>();

  // Commented out API fetch - using local assets instead
  // const { i18n } = useTranslation();
  // const currentLanguage = languages.find((l) => l.code === i18n.language);
  // const { data } = useQuery({
  //   queryKey: ["banners", currentLanguage?.code],
  //   queryFn: () =>
  //     homeApi.getBannersMobile({ language: currentLanguage?.code }),
  // });
  // const banners = data?.data?.data;
  // if (!banners || !banners.length) return null;

  // Using local banner images from target folders
  const banners = [
    {
      src: "/assets/images/feature_banner.804a846f.png",
      alt: "Feature Banner",
      link: "/discount",
    },
    {
      src: "/assets/images/live_banner.dc8a47f2.png",
      alt: "Live Casino Banner",
      link: "/discount",
    },
    {
      src: "/assets/images/fish_banner.4a050c9d.png",
      alt: "Fish Shooting Banner",
      link: "/discount",
    },
    {
      src: "/assets/images/slot_hot_banner.5bb55a2a.png",
      alt: "Slot Hot Banner",
      link: "/discount",
    },
  ];

  return (
    <div className="swiper-container-wrapper w-full hidden md:block relative" style={{ minWidth: '100%', flexShrink: 0 }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={false}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        className="banner-swiper"
        style={{ width: '100%', minWidth: '100%', flexShrink: 0 }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Force update to prevent width shrinking
          setTimeout(() => {
            swiper.update();
            swiper.updateSize();
          }, 100);
        }}
      >
        {banners.map((banner, index: number) => (
          <SwiperSlide key={index} style={{ width: '100%', minWidth: '100%', flexShrink: 0 }}>
            <div
              className="relative w-full cursor-pointer"
              style={{ width: '100%', minWidth: '100%' }}
              onClick={() => navigate(banner.link)}
            >
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-auto object-cover"
                style={{ width: '100%', minWidth: '100%', display: 'block' }}
                loading="eager"
                onLoad={() => {
                  // Force swiper to recalculate after image loads
                  if (swiperRef.current) {
                    swiperRef.current.update();
                    swiperRef.current.updateSize();
                  }
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/images/img_bg.46e55575.png";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Navigation buttons - hidden on mobile, visible on desktop */}
      <div
        className="button-prev-banner absolute z-10 cursor-pointer hidden md:flex"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white" />
      </div>
      <div
        className="button-next-banner absolute z-10 cursor-pointer hidden md:flex"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
      </div>
    </div>
  );
};

export default BannerCarousel;
