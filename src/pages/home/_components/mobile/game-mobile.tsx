import SectionTitleMobile from "./section-title-mobile";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useContext, useRef, useState } from "react";
import { Game } from "@/types/game.type";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { AppContext } from "@/contexts/app.context";
import ModalLaunchGame from "@/components/modal-launch-game";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface GameMobileProps {
  className?: string;
  title: string;
  games: Game[];
}

const GameMobile = ({ className, title, games }: GameMobileProps) => {
  const { t } = useTranslation(NS["HOME"]);
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
    <div className={cn("w-full md:hidden game2", className)}>
      <ModalLaunchGame open={open} setOpen={setOpen} gameSelect={gameSelect} />
      <SectionTitleMobile title={title} />
      <div className="relative swiper-container">
        <Swiper
          slidesPerView={2.3}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
        >
          {games &&
            games.length > 0 &&
            games.map((game, index) => (
              <SwiperSlide onClick={() => handleLaunchGame(game)} key={index}>
                <div
                  style={{
                    background: "none",
                    boxShadow: "none",
                  }}
                  className="scroll-item"
                >
                  <img src={game.logo} />
                  <p className="dark:text-white">
                    {t("categories.phi_hoan_toi_da")} {game.percent}%{" "}
                  </p>
                  {game.type === "SL" && (
                    <span className="plat_name dark:text-white">
                      {game.title}
                    </span>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GameMobile;
