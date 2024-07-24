import { NS } from "@/constants/ns";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const NavRouterMobile = () => {
  const pathname = useLocation().pathname;
  const { t, i18n } = useTranslation([NS["ALL"]]);
  const newBanner =
    i18n.language === "vi-VN" ? "/game-list-bg.png" : "/th-images/navbar.png";
  const routes = [
    {
      title: "Đặc sắc",
      icon: (
        <span
          data-v-0f2affae
          className="iconActive icon-home_nav_icon_rec_nor icon-sprite"
          style={{
            // backgroundImage:`url("/game-list-bg.png")`
            backgroundImage: `url(${newBanner})`,
          }}
        />
      ),
      iconActive: (
        <span
          data-v-0f2affae
          className="iconActive icon-home_nav_icon_rec_sel icon-sprite"
          style={{
            // backgroundImage:`url("/game-list-bg.png")`
            backgroundImage: `url(${newBanner})`,
          }}
        />
      ),
      link: "/",
    },
    {
      title: "Live Casino",
      icon: (
        <span
          className="iconActive icon-home_nav_icon_live_nor icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      iconActive: (
        <span
          className="iconActive icon-home_nav_icon_live_sel icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      type: "LC",
      isHot: true,
      link: "/mobile/game-list/LC",
    },
    {
      title: "Thể thao",
      icon: (
        <span
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
          className="iconActive icon-home_nav_icon_sports_nor icon-sprite"
        ></span>
      ),
      iconActive: (
        <span
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
          className="iconActive icon-home_nav_icon_sports_sel icon-sprite"
        ></span>
      ),
      type: "SB",
      isHot: true,
      link: "/mobile/game-list/SB",
    },
    {
      title: "Nổ hũ",
      icon: (
        <span
          className="iconActive icon-home_nav_icon_slot_nor icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      iconActive: (
        <span
          className="iconActive icon-home_nav_icon_slot_sel icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      type: "SL",
      isHot: false,
      isHiddenMenu: true,
      link: "/mobile/game-list/SL",
    },
    {
      title: "Xổ số",
      icon: (
        <span
          data-v-0f2affae
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
          className="iconActive icon-home_nav_icon_lottery_nor icon-sprite"
        />
      ),
      iconActive: (
        <span
          data-v-0f2affae
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
          className="iconActive icon-home_nav_icon_lottery_sel icon-sprite"
        />
      ),
      link: "/mobile/xo-so-list",
    },
   
    // {
    //   title: "Lottery",
    //   icon: (
    //     <span className="iconActive icon-home_nav_icon_feature_nor icon-sprite"></span>
    //   ),
    //   iconActive: (
    //     <span className="iconActive icon-home_nav_icon_feature_sel icon-sprite"></span>
    //   ),
    //   type: "LK",
    //   isHot: true,
    //   link: "/mobile/game-list/LK",
    // },

    {
      title: "Đá gà",
      icon: (
        <span
          className="iconActive icon-home_nav_icon_cockfighting_nor icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      iconActive: (
        <span
          className="iconActive icon-home_nav_icon_cockfighting_sel icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      type: "DM",
      isHot: false,
      isHiddenMenu: true,
      link: "/mobile/game-list/DM",
    },
    {
      title: "Bắn cá",
      icon: (
        <span
          className="iconActive icon-home_nav_icon_fish_nor icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      iconActive: (
        <span
          className="iconActive icon-home_nav_icon_fish_sel icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      type: "FH",
      isHot: false,
      isHiddenMenu: true,
      link: "/mobile/game-list/FH",
    },
    {
      title: "Game bài",
      icon: (
        <span
          className="iconActive icon-home_nav_icon_chess_nor icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      iconActive: (
        <span
          className="iconActive icon-home_nav_icon_chess_sel icon-sprite"
          style={{
            backgroundImage: `url(${newBanner})`,
          }}
        ></span>
      ),
      type: "CB",
      isHot: false,
      link: "/mobile/game-list/CB",
    },
    {
      title: "Game khác",
      icon: (
        <img className="nav-m-icon" src="/icon/icon_game_otther.png" alt="" />
      ),
      iconActive: (
        <img className="nav-m-icon" src="/icon/icon_got_active.png" alt="" />
      ),
      type: "OT",
      isHot: false,
      link: "/mobile/game-list/OT",
    },
  ];
  return (
    <div className="md:hidden w-full h-20 bg-[#1b233d] flex items-center overflow-x-scroll">
      {routes.map((route, index) => (
        <Link to={route.link || "/"}>
          <div
            key={index}
            className="w-[68px] flex flex-col justify-center items-center text-center text-[#90a2dc] relative"
          >
            <div className="w-[68px] flex flex-col justify-center items-center text-center relative game-main">
              {route.isHot && (
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  className="hotLabel"
                />
              )}
              {pathname === route.link ? route.iconActive : route.icon}
              {route.type === "OT" && (
                <p
                  className={cn(
                    "text-[10px]",
                    pathname === route.link ? "text-slate-200" : ""
                  )}
                >
                  {t("game_khac", { ns: "all" })}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavRouterMobile;
