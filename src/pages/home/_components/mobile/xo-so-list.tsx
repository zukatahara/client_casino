// @ts-nocheck

import NavBarMobile from "@/components/nav-bar-mobile";
import Banner from "../banner";
import "../../../../styles/xosolist.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import truonglong from "@/assets/images/img_changlong.7ae4a0fa.png";
import sicbo20 from "@/assets/images/SICBO20.png";
import sicbo30 from "@/assets/images/SICBO30.png";
import sicbo40 from "@/assets/images/SICBO40.png";
import sicbo50 from "@/assets/images/SICBO50.png";
import sicbo60 from "@/assets/images/SICBO60.png";
import sicbo120 from "@/assets/images/SICBO120.png";
import sicbo90 from "@/assets/images/SICBO90.png";
import sicbo180 from "@/assets/images/SICBO180.png";
import sicbo300 from "@/assets/images/SICBO300.png";
import keno1p from "@/assets/images/keno1p.png";
import keno2p from "@/assets/images/keno2p.png";
import keno3p from "@/assets/images/keno3p.png";
import keno5p from "@/assets/images/keno5p.png";
import keno20g from "@/assets/images/keno20g.png";
import keno30g from "@/assets/images/keno30g.png";
import keno40g from "@/assets/images/keno40g.png";
import keno50g from "@/assets/images/keno50g.png";
import mb2p from "@/assets/images/mb2p.png";
import mb45g from "@/assets/images/mb45g.png";
import mb75g from "@/assets/images/mb75g.png";
import mg1p from "@/assets/images/mg1p.png";
import mg2p from "@/assets/images/mg2p.png";
import mg3p from "@/assets/images/mg3p.png";
import mg5p from "@/assets/images/mg5p.png";
import pmb3p from "@/assets/images/pmb3p.png";
import pmb5p from "@/assets/images/pmb5p.png";
import angiang from "@/assets/images/an-giang.png";
import baclieu from "@/assets/images/bac-lieu.png";
import bentre from "@/assets/images/ben-tre.png";
import binhdinh from "@/assets/images/binh-dinh.png";
import binhphuoc from "@/assets/images/binh-phuoc.png";
import binhduong from "@/assets/images/binh-duong.png";
import binhthuan from "@/assets/images/binh-thuan.png";
import camau from "@/assets/images/ca-mau.png";
import cantho from "@/assets/images/can-tho.png";
import daclac from "@/assets/images/dak-lak.png";
import dacnong from "@/assets/images/dak-nong.png";
import dalat from "@/assets/images/da-lat.png";
import danang from "@/assets/images/da-nang.png";
import dongnai from "@/assets/images/dong-nai.png";
import dongthap from "@/assets/images/dong-thap.png";
import gialai from "@/assets/images/gia-lai.png";
import haugiang from "@/assets/images/hau-giang.png";
import kiengiang from "@/assets/images/kien-giang.png";
import kontum from "@/assets/images/kon-tum.png";
import khanhhoa from "@/assets/images/khanh-hoa.png";
import mienbac from "@/assets/images/mien-bac.png";
import ninhthuan from "@/assets/images/ninh-thuan.png";
import phuyen from "@/assets/images/phu-yen.png";
import quangbinh from "@/assets/images/quang-binh.png";
import quangnam from "@/assets/images/quang-nam.png";
import quangngai from "@/assets/images/quang-ngai.png";
import quangtri from "@/assets/images/quang-tri.png";
import soctrang from "@/assets/images/soc-trang.png";
import tayninh from "@/assets/images/tay-ninh.png";
import tiengiang from "@/assets/images/tien-giang.png";
import hcm from "@/assets/images/tp-hcm.png";
import hue from "@/assets/images/thua-thien-hue.png";
import travinh from "@/assets/images/tra-vinh.png";
import vinhlong from "@/assets/images/vinh-long.png";
import vungtau from "@/assets/images/vung-tau.png";
import Config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const otherGames = {
  keno1p,
  keno5p,
  keno2p,
  keno3p,
  keno20g,
  keno30g,
  keno40g,
  keno50g,
  mb2p,
  mb45g,
  mb75g,
  mg1p,
  mg2p,
  mg3p,
  mg5p,
  pmb3p,
  pmb5p,
  "an-giang": angiang,
  "bac-lieu": baclieu,
  "ben-tre": bentre,
  "binh-dinh": binhdinh,
  "binh-phuoc": binhphuoc,
  "binh-duong": binhduong,
  "binh-thuan": binhthuan,
  "ca-mau": camau,
  "can-tho": cantho,
  "dak-lak": daclac,
  "dak-nong": dacnong,
  "da-lat": dalat,
  "da-nang": danang,
  "dong-nai": dongnai,
  "dong-thap": dongthap,
  "gia-lai": gialai,
  "hau-giang": haugiang,
  "kien-giang": kiengiang,
  "kon-tum": kontum,
  "khanh-hoa": khanhhoa,
  "mien-bac": mienbac,
  "phu-yen": phuyen,
  "quang-binh": quangbinh,
  "quang-nam": quangnam,
  "quang-ngai": quangngai,
  "quang-tri": quangtri,
  "soc-trang": soctrang,
  "tay-ninh": tayninh,
  "tien-giang": tiengiang,
  "tp-hcm": hcm,
  "thua-thien-hue": hue,
  "tra-vinh": travinh,
  "vinh-long": vinhlong,
  "vung-tau": vungtau,
  "ninh-thuan": ninhthuan,
};
const sicboImages = {
  sicbo20,
  sicbo30,
  sicbo40,
  sicbo50,
  sicbo60,
  sicbo90,
  sicbo120,
  sicbo180,
  sicbo300,
};

