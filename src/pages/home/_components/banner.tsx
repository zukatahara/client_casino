import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
// import { Icons } from "@/components/icons";
import NavRouterMobile from "./nav-routers-mobile";
import Marquee from "react-fast-marquee";
import BannerMobile from "./banner-mobile";
import { useNavigate } from "react-router-dom";
import { URL } from "@/constants/url";

import { languages } from "@/i18n";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const Banner = () => {
  const { t, i18n } = useTranslation([NS["ALL"]]);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay()]
  );
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  // const { data } = useQuery({
  //   queryKey: ["banners"],
  //   queryFn: () => homeApi.getBannersMobile(),
  // });

  // const banners = data?.data;
  // if (!banners?.status) return null;

  // const { data: res } = useQuery({
  //   queryKey: ["notice"],
  //   queryFn: () => homeApi.getNoticeMobile(),
  // });
  // const notice = res?.data?.data
  const useBanners = () => {
    return useQuery({
      queryKey: ["banners"],
      queryFn: () =>
        homeApi.getBannersMobile({ language: currentLanguage?.code }),
    });
  };
  const useNotice = () => {
    return useQuery({
      queryKey: ["notice"],
      queryFn: () => homeApi.getNoticeMobile(),
    });
  };
  const bannersQuery = useBanners();
  const noticeQuery = useNotice();

  const navigate = useNavigate();

  const banners = bannersQuery.data?.data;
  const notice = noticeQuery.data?.data?.data;
  if (!banners?.status) return null;

  return (
    <>
      <div className="hidden md:block mt-12">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container h-auto">
            {banners &&
              banners.data &&
              banners.data.length > 0 &&
              banners.data.map((banner, index) => (
                <div
                  onClick={() => navigate("/discount")}
                  className="embla__slide"
                  key={index}
                >
                  <img
                    className="w-full h-full"
                    src={`${URL.baseUrl}${banner.link}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <BannerMobile />
      <div className="md:hidden w-full h-8 p-1">
        <div className="w-full h-full flex justify-between items-center">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAmCAMAAACIwYlVAAAAVFBMVEUAAADpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6Tpz6RR9geCAAAAG3RSTlMAkEnlQQwE9dbr38i+VTrSppeGdWpjJh4xFbgQ906/AAAA0klEQVQ4y83Uyw6DIBCF4REEtF5rvbXn/d+zkllgEJNJm5r+S/IlDLOArq+t6qfUjgAGob1j6y6ipoYvE42rIcYTEOO1MWmbIcZLDxQ2Ne4LETaDw1YbiOLy5oYI53ziwtJ3JMK2hK9aw+U4x9jSkyUJpodzgyGSYTJMBZj7DVYaPq0kWIPTH+Pvx+D+YXWNvo1WiksAhdrj6hwX8NUzhdqcmw54ruHrKNFcHB6o/FFJqWwfY7KjLhtK9whYkHIyzC2dEHO98GMMg2ckLe+qhS7rDXs0O95jpxcUAAAAAElFTkSuQmCC"
            alt=""
            className="w-[25px] h-[22px]"
          />
          <div className="flex-1 overflow-hidden ml-4">
            <Marquee className="leading-7 text-[#e9cfa4]">
              <span className="mx-10">
                {notice?.[currentLanguage?.code as "en-EN"] ||
                  t("xin_chao_tat_ca_hoi_vien_than_men", { ns: "all" })}
              </span>
            </Marquee>
          </div>
        </div>
      </div>
      <NavRouterMobile />
    </>
  );
};

export default Banner;
