import { gameApi } from "@/apis/game.api";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { Link, useLocation, useNavigate } from "react-router-dom";
import GameNav from "./game-nav";
import React, { useEffect, useState } from "react";
import { Icons } from "./icons";
import thethaoIcon from "../assets/icons/GIF THỂ THAO.gif";
// import { useToast } from "@/hooks/use-toast";
import toast from "react-hot-toast";
// import { getDateList } from "@/utils/utils";
import ReactSelect from "react-select";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import useDateList from "@/hooks/useDateList";
const getListAvailable = () => {
  const config = Config();
  const lottery = Object.keys(config.listLottery).map(
    (key) => `/lottery/xo-so/${key}`
  );
  const sicbo = Object.keys(config.listSicbo).map(
    (key) => `/lottery/tai-xiu/${key}`
  );
  const mega = Object.keys(config.listMega).map(
    (key) => `/lottery/mega/${key}`
  );
  const keno = Object.keys(config.listKeno).map(
    (key) => `/lottery/keno/${key}`
  );

  return lottery.concat([...sicbo, ...mega, ...keno]);
};

const NavRouters = () => {
  const { t, i18n } = useTranslation([NS["HOME"], NS["ALL"]]);
  const dateList = useDateList();
  const gameAvailable = getListAvailable();
  const d = new Date().getDay();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [dateXsmn, setDateXsmn] = useState(
    dateList.find((e) => e.value === new Date().getDay())
  );
  const [dateXsmt, setDateXsmt] = useState(
    dateList.find((e) => e.value === new Date().getDay())
  );
  useEffect(() => {
    setDateXsmn(dateList.find((e) => e.value === new Date().getDay()));
    setDateXsmt(dateList.find((e) => e.value === new Date().getDay()));
  }, [i18n.language]);
  const components: any = [
    {
      menu_id: 2,
      menu_name: t("submenuXoso.mien_bac", { ns: "home" }),
      list: [
        {
          id: 32,
          name: t("submenuXoso.mien_bac", { ns: "home" }),
          code: "/lottery/xo-so/xsmb",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isHot: true,
          isNew: false,
        },
        {
          id: 45,
          name: t("submenuXoso.m_bac_svip_5_phut", { ns: "home" }),
          code: "/lottery/xo-so/300",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isHot: true,
          isNew: false,
        },
        // {
        //   id: 63,
        //   name: "Xổ số Miền Bắc",
        //   code: "mb",
        //   series_id: 8,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   isNew: true,
        // },
        {
          id: 46,
          name: t("submenuXoso.m_bac_svip_3_phut", { ns: "home" }),
          code: "/lottery/xo-so/180",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isHot: true,
          isNew: false,
        },
        {
          id: 49,
          name: t("submenuXoso.mien_bac_vip_2_phut", { ns: "home" }),
          code: "/lottery/xo-so/120",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isNew: false,
        },
        {
          id: 48,
          name: t("submenuXoso.mien_bac_vip_75_giay", { ns: "home" }),
          code: "/lottery/xo-so/75",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isNew: false,
        },
        {
          id: 47,
          name: t("submenuXoso.mien_bac_vip_45_giay", { ns: "home" }),
          code: "/lottery/xo-so/45",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isHot: true,
          isNew: false,
        },
      ],
    },
    {
      menu_id: 9,
      menu_name: t("submenuXoso.sicbo", { ns: "home" }),
      list: [
        {
          id: 66,
          name: t("submenuXoso.sicbo_1_phut", { ns: "home" }),
          code: "/lottery/tai-xiu/60",
          series_id: 9,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isNew: true,
          isHot: false,
        },
        {
          id: 67,
          name: t("submenuXoso.sicbo_2_phut", { ns: "home" }),
          code: "/lottery/tai-xiu/120",
          series_id: 9,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isNew: true,
        },
        {
          id: 68,
          name: t("submenuXoso.sicbo_3_phut", { ns: "home" }),
          code: "/lottery/tai-xiu/180",
          series_id: 9,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isNew: true,
        },
        {
          id: 69,
          name: t("submenuXoso.sicbo_5_phut", { ns: "home" }),
          code: "/lottery/tai-xiu/300",
          series_id: 9,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          isNew: true,
        },
        // {
        //   id: 70,
        //   name: "Sicbo 1 phút",
        //   code: "/lottery/tai-xiu/60",
        //   series_id: 9,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   isNew: true,
        // },
        // {
        //   id: 71,
        //   name: "Sicbo 1.5 phút",
        //   code: "/lottery/tai-xiu/90",
        //   series_id: 9,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   isNew: true,
        // },
      ],
    },
    {
      menu_id: 1,
      menu_name: t("submenuXoso.mien_nam", { ns: "home" }),
      isFilter: true,
      list: [
        {
          id: 1,
          name: t("submenuXoso.bac_lieu", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsbl",
          series_id: 1,
          week_days: [2],
        },
        {
          id: 2,
          name: t("submenuXoso.vung_tau", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsvt",
          series_id: 1,
          week_days: [2],
        },
        {
          id: 3,
          name: t("submenuXoso.tien_giang", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xstg",
          series_id: 1,
          week_days: [0],
        },
        {
          id: 4,
          name: t("submenuXoso.kien_giang", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xskg",
          series_id: 1,
          week_days: [0],
        },
        {
          id: 5,
          name: t("submenuXoso.da_lat", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsld-xsdl",
          series_id: 1,
          week_days: [0],
        },
        {
          id: 6,
          name: t("submenuXoso.binh_phuoc", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsbp",
          series_id: 1,
          week_days: [6],
        },
        {
          id: 7,
          name: t("submenuXoso.binh_duong", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsbd",
          series_id: 1,
          week_days: [5],
        },
        {
          id: 8,
          name: t("submenuXoso.an_giang", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsag",
          series_id: 1,
          week_days: [4],
        },
        {
          id: 9,
          name: t("submenuXoso.binh_thuan", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsbth",
          series_id: 1,
          week_days: [4],
        },
        {
          id: 11,
          name: t("submenuXoso.can_tho", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsct",
          series_id: 1,
          week_days: [3],
        },
        {
          id: 12,
          name: t("submenuXoso.hau_giang", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xshg",
          series_id: 1,
          week_days: [6],
        },
        {
          id: 14,
          name: t("submenuXoso.tay_ninh", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xstn",
          series_id: 1,
          week_days: [4],
        },
        {
          id: 15,
          name: t("submenuXoso.soc_trang", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsst",
          series_id: 1,
          week_days: [3],
        },
        {
          id: 17,
          name: t("submenuXoso.dong_nai", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsdn",
          series_id: 1,
          week_days: [3],
        },
        {
          id: 42,
          name: t("submenuXoso.tra_vinh", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xstv",
          series_id: 1,
          week_days: [5],
        },
        {
          id: 43,
          name: t("submenuXoso.vinh_long", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsvl",
          series_id: 1,
          week_days: [5],
        },
        // {
        //   id: 57,
        //   name: "Miền Nam VIP 45 giây",
        //        //   code: "mn45g",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        // },
        // {
        //   id: 61,
        //   name: "Bến Tre",
        //   code: "ben-tre",
        //   series_id: 1,
        //   week_days: [2],
        // },
        // {
        //   id: 58,
        //   name: "Miền Nam VIP 1 phút",
        //   code: "mn1p",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   isNew: true,
        // },
        // {
        //   id: 59,
        //   name: "Miền Nam VIP 90 giây",
        //   code: "mn90g",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   isNew: true,
        // },
        // {
        //   id: 60,
        //   name: "Miền Nam VIP 2 phút",
        //   code: "mn2p",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   isNew: true,
        // },
        // {
        //   id: 44,
        //   name: "Miền Nam VIP 5 phút",
        //   code: "mn5p",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        // },
        {
          id: 16,
          name: t("submenuXoso.tp_ho_chi_minh", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xshcm-xstp",
          series_id: 1,
          week_days: [1, 6],
        },
        {
          id: 10,
          name: t("submenuXoso.ca_mau", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xscm",
          series_id: 1,
          week_days: [1],
        },
        {
          id: 13,
          name: t("submenuXoso.dong_thap", { ns: "home" }),
          code: "/lottery/xo-so/xsmn-xsdt",
          series_id: 1,
          week_days: [1],
        },
      ],
    },
    {
      menu_id: 3,
      menu_name: t("submenuXoso.mien_trung", { ns: "home" }),
      isFilter: true,
      list: [
        {
          id: 18,
          name: t("submenuXoso.da_nang", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsdng-xsdna",
          series_id: 3,
          week_days: [3, 6],
        },
        {
          id: 19,
          name: t("submenuXoso.thua_thien_hue", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xstth",
          series_id: 3,
          week_days: [0, 1],
        },
        {
          id: 20,
          name: t("submenuXoso.quang_tri", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsqt",
          series_id: 3,
          week_days: [4],
        },
        {
          id: 21,
          name: t("submenuXoso.phu_yen", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xspy",
          series_id: 3,
          week_days: [1],
        },
        {
          id: 22,
          name: t("submenuXoso.quang_binh", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsqb",
          series_id: 3,
          week_days: [4],
        },
        {
          id: 23,
          name: t("submenuXoso.quang_nam", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsqnm-xsqna",
          series_id: 3,
          week_days: [2],
        },
        {
          id: 24,
          name: t("submenuXoso.quang_ngai", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsqng",
          series_id: 3,
          week_days: [6],
        },
        {
          id: 25,
          name: t("submenuXoso.ninh_thuan", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsnt",
          series_id: 3,
          week_days: [5],
        },
        {
          id: 26,
          name: t("submenuXoso.kon_tum", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xskt",
          series_id: 3,
          week_days: [0],
        },
        {
          id: 27,
          name: t("submenuXoso.khanh_hoa", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xskh",
          series_id: 3,
          week_days: [0, 3],
        },
        {
          id: 28,
          name: t("submenuXoso.gia_lai", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsgl",
          series_id: 3,
          week_days: [5],
        },
        {
          id: 29,
          name: t("submenuXoso.binh_dinh", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsbdi",
          series_id: 3,
          week_days: [4],
        },
        {
          id: 30,
          name: t("submenuXoso.dak_lak", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsdlk",
          series_id: 3,
          week_days: [2],
        },
        {
          id: 31,
          name: t("submenuXoso.dak_nong", { ns: "home" }),
          code: "/lottery/xo-so/xsmt-xsdno",
          series_id: 3,
          week_days: [6],
        },
      ],
    },
    {
      menu_id: 5,
      menu_name: t("submenuXoso.mega_6_45", { ns: "home" }),
      list: [
        {
          id: 35,
          name: t("submenuXoso.mega_6_45_1_phut", { ns: "home" }),
          code: "/lottery/mega/1",
          series_id: 5,
          week_days: [0, 1, 2, 3, 4, 5, 6],
        },
        {
          id: 35,
          name: t("submenuXoso.mega_6_45_2_phut", { ns: "home" }),
          code: "/lottery/mega/2",
          series_id: 5,
          week_days: [0, 1, 2, 3, 4, 5, 6],
        },
        {
          id: 35,
          name: t("submenuXoso.mega_6_45_3_phut", { ns: "home" }),
          code: "/lottery/mega/3",
          series_id: 5,
          week_days: [0, 1, 2, 3, 4, 5, 6],
        },
        {
          id: 35,
          name: t("submenuXoso.mega_6_45_5_phut", { ns: "home" }),
          code: "/lottery/mega/5",
          series_id: 5,
          week_days: [0, 1, 2, 3, 4, 5, 6],
        },
      ],
    },
    {
      menu_id: 7,
      menu_name: t("submenuXoso.keno", { ns: "home" }),
      list: [
        {
          id: 51,
          name: t("submenuXoso.keno_vip_1_phut", { ns: "home" }),
          code: "/lottery/keno/60",
          series_id: 7,
          week_days: [0, 1, 2, 3, 4, 5, 6],
        },
        {
          id: 52,
          name: t("submenuXoso.keno_vip_2_phut", { ns: "home" }),
          code: "/lottery/keno/120",
          series_id: 7,
          week_days: [0, 1, 2, 3, 4, 5, 6],
        },
        {
          id: 53,
          name: t("submenuXoso.keno_vip_3_phut", { ns: "home" }),
          code: "/lottery/keno/180",
          series_id: 7,
          week_days: [0, 1, 2, 3, 4, 5, 6],
        },
        {
          id: 54,
          name: t("submenuXoso.keno_vip_5_phut", { ns: "home" }),
          code: "/lottery/keno/300",
          series_id: 7,
          week_days: [0, 1, 2, 3, 4, 5, 6],
        },
        // {
        //   id: 55,
        //   name: "Keno VIP 1 phút",
        //   code: "/lottery/keno/60",
        //   series_id: 7,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        // },
        // {
        //   id: 56,
        //   name: "Keno VIP 5 phút",
        //   code: "/lottery/keno/300",
        //   series_id: 7,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        // },
      ],
    },
  ];

  const navItems = [
    // {
    //   title: "Trang chủ",
    //   icon: <i className="iconfont icon-icon_nav_home" />
    // },
    // {
    //   title: "Xổ số",
    //   icon: <i className="iconfont icon-icon_nav_lottery" />
    // },
    {
      title: t("menu.live_casino", { ns: "home" }),
      icon: <i className="iconfont icon-icon_nav_casino" />,
      type: "LC",
      isHot: true,
      link: "/casino",
    },
    {
      title: t("menu.the_thao", { ns: "home" }),
      icon: <img src={thethaoIcon} alt="" />,
      type: "SB",
      isHot: true,
      link: "/sport",
    },
    {
      title: t("menu.xo_so", { ns: "home" }),
      icon: <i className="iconfont icon-icon_nav_casino" />,
      type: "xo_so",
      isHot: true,
      link: "/",
    },
    // {
    //   title: "Luckywin",
    //   icon: <i className="iconfont icon-icon_nav_luckywin" />,
    //   type: "LW",
    //   isHot: true,
    // },
    // {
    //   title: "Lottery",
    //   icon: <i className="iconfont icon-icon_nav_lottery" />,
    //   type: "LK",
    //   isHot: true,
    // },

    {
      title: t("menu.no_hu", { ns: "home" }),
      icon: <i className="iconfont icon-icon_nav_slots" />,
      type: "SL",
      isHot: false,
      link: "/slot",
    },
    {
      title: t("menu.da_ga", { ns: "home" }),
      icon: <i className="iconfont icon-icon_nav_cockfighting" />,
      type: "DM",
      isHot: false,
      link: "/cock-fighting",
    },
    {
      title: t("menu.ban_ca", { ns: "home" }),
      icon: <i className="iconfont icon-icon_nav_fishing" />,
      type: "FH",
      isHot: false,
      link: "/fish",
    },
    {
      title: t("menu.game_bai", { ns: "home" }),
      icon: <i className="iconfont icon-icon_nav_chess" />,
      type: "PK",
      type2: "CB",
      isHot: false,
      link: "/chess",
    },
    // {
    //   title: "Game khác",
    //   icon: <Gamepad className="mr-5" />,
    //   type: "OT",
    //   isHot: false,
    // },
  ];
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data?.data?.data || [];
  const getGamesByType = (type: string) => {
    if (games && games.length > 0) {
      return games.filter((game) => {
        if (type === "DM" && game.type === "OT" && game.providercode === "DM") {
          return game;
        }
        if (game.type === "OT" && game.providercode === "DM") {
          return null;
        }
        if (game.type === type) {
          return game;
        }
      });
    }
    return [];
  };

  const goToLottery = (path: string) => {
    if (gameAvailable.includes(path)) {
      navigate(path);
    } else {
      toast.error(t("game_dang_phat_trien", { ns: "all" }));
    }
  };
  return (
    <div className="w-full  py-1 h-full mx-auto hidden md:flex items-center justify-between gap-2 container md:max-w-fit">
      <NavigationMenu className="text-[14px]">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              icon={
                <div className="relative top-[-1px] mr-1 h-5 w-5 transition duration-200 icon">
                  <i className="iconfont icon-icon_nav_home" />
                </div>
                // <Icons.home className="relative top-[-1px] mr-1 h-5 w-5 transition duration-200" />
              }
              className="rounded-none"
              active={pathname === "/"}
            >
              <Link to="/">{t("menu.trang_chu", { ns: "home" })}</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>

          {navItems.map((item, index) => {
            if (item.type === "xo_so") {
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger
                    icon={
                      <div className="relative top-[-1px] mr-1 h-5 w-5 transition duration-200 icon">
                        <i className="iconfont icon-icon_nav_lottery" />
                      </div>
                    }
                    className="rounded-none"
                  >
                    <Link to="/">{t("menu.xo_so", { ns: "home" })}</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-6 gap-3 p-4 w-[75vw] ">
                      {components.map((component: any, index: number) => (
                        <div key={index}>
                          <ListItem
                            className="text-slate-900 font-bold dark:text-white"
                            title={component.menu_name}
                            isFilter={component.isFilter}
                            component={component}
                            dateXsmn={dateXsmn}
                            dateXsmt={dateXsmt}
                            setDateXsmn={setDateXsmn}
                            setDateXsmt={setDateXsmt}
                          ></ListItem>
                          {component.list.map((item: any) => {
                            if (
                              component.menu_id !== 1 &&
                              component.menu_id !== 3 &&
                              item.week_days.includes(d)
                            ) {
                              return (
                                <>
                                  <div className="relative">
                                    <ListItem
                                      className={
                                        item.code === "mb"
                                          ? "scratch cursor-pointer"
                                          : "cursor-pointer"
                                      }
                                      onClick={() => goToLottery(item.code)}
                                      key={item.id}
                                      title={item.name}
                                      isHot={item.isHot}
                                      isNew={item.isNew}
                                    ></ListItem>
                                  </div>
                                </>
                              );
                            }
                            if (
                              component.menu_id === 1 &&
                              item.week_days.includes(dateXsmn?.value || d)
                            ) {
                              return (
                                <>
                                  <div className="relative">
                                    <ListItem
                                      className={
                                        item.code === "mb"
                                          ? "scratch cursor-pointer"
                                          : "cursor-pointer"
                                      }
                                      onClick={() => goToLottery(item.code)}
                                      key={item.id}
                                      title={item.name}
                                    ></ListItem>
                                  </div>
                                </>
                              );
                            }
                            if (
                              component.menu_id === 3 &&
                              item.week_days.includes(dateXsmt?.value || d)
                            ) {
                              return (
                                <>
                                  <div className="relative">
                                    <ListItem
                                      className={
                                        item.code === "mb"
                                          ? "scratch cursor-pointer"
                                          : "cursor-pointer"
                                      }
                                      onClick={() => goToLottery(item.code)}
                                      key={item.id}
                                      title={item.name}
                                    ></ListItem>
                                  </div>
                                </>
                              );
                            }
                          })}
                        </div>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            } else {
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger
                    isHot={item.isHot}
                    link={item.link ? item.link : "/"}
                    icon={
                      <div className="relative top-[-1px] mr-2 h-6 w-6 transition duration-200 icon">
                        {item.icon}
                      </div>
                    }
                    className="rounded-none"
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <GameNav
                      isLucky={item.type === "LW"}
                      games={getGamesByType(item.type).concat(
                        getGamesByType(item.type2 || "")
                      )}
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }
          })}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              icon={
                <Icons.gamepad className="relative top-[-1px] mr-1 h-5 w-5 transition duration-200" />
              }
              className="rounded-none"
            >
              {t("menu.game_khac", { ns: "home" })}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <GameNav
                games={getGamesByType("ES")
                  .concat(getGamesByType("LK"))
                  .concat(getGamesByType("OT"))}
              />
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger
              link="/vip"
              icon={
                <Icons.vip className="relative top-[-1px] mr-1 h-5 w-5 transition duration-200" />
              }
              className="rounded-none"
              active={pathname === "/vip"}
            >
              VIP
            </NavigationMenuTrigger>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              link="/discount"
              icon={
                <div className="relative top-[-1px] mr-1 h-5 w-5 transition duration-200 icon">
                  <i className="iconfont icon-icon_nav_discounts" />
                </div>
              }
              className="rounded-none"
              active={pathname === "/discount"}
            >
              {t("menu.uu_dai", { ns: "home" })}
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              link="/agency"
              icon={
                <div className="relative top-[-1px] mr-1 h-5 w-5 transition duration-200 icon">
                  <i className="iconfont icon-icon_invite_friend" />
                </div>
              }
              className="rounded-none"
              active={pathname === "/agency"}
            >
              {t("menu.dai_li", { ns: "home" })}
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              link="/help"
              icon={
                <div className="relative top-[-1px] mr-1 h-5 w-5 transition duration-200 icon">
                  <i className="iconfont icon-icon_nav_help" />
                </div>
              }
              className="rounded-none"
              active={pathname === "/help"}
            >
              {t("menu.ho_tro", { ns: "home" })}
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  isFilter?: boolean;
  component?: any;
  dateXsmn?: {
    value: number;
    label: string;
  };
  dateXsmt?: {
    value: number;
    label: string;
  };
  isHot?: boolean;
  isNew?: boolean;
  setDateXsmn?: React.Dispatch<
    React.SetStateAction<
      | {
          value: number;
          label: string;
        }
      | undefined
    >
  >;
  setDateXsmt?: React.Dispatch<
    React.SetStateAction<
      | {
          value: number;
          label: string;
        }
      | undefined
    >
  >;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  (
    {
      className,
      isFilter,
      component,
      dateXsmn,
      dateXsmt,
      isHot,
      isNew,
      setDateXsmn,
      setDateXsmt,
      title,
      ...props
    },
    ref
  ) => {
    const dateList = useDateList();

    if (isFilter) {
      return (
        <>
          <li>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-base font-medium",
                className
              )}
              {...props}
            >
              <div>
                <span className="relative w-fit">
                  {title}
                  {isHot && (
                    <span className="lotterLabel lotterLabel_hot"></span>
                  )}
                  {isNew && (
                    <span className="lotterLabel lotterLabel_new"></span>
                  )}
                </span>
              </div>
              {isFilter && component?.menu_id === 1 && (
                <ReactSelect
                  className="basic-single dark:text-slate-700"
                  classNamePrefix="select"
                  name="color"
                  value={dateXsmn}
                  options={dateList}
                  onChange={(value) => {
                    if (setDateXsmn) {
                      setDateXsmn({
                        value: value?.value || 0,
                        label: value?.label || "",
                      });
                    }
                  }}
                />
              )}
              {isFilter && component?.menu_id === 3 && (
                <ReactSelect
                  className="basic-single dark:text-slate-700"
                  classNamePrefix="select"
                  name="color"
                  value={dateXsmt}
                  options={dateList}
                  onChange={(value) => {
                    if (setDateXsmt) {
                      setDateXsmt({
                        value: value?.value || 0,
                        label: value?.label || "",
                      });
                    }
                  }}
                />
              )}
            </a>
          </li>
        </>
      );
    } else {
      return (
        <li className="relative">
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-base font-medium",
                className
              )}
              {...props}
            >
              <div className="flex gap-2">
                <span className="dark:text-white">{title}</span>
                {isHot && <span className="label_hot"></span>}
                {isNew && <span className="label_new"></span>}
              </div>
            </a>
          </NavigationMenuLink>
        </li>
      );
    }
  }
);
ListItem.displayName = "ListItem";

export default NavRouters;
