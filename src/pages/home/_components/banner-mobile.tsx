import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { useNavigate } from "react-router-dom";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n";

const BannerMobile = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay()]
  );
  const { i18n } = useTranslation();
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  const navigate = useNavigate();

  const { data: dataMobile } = useQuery({
    queryKey: ["banners-mobile"],
    queryFn: () => homeApi.getBannersMobile({ language: currentLanguage?.code }),
  });

  const bannersMobile = dataMobile?.data;
  if (!bannersMobile?.status) return null;

  return (
    <>
      <div className="md:hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container md:h-[401px]">
            {bannersMobile &&
              bannersMobile.data.length > 0 &&
              bannersMobile.data.map((banner, index) => (
                <div
                  onClick={() => navigate("/mobile/discount")}
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
      {/* <NavRouterMobile /> */}
    </>
  );
};

export default BannerMobile;