const getListAvailable = () => {
  const config = Config();
  const lottery = Object.keys(config.listLottery).map(
    (key) => `/mobile/xo-so/${key}`
  );
  const sicbo = Object.keys(config.listSicbo).map(
    (key) => `/mobile/tai-xiu/${key}`
  );
  const mega = Object.keys(config.listMega).map((key) => `/mobile/mega/${key}`);
  const keno = Object.keys(config.listKeno).map((key) => `/mobile/keno/${key}`);

  return lottery.concat([...sicbo, ...mega, ...keno]);
};

const XoSoList = () => {
  const { t, i18n } = useTranslation([NS["HOME"], NS["ALL"], NS["config"]]);
  const newBanner =
    i18n.language === "vi-VN" ? "/betpng.png" : "/th-images/datcuoc1.png";
  const newBannerChanglong =
    i18n.language === "vi-VN"
      ? truonglong
      : "/th-images/img_changlong.7ae4a0fa.png";

  const gameAvailable = getListAvailable();
  const data = [
    {
      menu_id: 2,
      menu_name: t("xsmb", { ns: "config" }),
      list: [
        {
          id: 32,
          name: "Miền Bắc",
          code: "mien-bac",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/xo-so/xsmb",
        },
        {
          id: 45,
          name: "M.bắc SVIP 5 phút",
          code: "pmb5p",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/xo-so/300",
        },
        {
          id: 46,
          name: "M.bắc SVIP 3 phút",
          code: "pmb3p",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/xo-so/180",
        },
        {
          id: 49,
          name: "Miền Bắc VIP 2 phút",
          code: "mb2p",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/xo-so/120",
        },
        {
          id: 48,
          name: "Miền Bắc VIP 75 giây ",
          code: "mb75g",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/xo-so/75",
        },
        {
          id: 47,
          name: "Miền Bắc VIP 45 giây",
          code: "mb45g",
          series_id: 2,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/xo-so/45",
        },
      ],
    },
    {
      menu_id: 9,
      menu_name: "Sicbo",
      list: [
        // {
        //   id: 66,
        //   name: "Sicbo 20 giây",
        //   code: "sicbo20",
        //   series_id: 9,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/tai-xiu/20",
        // },
        // {
        //   id: 67,
        //   name: "Sicbo 30 giây",
        //   code: "sicbo30",
        //   series_id: 9,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/tai-xiu/30",
        // },
        // {
        //   id: 68,
        //   name: "Sicbo 40 giây",
        //   code: "sicbo40",
        //   series_id: 9,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/tai-xiu/40",
        // },
        // {
        //   id: 69,
        //   name: "Sicbo 50 giây",
        //   code: "sicbo50",
        //   series_id: 9,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/tai-xiu/50",
        // },
        {
          id: 70,
          name: "Sicbo 1 phút",
          code: "sicbo60",
          series_id: 9,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/tai-xiu/60",
        },
        {
          id: 66,
          name: "Sicbo 2 phút",
          code: "sicbo120",
          series_id: 9,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/tai-xiu/120",
        },
        {
          id: 67,
          name: "Sicbo 3 phút",
          code: "sicbo180",
          series_id: 9,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/tai-xiu/180",
        },
        {
          id: 68,
          name: "Sicbo 5 phút",
          code: "sicbo300",
          series_id: 9,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/tai-xiu/300",
        },
        // {
        //   id: 71,
        //   name: "Sicbo 1.5 phút",
        //   code: "sicbo90",
        //   series_id: 9,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/tai-xiu/90",
        // },
      ],
    },
    {
      menu_id: 1,
      menu_name: t("mien_nam", { ns: "all" }),
      list: [
        {
          id: 1,
          name: "Bạc Liêu",
          code: "bac-lieu",
          series_id: 1,
          week_days: [2],
          link: "/mobile/xo-so/xsmn-xsbl",
        },
        {
          id: 2,
          name: "Vũng Tàu",
          code: "vung-tau",
          series_id: 1,
          week_days: [2],
          link: "/mobile/xo-so/xsmn-xsvt",
        },
        {
          id: 3,
          name: "Tiền Giang",
          code: "tien-giang",
          series_id: 1,
          week_days: [0],
          link: "/mobile/xo-so/xsmn-xstg",
        },
        {
          id: 4,
          name: "Kiên Giang",
          code: "kien-giang",
          series_id: 1,
          week_days: [0],
          link: "/mobile/xo-so/xsmn-xskg",
        },
        {
          id: 5,
          name: "Đà Lạt",
          code: "da-lat",
          series_id: 1,
          week_days: [0],
          link: "/mobile/xo-so/xsmn-xsld-xsdl",
        },
        {
          id: 6,
          name: "Bình Phước",
          code: "binh-phuoc",
          series_id: 1,
          week_days: [6],
          link: "/mobile/xo-so/xsmn-xsbp",
        },
        {
          id: 7,
          name: "Bình Dương",
          code: "binh-duong",
          series_id: 1,
          week_days: [5],
          link: "/mobile/xo-so/xsmn-xsbd",
        },
        {
          id: 8,
          name: "An Giang",
          code: "an-giang",
          series_id: 1,
          week_days: [4],
          link: "/mobile/xo-so/xsmn-xsag",
        },
        {
          id: 9,
          name: "Bình Thuận",
          code: "binh-thuan",
          series_id: 1,
          week_days: [4],
          link: "/mobile/xo-so/xsmn-xsbth",
        },
        {
          id: 11,
          name: "Cần Thơ",
          code: "can-tho",
          series_id: 1,
          week_days: [3],
          link: "/mobile/xo-so/xsmn-xsct",
        },
        {
          id: 12,
          name: "Hậu Giang",
          code: "hau-giang",
          series_id: 1,
          week_days: [6],
          link: "/mobile/xo-so/xsmn-xshg",
        },
        {
          id: 14,
          name: "Tây Ninh",
          code: "tay-ninh",
          series_id: 1,
          week_days: [4],
          link: "/mobile/xo-so/xsmn-xstn",
        },
        {
          id: 15,
          name: "Sóc Trăng",
          code: "soc-trang",
          series_id: 1,
          week_days: [3],
          link: "/mobile/xo-so/xsmn-xsst",
        },
        {
          id: 17,
          name: "Đồng Nai",
          code: "dong-nai",
          series_id: 1,
          week_days: [3],
          link: "/mobile/xo-so/xsmn-xsdn",
        },
        {
          id: 42,
          name: "Trà Vinh",
          code: "tra-vinh",
          series_id: 1,
          week_days: [5],
          link: "/mobile/xo-so/xsmn-xstv",
        },
        {
          id: 43,
          name: "Vĩnh Long",
          code: "vinh-long",
          series_id: 1,
          week_days: [5],
          link: "/mobile/xo-so/xsmn-xsvl",
        },
        // {
        //   id: 57,
        //   name: "Miền Nam VIP 45 giây",
        //   code: "mn45g",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "mn45g",
        // },
        {
          id: 61,
          name: "Bến Tre",
          code: "ben-tre",
          series_id: 1,
          week_days: [2],
          link: "ben-tre",
        },
        // {
        //   id: 58,
        //   name: "Miền Nam VIP 1 phút",
        //   code: "mn1p",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "mn1p",
        // },
        // {
        //   id: 59,
        //   name: "Miền Nam VIP 90 giây",
        //   code: "mn90g",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "mn90g",
        // },
        // {
        //   id: 60,
        //   name: "Miền Nam VIP 2 phút",
        //   code: "mn2p",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "mn2p",
        // },
        // {
        //   id: 44,
        //   name: "Miền Nam VIP 5 phút",
        //   code: "mn5p",
        //   series_id: 1,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "mn5p",
        // },
        {
          id: 16,
          name: "TP Hồ Chí Minh",
          code: "tp-hcm",
          series_id: 1,
          week_days: [1, 6],
          link: "/mobile/xo-so/xsmn-xshcm-xstp",
        },
        {
          id: 10,
          name: "Cà Mau",
          code: "ca-mau",
          series_id: 1,
          week_days: [1],
          link: "/mobile/xo-so/xsmn-xscm",
        },
        {
          id: 13,
          name: "Đồng Tháp",
          code: "dong-thap",
          series_id: 1,
          week_days: [1],
          link: "/mobile/xo-so/xsmn-xsdt",
        },
      ],
    },
    {
      menu_id: 3,
      menu_name: t("mien_trung", { ns: "all" }),
      list: [
        {
          id: 18,
          name: "Đà Nẵng",
          code: "da-nang",
          series_id: 3,
          week_days: [3, 6],
          link: "/mobile/xo-so/xsmt-xsdng-xsdna",
        },
        {
          id: 19,
          name: "Thừa Thiên Huế",
          code: "thua-thien-hue",
          series_id: 3,
          week_days: [0, 1],
          link: "/mobile/xo-so/xsmt-xstth",
        },
        {
          id: 20,
          name: "Quảng Trị",
          code: "quang-tri",
          series_id: 3,
          week_days: [4],
          link: "/mobile/xo-so/xsmt-xsqt",
        },
        {
          id: 21,
          name: "Phú Yên",
          code: "phu-yen",
          series_id: 3,
          week_days: [1],
          link: "/mobile/xo-so/xsmt-xspy",
        },
        {
          id: 22,
          name: "Quảng Bình",
          code: "quang-binh",
          series_id: 3,
          week_days: [4],
          link: "/mobile/xo-so/xsmt-xsqb",
        },
        {
          id: 23,
          name: "Quảng Nam",
          code: "quang-nam",
          series_id: 3,
          week_days: [2],
          link: "/mobile/xo-so/xsmt-xsqnm-xsqna",
        },
        {
          id: 24,
          name: "Quảng Ngãi",
          code: "quang-ngai",
          series_id: 3,
          week_days: [6],
          link: "/mobile/xo-so/xsmt-xsqng",
        },
        {
          id: 25,
          name: "Ninh Thuận",
          code: "ninh-thuan",
          series_id: 3,
          week_days: [5],
          link: "/mobile/xo-so/xsmt-xsnt",
        },
        {
          id: 26,
          name: "Kon Tum",
          code: "kon-tum",
          series_id: 3,
          week_days: [0],
          link: "/mobile/xo-so/xsmt-xskt",
        },
        {
          id: 27,
          name: "Khánh Hoà",
          code: "khanh-hoa",
          series_id: 3,
          week_days: [0, 3],
          link: "/mobile/xo-so/xsmt-xskh",
        },
        {
          id: 28,
          name: "Gia Lai",
          code: "gia-lai",
          series_id: 3,
          week_days: [5],
          link: "/mobile/xo-so/xsmt-xsgl",
        },
        {
          id: 29,
          name: "Bình Định",
          code: "binh-dinh",
          series_id: 3,
          week_days: [4],
          link: "/mobile/xo-so/xsmt-xsbdi",
        },
        {
          id: 30,
          name: "Đắk Lắk",
          code: "dak-lak",
          series_id: 3,
          week_days: [2],
          link: "/mobile/xo-so/xsmt-xsdlk",
        },
        {
          id: 31,
          name: "Đắk Nông",
          code: "dak-nong",
          series_id: 3,
          week_days: [6],
          link: "/mobile/xo-so/xsmt-xsdno",
        },
      ],
    },
    {
      menu_id: 5,
      menu_name: "Mega 6/45",
      list: [
        {
          id: 35,
          name: "Mega 6/45 1 Phút",
          code: "mg1p",
          series_id: 5,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/mega/1",
        },
        {
          id: 36,
          name: "Mega 6/45 2 Phút",
          code: "mg2p",
          series_id: 5,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/mega/2",
        },
        {
          id: 37,
          name: "Mega 6/45 3 Phút",
          code: "mg3p",
          series_id: 5,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/mega/3",
        },
        {
          id: 38,
          name: "Mega 6/45 5 Phút",
          code: "mg5p",
          series_id: 5,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/mega/5",
        },
      ],
    },
    {
      menu_id: 7,
      menu_name: "Keno",
      list: [
        // {
        //   id: 52,
        //   name: "Keno VIP 30 giây",
        //   code: "keno30g",
        //   series_id: 7,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/keno/30",
        // },
        // {
        //   id: 53,
        //   name: "Keno VIP 40 giây",
        //   code: "keno40g",
        //   series_id: 7,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/keno/40",
        // },
        // {
        //   id: 54,
        //   name: "Keno VIP 50 giây",
        //   code: "keno50g",
        //   series_id: 7,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/keno/50",
        // },
        {
          id: 55,
          name: "Keno VIP 1 phút",
          code: "keno1p",
          series_id: 7,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/keno/60",
        },
        {
          id: 54,
          name: "Keno VIP 2 phút",
          code: "keno2p",
          series_id: 7,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/keno/120",
        },
        {
          id: 53,
          name: "Keno VIP 3 phút",
          code: "keno3p",
          series_id: 7,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/keno/180",
        },
        {
          id: 56,
          name: "Keno VIP 5 phút",
          code: "keno5p",
          series_id: 7,
          week_days: [0, 1, 2, 3, 4, 5, 6],
          link: "/mobile/keno/300",
        },
        // {
        //   id: 51,
        //   name: "Keno VIP 20 giây",
        //   code: "keno20g",
        //   series_id: 7,
        //   week_days: [0, 1, 2, 3, 4, 5, 6],
        //   link: "/mobile/keno/20",
        // },
      ],
    },
  ];
  const navigate = useNavigate();
  const goToLottery = (path: string) => {
    if (gameAvailable.includes(path)) {
      navigate(path);
    } else {
      toast.error(t("game_dang_phat_trien", { ns: "all" }));
    }
  };
  const d = new Date().getDay();
  return (
    <>
      <NavBarMobile />
      <Banner />
      <div data-v-3ba601d0 data-v-dc4dbe90 className="gameListBox games">
        <div data-v-3ba601d0 className="clEntrance">
          <img
            data-v-3ba601d0
            src={newBannerChanglong}
            // src="https://www.xoso66.me/mobile/static/img/img_changlong.7ae4a0fa.png"
            alt=""
          />
        </div>
        {data.map((item) => {
          return (
            <div key={item.menu_id} data-v-3ba601d0>
              <div data-v-3ba601d0 className="funcBox">
                <a data-v-3ba601d0 className="name">
                  <span data-v-3ba601d0>{item.menu_name}</span>
                </a>
                <div data-v-3ba601d0 className="filter"></div>
              </div>
              <ul data-v-3ba601d0 className="gameListUl">
                {item.list.map((game) => {
                  if (game.week_days.includes(d)) {
                    return (
                      <li
                        onClick={() => goToLottery(game.link || "ok")}
                        data-v-3ba601d0
                        className="lotteryitem"
                      >
                        {item.menu_id !== 9 && (
                          <img
                            data-v-3ba601d0
                            alt=""
                            src={otherGames[game.code]}
                            // src={`https://xoso66.me/server/static/lottery_logo/v1/${game.code}.png?v=20231030`}
                          />
                        )}
                        {item.menu_id === 9 && (
                          <img
                            data-v-3ba601d0
                            alt=""
                            src={sicboImages[game.code]}
                            // src={`https://www.xoso66.me/server/static/lottery_logo/sicbo/icon/${game.code.toUpperCase()}.png?v=20231030`}
                          />
                        )}
                        <img
                          data-v-3ba601d0
                          src={newBanner}
                          alt=""
                          className="betNow"
                        />
                        <span
                          data-v-3ba601d0
                          className="lotterLabel lotterLabel_hot"
                        />
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default XoSoList;
