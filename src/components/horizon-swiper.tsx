import { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Game } from "@/types/game.type";
import { useContext } from "react";
import { AppContext } from "@/contexts/app.context";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import ModalLaunchGame from "./modal-launch-game";
import { useState } from "react";

interface HorizonSwiperProps {
  listData: Game[];
  slideType: "live" | "sports" | "chess";
}

const HorizonSwiper = ({ listData, slideType }: HorizonSwiperProps) => {
  const { t } = useTranslation([NS["HOME"]]);
  const { isAuthenticated } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [gameSelect, setGameSelect] = useState<Game>();
  const swiperRef = useRef<SwiperClass>();

  const handleGameClick = (game: Game) => {
    if (!isAuthenticated) {
      toast.error(t("categories.ban_can_dang_nhap_de_choi", { ns: "home" }));
      return;
    }
    setOpen(true);
    setGameSelect(game);
  };

  // For live games, group by 2 per slide
  const liveListData = slideType === "live" && listData.length > 0
    ? (() => {
        const grouped: Game[][] = [];
        for (let i = 0; i < listData.length; i += 2) {
          const pair: Game[] = [listData[i]];
          if (listData[i + 1]) pair.push(listData[i + 1]);
          grouped.push(pair);
        }
        return grouped;
      })()
    : null;

  const slidesPerView = slideType === "live" ? 2 : 3;

  return (
    <>
      <div className="swiperContainer" style={{ width: '1440px', maxWidth: '100%', margin: '0 auto' }}>
        <Swiper
          className={`swiperContent ${slideType}`}
          modules={[Navigation]}
          slidesPerView={slidesPerView}
          spaceBetween={24}
          navigation={{
            nextEl: `#${slideType}-swiper-button-next`,
            prevEl: `#${slideType}-swiper-button-prev`,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {slideType === "live" && liveListData
            ? liveListData.map((pair, idx) => (
                <SwiperSlide key={idx}>
                  <div className="slideItem" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pair.map((game, gameIdx) => (
                      <div
                        key={gameIdx}
                        className="third-game-live cursor-pointer"
                        onClick={() => handleGameClick(game)}
                      >
                        <div className="liveItem">
                          <div className="imgs">
                            <img
                              src={game.images_pc || "/assets/images/img_bg.46e55575.png"}
                              alt={game.title}
                              className="croupier"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/assets/images/img_bg.46e55575.png";
                              }}
                            />
                            {game.icon1 && (
                              <img
                                src={game.icon1 || "/assets/images/img_bg.46e55575.png"}
                                alt=""
                                className="foreground"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/assets/images/img_bg.46e55575.png";
                                }}
                              />
                            )}
                          </div>
                          <div className="playInfo">
                            {game.icon2 && (
                              <img
                                src={game.icon2 || "/assets/games/thirdgame/imgs/platform_logo/long/bbin.png"}
                                alt={game.providercode}
                                className="platLogo"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/assets/games/thirdgame/imgs/platform_logo/long/bbin.png";
                                }}
                              />
                            )}
                            <p className="playCode">{game.title}</p>
                            <div className="playRebateWp">
                              <span className="playRebate dark:text-white">
                                {t("categories.phi_hoan_toi_da")} {game.percent}%
                              </span>
                            </div>
                            <div className="playButton dark:text-white">
                              {t("categories.vao_tro_choi")}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))
            : listData.map((game, idx) => (
                <SwiperSlide key={idx}>
                  <div className="slideItem">
                    {slideType === "sports" ? (
                      <div
                        className="sportsItem cursor-pointer"
                        onClick={() => handleGameClick(game)}
                      >
                        <div className="bg">
                          <img
                            src={game.images_pc || "/assets/images/img_bg.46e55575.png"}
                            alt={game.title}
                            className="athlete"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/assets/images/img_bg.46e55575.png";
                            }}
                          />
                          <div className="playInfo sports">
                            {game.icon2 && (
                              <div className="platLogo">
                                <img
                                  src={game.icon2 || "/assets/games/thirdgame/imgs/platform_logo/long/bbin.png"}
                                  alt={game.providercode}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/assets/games/thirdgame/imgs/platform_logo/long/bbin.png";
                                  }}
                                />
                              </div>
                            )}
                            <div className="playCode">
                              <span className="playRebate">
                                {game.percent ? `${t("categories.phi_hoan_toi_da")} ${game.percent}%` : t("categories.phi_hoan_toi_da")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="platName">
                          <p className="playCode name">{game.title}</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="third-game-live cursor-pointer"
                        onClick={() => handleGameClick(game)}
                      >
                        <div className="liveItem">
                          <div className="imgs">
                            <img
                              src={game.images_pc || "/assets/images/img_bg.46e55575.png"}
                              alt={game.title}
                              className="croupier"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/assets/images/img_bg.46e55575.png";
                              }}
                            />
                            {game.icon1 && (
                              <img
                                src={game.icon1 || "/assets/images/img_bg.46e55575.png"}
                                alt=""
                                className="foreground"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/assets/images/img_bg.46e55575.png";
                                }}
                              />
                            )}
                          </div>
                          <div className="playInfo">
                            {game.icon2 && (
                              <img
                                src={game.icon2 || "/assets/games/thirdgame/imgs/platform_logo/long/bbin.png"}
                                alt={game.providercode}
                                className="platLogo"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/assets/games/thirdgame/imgs/platform_logo/long/bbin.png";
                                }}
                              />
                            )}
                            <p className="playCode">{game.title}</p>
                            <div className="playRebateWp">
                              <span className="playRebate dark:text-white">
                                {t("categories.phi_hoan_toi_da")} {game.percent}%
                              </span>
                            </div>
                            <div className="playButton dark:text-white">
                              {t("categories.vao_tro_choi")}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
        <div
          id={`${slideType}-swiper-button-prev`}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          style={{ width: '48px', height: '48px', background: 'rgba(0,0,0,0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => (swiperRef.current as any)?.current?.slidePrev()}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </div>
        <div
          id={`${slideType}-swiper-button-next`}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          style={{ width: '48px', height: '48px', background: 'rgba(0,0,0,0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </div>
      </div>
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
    </>
  );
};

export default HorizonSwiper;
