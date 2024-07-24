import xucsac1 from "@/assets/images/xucsac1.png";
import xucsac2 from "@/assets/images/xucsac2.png";
import xucsac3 from "@/assets/images/xucsac3.png";
import xucsac3d1 from "@/assets/images/xucsac3d1.png";
import xucsac3d2 from "@/assets/images/xucsac3d2.png";
import xucsac3d3 from "@/assets/images/xucsac3d3.png";
import xucsac3d4 from "@/assets/images/xucsac3d4.png";
import xucsac3d5 from "@/assets/images/xucsac3d5.png";
import xucsac3d6 from "@/assets/images/xucsac3d6.png";
import xucsac4 from "@/assets/images/xucsac4.png";
import xucsac5 from "@/assets/images/xucsac5.png";
import xucsac6 from "@/assets/images/xucsac6.png";
import iconV1_01 from "@/assets/vip/vip1/01.png";
import iconV1_02 from "@/assets/vip/vip1/02.png";
import iconV2_01 from "@/assets/vip/vip2/01.png";
import iconV2_02 from "@/assets/vip/vip2/02.png";
import iconV3_01 from "@/assets/vip/vip3/01.png";
import iconV3_02 from "@/assets/vip/vip3/02.png";
import iconV4_01 from "@/assets/vip/vip4/01.png";
import iconV4_02 from "@/assets/vip/vip4/02.png";
import iconV5_01 from "@/assets/vip/vip5/01.png";
import iconV5_02 from "@/assets/vip/vip5/02.png";
import iconV6_01 from "@/assets/vip/vip6/01.png";
import iconV6_02 from "@/assets/vip/vip6/02.png";
import iconV7_01 from "@/assets/vip/vip7/01.png";
import iconV7_02 from "@/assets/vip/vip7/02.png";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import { useEffect } from "react";

const Config = () => {
  const { t, i18n } = useTranslation([NS.config, NS["ALL"]]);

  useEffect(() => {
    const handleLanguageChange = () => {
      window.location.reload();
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const config = {
    baseUrl:
      window.location.hostname === "localhost"
        ? "http://localhost:8000"
        : `https://api.${window.location.hostname}`,
    webSocketUrl:
      window.location.hostname === "localhost"
        ? "ws://localhost:8080/connect"
        : `wss://game.${window.location.hostname}/connect`,
    siteKey: "0x4AAAAAAAc-kdZSc9r3kA9u",
    // baseUrl: "https://api.ii88bet.com",
    // webSocketUrl: "ws://localhost:8080/connect",
    ketQuaDice: [
      {
        value: "1",
        img: xucsac1,
        img3D: xucsac3d1,
      },
      {
        value: "2",
        img: xucsac2,
        img3D: xucsac3d2,
      },
      {
        value: "3",
        img: xucsac3,
        img3D: xucsac3d3,
      },
      {
        value: "4",
        img: xucsac4,
        img3D: xucsac3d4,
      },
      {
        value: "5",
        img: xucsac5,
        img3D: xucsac3d5,
      },
      {
        value: "6",
        img: xucsac6,
        img3D: xucsac3d6,
      },
    ],
    tonghopOld: [
      {
        content: t("tai", { ns: "config" }),
        isContent: true,
        tienDatCuoc: 0,
        tiLe: 1.985,
        value: "tai",
        isActive: false,
      },
      {
        content: t("xiu", { ns: "config" }),
        isContent: true,
        tienDatCuoc: 0,
        tiLe: 1.985,
        value: "xiu",
        isActive: false,
      },
      {
        content: t("le", { ns: "config" }),
        isContent: true,
        tienDatCuoc: 0,
        tiLe: 1.985,
        value: "le",
        isActive: false,
      },
      {
        content: t("chan", { ns: "config" }),
        isContent: true,
        tienDatCuoc: 0,
        tiLe: 1.985,
        value: "chan",
        isActive: false,
      },
      {
        content: "4",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 60,
        value: "bon",
        isActive: false,
      },
      {
        content: "5",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 30,
        value: "nam",
        isActive: false,
      },
      {
        content: "6",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 17,
        value: "sau",
        isActive: false,
      },
      {
        content: "7",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 12,
        value: "bay",
        isActive: false,
      },
      {
        content: "8",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 8,
        value: "tam",
        isActive: false,
      },
      {
        content: "9",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 6,
        value: "chin",
        isActive: false,
      },
      {
        content: "10",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 6,
        value: "muoi",
        isActive: false,
      },
      {
        content: "11",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 6,
        value: "muoi1",
        isActive: false,
      },
      {
        content: "12",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 6,
        value: "muoi2",
        isActive: false,
      },
      {
        content: "13",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 8,
        value: "muoi3",
        isActive: false,
      },
      {
        content: "14",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 12,
        value: "muoi4",
        isActive: false,
      },
      {
        content: "15",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 17,
        value: "muoi5",
        isActive: false,
      },
      {
        content: "16",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 30,
        value: "muoi6",
        isActive: false,
      },
      {
        content: "17",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 60,
        value: "muoi7",
        isActive: false,
      },
      {
        content: "1",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 2,
        value: "number1",
        isActive: false,
      },
      {
        content: "2",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 2,
        value: "number2",
        isActive: false,
      },
      {
        content: "3",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 2,
        value: "number3",
        isActive: false,
      },
      {
        content: "4",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 2,
        value: "number4",
        isActive: false,
      },
      {
        content: "5",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 2,
        value: "number5",
        isActive: false,
      },
      {
        content: "6",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 2,
        value: "number6",
        isActive: false,
      },
      {
        content: "11",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 13,
        value: "number11",
        isActive: false,
      },
      {
        content: "22",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 13,
        value: "number22",
        isActive: false,
      },
      {
        content: "33",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 13,
        value: "number33",
        isActive: false,
      },
      {
        content: "44",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 13,
        value: "number44",
        isActive: false,
      },
      {
        content: "55",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 13,
        value: "number55",
        isActive: false,
      },
      {
        content: "66",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 13,
        value: "number66",
        isActive: false,
      },
      {
        content: "111",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 200,
        value: "number111",
        isActive: false,
      },
      {
        content: "222",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 200,
        value: "number222",
        isActive: false,
      },
      {
        content: "333",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 200,
        value: "number333",
        isActive: false,
      },
      {
        content: "444",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 200,
        value: "number444",
        isActive: false,
      },
      {
        content: "555",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 200,
        value: "number555",
        isActive: false,
      },
      {
        content: "666",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 200,
        value: "number666",
        isActive: false,
      },
      {
        content: "any",
        isContent: false,
        tienDatCuoc: 0,
        tiLe: 33,
        value: "number_three_any",
        isActive: false,
      },
    ],
    infoCuoc: {
      xiu: t("xiu", { ns: "config" }),
      chan: t("chan", { ns: "config" }),
      le: t("le", { ns: "config" }),
      tai: t("tai", { ns: "config" }),
      bon: "4",
      nam: "5",
      sau: "6",
      bay: "7",
      tam: "8",
      chin: "9",
      muoi: "10",
      muoi1: "11",
      muoi2: "12",
      muoi3: "13",
      muoi4: "14",
      muoi5: "15",
      muoi6: "16",
      muoi7: "17",
      number1: t("number1", { ns: "config" }),
      number2: t("number2", { ns: "config" }),
      number3: t("number3", { ns: "config" }),
      number4: t("number4", { ns: "config" }),
      number5: t("number5", { ns: "config" }),
      number6: t("number6", { ns: "config" }),
      number11: t("number11", { ns: "config" }),
      number22: t("number22", { ns: "config" }),
      number33: t("number33", { ns: "config" }),
      number44: t("number44", { ns: "config" }),
      number55: t("number55", { ns: "config" }),
      number66: t("number66", { ns: "config" }),
      number111: t("number111", { ns: "config" }),
      number222: t("number222", { ns: "config" }),
      number333: t("number333", { ns: "config" }),
      number444: t("number444", { ns: "config" }),
      number555: t("number555", { ns: "config" }),
      number666: t("number666", { ns: "config" }),
      number_three_any: t("number_three_any", { ns: "config" }),
    },
    listTheLoai: [
      {
        title: t("bao lo", { ns: "config" }),
        isHot: false,
        value: "baolo",
        listType: [
          {
            title: t("lo 2 so", { ns: "config" }),
            isHot: true,
            value: "lo2",
            placeholder: t("vd lo 2 so", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi lo 2 so", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("lo 2 so dau", { ns: "config" }),
            isHot: true,
            value: "lo2sodau",
            placeholder: "",
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi lo 2 so dau", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("lo 2 so 1k", { ns: "config" }),
            isHot: true,
            value: "lo2so1k",
            placeholder: t("vd lo 2 so 1k", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi lo 2 so 1k", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("lo 3 so", { ns: "config" }),
            isHot: true,
            value: "lo3so",
            placeholder: t("vd lo 3 so", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi lo 3 so", { ns: "config" }),
            numberLength: 3,
          },
          {
            title: t("lo 4 so", { ns: "config" }),
            isHot: true,
            value: "lo4so",
            placeholder: t("vd lo 4 so", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi lo 4 so", { ns: "config" }),
            numberLength: 4,
          },
        ],
      },
      {
        title: t("tro dac sac", { ns: "config" }),
        isHot: true,
        value: "dacsac",
        listType: [
          {
            title: t("tong", { ns: "config" }),
            isHot: true,
            value: "ds_tong",
            placeholder: t("vd tong", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi tong", { ns: "config" }),
          },
          {
            title: t("so dau", { ns: "config" }),
            isHot: true,
            value: "ds_sodau",
            placeholder: t("vd so dau", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi so dau", { ns: "config" }),
          },
          {
            title: t("so hai", { ns: "config" }),
            isHot: true,
            value: "ds_sohai",
            placeholder: t("vd so hai", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi so hai", { ns: "config" }),
          },
          {
            title: t("so ba", { ns: "config" }),
            isHot: true,
            value: "ds_soba",
            placeholder: t("vd so ba", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi so ba", { ns: "config" }),
          },
          {
            title: t("so bon", { ns: "config" }),
            isHot: true,
            value: "ds_sobon",
            placeholder: t("vd so bon", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi so bon", { ns: "config" }),
          },
          {
            title: t("so bon", { ns: "config" }),
            isHot: true,
            value: "ds_sonam",
            placeholder: t("vd so bon", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi so bon", { ns: "config" }),
          },
        ],
      },
      {
        title: t("tro choi thu vi", { ns: "config" }),
        isHot: true,
        value: "thuvi",
        listType: [
          {
            title: t("lo 2 so giai db", { ns: "config" }),
            isHot: true,
            value: "thuvi",
            placeholder: t("vd lo 2 so giai db", { ns: "config" }),
            minCuoc: 27000,
            tiLe: 1,
            c: t("cach choi lo 2 so giai db", { ns: "config" }),
          },
        ],
      },
      {
        title: t("lo xien", { ns: "config" }),
        isHot: false,
        value: "loxien",
        listType: [
          {
            title: t("xien 2", { ns: "config" }),
            isHot: false,
            value: "xien2",
            placeholder: t("vd xien 2", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            numberLength: 2,
            c: t("cach choi xien 2", { ns: "config" }),
          },
          {
            title: t("xien 3", { ns: "config" }),
            isHot: false,
            value: "xien3",
            placeholder: t("vd xien 3", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi xien 3", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("xien 4", { ns: "config" }),
            isHot: true,
            value: "xien4",
            placeholder: t("vd xien 4", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi xien 4", { ns: "config" }),
            numberLength: 2,
          },
        ],
      },
      {
        title: t("danh de", { ns: "config" }),
        isHot: false,
        value: "danhde",
        listType: [
          {
            title: t("de dac biet", { ns: "config" }),
            isHot: true,
            value: "de",
            placeholder: t("vd de dac biet", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi de dac biet", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("de dau dac biet", { ns: "config" }),
            isHot: false,
            value: "daude",
            placeholder: t("vd de dau dac biet", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi de dau dac biet", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("de giai 7", { ns: "config" }),
            isHot: false,
            value: "de7",
            placeholder: t("vd de giai 7", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi de giai 7", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("de giai nhat", { ns: "config" }),
            isHot: false,
            value: "de1",
            placeholder: t("vd de giai nhat", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi de giai nhat", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("de dau giai nhat", { ns: "config" }),
            isHot: false,
            value: "daude1",
            placeholder: t("vd de dau giai nhat", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi dau de giai nhat", { ns: "config" }),
            numberLength: 2,
          },
        ],
      },
      {
        title: t("dau duoi", { ns: "config" }),
        isHot: false,
        value: "dauduoi",
        listType: [
          {
            title: t("dau", { ns: "config" }),
            isHot: false,
            value: "dau",
            placeholder: t("vd dau", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi dau", { ns: "config" }),
          },
          {
            title: t("duoi", { ns: "config" }),
            isHot: true,
            value: "duoi",
            placeholder: t("vd duoi", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi duoi", { ns: "config" }),
          },
        ],
      },
      {
        title: t("3 cang", { ns: "config" }),
        isHot: false,
        value: "3cang",
        listType: [
          {
            title: t("3 cang", { ns: "config" }),
            isHot: true,
            value: "3cang",
            placeholder: t("vd 3 cang", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi 3 cang", { ns: "config" }),
            numberLength: 3,
          },
          {
            title: t("3 cang giai nhat", { ns: "config" }),
            isHot: true,
            value: "3cangg1",
            placeholder: t("vd 3 cang giai nhat", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi 3 cang giai nhat", { ns: "config" }),
            numberLength: 3,
          },
        ],
      },
      {
        title: t("4 cang", { ns: "config" }),
        isHot: false,
        value: "4cang",
        listType: [
          {
            title: t("4 cang dac biet", { ns: "config" }),
            isHot: true,
            value: "cang4",
            placeholder: t("vd 4 cang dac biet", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi 4 cang dac biet", { ns: "config" }),
            numberLength: 4,
          },
        ],
      },
      {
        title: t("lo truot", { ns: "config" }),
        isHot: false,
        value: "lotruot",
        listType: [
          {
            title: t("truot xien 4", { ns: "config" }),
            isHot: true,
            value: "truotxien4",
            placeholder: t("vd truot xien 4", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi truot xien 4", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("truot xien 8", { ns: "config" }),
            isHot: true,
            value: "truotxien8",
            placeholder: t("vd truot xien 8", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi truot xien 8", { ns: "config" }),
            numberLength: 2,
          },
          {
            title: t("truot xien 10", { ns: "config" }),
            isHot: true,
            value: "truotxien10",
            placeholder: t("vd truot xien 10", { ns: "config" }),
            minCuoc: 1000,
            tiLe: 1,
            c: t("cach choi truot xien 10", { ns: "config" }),
            numberLength: 2,
          },
        ],
      },
    ],
    typeEnter: {
      baolo: [
        {
          label: t("chon so", { ns: "config" }),
          value: 0,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 1,
        },
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 2,
        },
      ],
      loxien: [
        {
          label: t("nhap so", { ns: "config" }),
          value: 1,
        },
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 2,
        },
      ],
      danhde: [
        {
          label: t("chon so", { ns: "config" }),
          value: 0,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 1,
        },
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 2,
        },
      ],
      dauduoi: [
        {
          label: t("chon so", { ns: "config" }),
          value: 0,
        },
      ],
      "3cang": [
        {
          label: t("chon so", { ns: "config" }),
          value: 0,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 1,
        },
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 2,
        },
      ],
      "4cang": [
        {
          label: t("chon so", { ns: "config" }),
          value: 0,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 1,
        },
      ],
      lotruot: [
        {
          label: t("chon so", { ns: "config" }),
          value: 1,
        },
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 2,
        },
      ],
      dacsac: [
        {
          label: t("chon so", { ns: "config" }),
          value: 0,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 1,
        },
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 2,
        },
      ],
      thuvi: [
        {
          label: t("chon so", { ns: "config" }),
          value: 0,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 1,
        },
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 2,
        },
      ],
    },
    megaTypeEnter: {
      sothuong: [
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 1,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 2,
        },
      ],
      nhieuso: [
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 1,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 2,
        },
      ],
      lotruot: [
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 1,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 2,
        },
      ],
      chon1: [
        {
          label: t("chon nhanh", { ns: "config" }),
          value: 1,
        },
        {
          label: t("nhap so", { ns: "config" }),
          value: 2,
        },
      ],
    },
    listLottery: {
      "45": t("45", { ns: "config" }),
      "180": t("180", { ns: "config" }),
      "300": t("300", { ns: "config" }),
      "120": t("120", { ns: "config" }),
      "75": t("75", { ns: "config" }),
      xsmb: t("xsmb", { ns: "config" }),
      "xsmn-xscm": t("xsmn-xscm", { ns: "config" }),
      "xsmn-xsdt": t("xsmn-xsdt", { ns: "config" }),
      "xsmn-xshcm-xstp": t("xsmn-xshcm-xstp", { ns: "config" }),
      "xsmn-xsbl": t("xsmn-xsbl", { ns: "config" }),
      "xsmn-xsvt": t("xsmn-xsvt", { ns: "config" }),
      "xsmn-xsct": t("xsmn-xsct", { ns: "config" }),
      "xsmn-xsst": t("xsmn-xsst", { ns: "config" }),
      "xsmn-xsdn": t("xsmn-xsdn", { ns: "config" }),
      "xsmn-xsag": t("xsmn-xsag", { ns: "config" }),
      "xsmn-xsbth": t("xsmn-xsbth", { ns: "config" }),
      "xsmn-xstn": t("xsmn-xstn", { ns: "config" }),
      "xsmn-xsbd": t("xsmn-xsbd", { ns: "config" }),
      "xsmn-xsvl": t("xsmn-xsvl", { ns: "config" }),
      "xsmn-xstv": t("xsmn-xstv", { ns: "config" }),
      "xsmn-xsbp": t("xsmn-xsbp", { ns: "config" }),
      "xsmn-xshg": t("xsmn-xshg", { ns: "config" }),
      "xsmn-xstg": t("xsmn-xstg", { ns: "config" }),
      "xsmn-xskg": t("xsmn-xskg", { ns: "config" }),
      "xsmn-xsld-xsdl": t("xsmn-xsld-xsdl", { ns: "config" }),
      "xsmt-xstth": t("xsmt-xstth", { ns: "config" }),
      "xsmt-xspy": t("xsmt-xspy", { ns: "config" }),
      "xsmt-xsqnm-xsqna": t("xsmt-xsqnm-xsqna", { ns: "config" }),
      "xsmt-xsdlk": t("xsmt-xsdlk", { ns: "config" }),
      "xsmt-xsdng-xsdna": t("xsmt-xsdng-xsdna", { ns: "config" }),
      "xsmt-xskh": t("xsmt-xskh", { ns: "config" }),
      "xsmt-xsqt": t("xsmt-xsqt", { ns: "config" }),
      "xsmt-xsqb": t("xsmt-xsqb", { ns: "config" }),
      "xsmt-xsbdi": t("xsmt-xsbdi", { ns: "config" }),
      "xsmt-xsnt": t("xsmt-xsnt", { ns: "config" }),
      "xsmt-xsgl": t("xsmt-xsgl", { ns: "config" }),
      "xsmt-xsqng": t("xsmt-xsqng", { ns: "config" }),
      "xsmt-xsdno": t("xsmt-xsdno", { ns: "config" }),
      "xsmt-xskt": t("xsmt-xskt", { ns: "config" }),
    },
    listMega: {
      1: t("mega 1", { ns: "config" }),
      2: t("mega 2", { ns: "config" }),
      3: t("mega 3", { ns: "config" }),
      5: t("mega 5", { ns: "config" }),
    },
    listKeno: {
      // 20: "Keno VIP 20 giây",
      // 30: "Keno VIP 30 giây",
      // 40: "Keno VIP 40 giây",
      // 50: "Keno VIP 50 giây",
      60: t("keno 60", { ns: "config" }),
      120: t("keno 120", { ns: "config" }),
      180: t("keno 180", { ns: "config" }),
      300: t("keno 300", { ns: "config" }),
    },
    listSicbo: {
      // 20: "Sicbo 20 giây",
      // 30: "Sicbo 30 giây",
      // 40: "Sicbo 40 giây",
      // 50: "Sicbo 50 giây",
      60: t("sicbo 60", { ns: "config" }),
      120: t("sicbo 120", { ns: "config" }),
      180: t("sicbo 180", { ns: "config" }),
      300: t("sicbo 300", { ns: "config" }),
    },
    listXsmb: {
      "45": t("45", { ns: "config" }),
      "180": t("180", { ns: "config" }),
      "300": t("300", { ns: "config" }),
      "120": t("120", { ns: "config" }),
      "75": t("75", { ns: "config" }),
      xsmb: t("xsmb", { ns: "config" }),
    },
    listXsmt: {
      "xsmt-xstth": t("xsmt-xstth", { ns: "config" }),
      "xsmt-xspy": t("xsmt-xspy", { ns: "config" }),
      "xsmt-xsqnm-xsqna": t("xsmt-xsqnm-xsqna", { ns: "config" }),
      "xsmt-xsdlk": t("xsmt-xsdlk", { ns: "config" }),
      "xsmt-xsdng-xsdna": t("xsmt-xsdng-xsdna", { ns: "config" }),
      "xsmt-xskh": t("xsmt-xskh", { ns: "config" }),
      "xsmt-xsqt": t("xsmt-xsqt", { ns: "config" }),
      "xsmt-xsqb": t("xsmt-xsqb", { ns: "config" }),
      "xsmt-xsbdi": t("xsmt-xsbdi", { ns: "config" }),
      "xsmt-xsnt": t("xsmt-xsnt", { ns: "config" }),
      "xsmt-xsgl": t("xsmt-xsgl", { ns: "config" }),
      "xsmt-xsqng": t("xsmt-xsqng", { ns: "config" }),
      "xsmt-xsdno": t("xsmt-xsdno", { ns: "config" }),
      "xsmt-xskt": t("xsmt-xskt", { ns: "config" }),
    },
    listXsmn: {
      "xsmn-xscm": t("xsmn-xscm", { ns: "config" }),
      "xsmn-xsdt": t("xsmn-xsdt", { ns: "config" }),
      "xsmn-xshcm-xstp": t("xsmn-xshcm-xstp", { ns: "config" }),
      "xsmn-xsbl": t("xsmn-xsbl", { ns: "config" }),
      "xsmn-xsvt": t("xsmn-xsvt", { ns: "config" }),
      "xsmn-xsct": t("xsmn-xsct", { ns: "config" }),
      "xsmn-xsst": t("xsmn-xsst", { ns: "config" }),
      "xsmn-xsdn": t("xsmn-xsdn", { ns: "config" }),
      "xsmn-xsag": t("xsmn-xsag", { ns: "config" }),
      "xsmn-xsbth": t("xsmn-xsbth", { ns: "config" }),
      "xsmn-xstn": t("xsmn-xstn", { ns: "config" }),
      "xsmn-xsbd": t("xsmn-xsbd", { ns: "config" }),
      "xsmn-xsvl": t("xsmn-xsvl", { ns: "config" }),
      "xsmn-xstv": t("xsmn-xstv", { ns: "config" }),
      "xsmn-xsbp": t("xsmn-xsbp", { ns: "config" }),
      "xsmn-xshg": t("xsmn-xshg", { ns: "config" }),
      "xsmn-xstg": t("xsmn-xstg", { ns: "config" }),
      "xsmn-xskg": t("xsmn-xskg", { ns: "config" }),
      "xsmn-xsld-xsdl": t("xsmn-xsld-xsdl", { ns: "config" }),
    },
    listCuaDatKeno: {
      keo_doi: {
        chan: t("chan", { ns: "config" }),
        le: t("le", { ns: "config" }),
        tai: t("tai", { ns: "config" }),
        xiu: t("xiu", { ns: "config" }),
      },
      tren_duoi: {
        tren: t("tren", { ns: "config" }),
        hoa: t("hoa", { ns: "config" }),
        duoi: t("duois", { ns: "config" }),
      },
      cuoc_gop: {
        tai_le: t("tai_le", { ns: "config" }),
        xiu_le: t("xiu_le", { ns: "config" }),
        tai_chan: t("tai_chan", { ns: "config" }),
        xiu_chan: t("xiu_chan", { ns: "config" }),
      },
      ngu_hanh: {
        kim: t("kim", { ns: "config" }),
        moc: t("moc", { ns: "config" }),
        thuy: t("thuy", { ns: "config" }),
        hoa: t("hoar", { ns: "config" }),
        tho: t("tho", { ns: "config" }),
      },
    },

    listNameKeno: {
      keo_doi: {
        value: t("keo_doi", { ns: "config" }),
        children: {
          chan: t("chan", { ns: "config" }),
          le: t("le", { ns: "config" }),
          tai: t("tai", { ns: "config" }),
          xiu: t("xiu", { ns: "config" }),
        },
      },
      tren_duoi: {
        value: t("tren_duoi", { ns: "config" }),
        children: {
          tren: t("tren", { ns: "config" }),
          hoa: t("hoa", { ns: "config" }),
          duoi: t("duoi", { ns: "config" }),
        },
      },
      cuoc_gop: {
        value: t("cuoc_gop", { ns: "config" }),
        children: {
          tai_le: t("tai_le", { ns: "config" }),
          xiu_le: t("xiu_le", { ns: "config" }),
          tai_chan: t("tai_chan", { ns: "config" }),
          xiu_chan: t("xiu_chan", { ns: "config" }),
        },
      },
      ngu_hanh: {
        value: t("ngu_hanh", { ns: "config" }),
        children: {
          kim: t("kim", { ns: "config" }),
          moc: t("moc", { ns: "config" }),
          thuy: t("thuy", { ns: "config" }),
          hoa: t("hoar", { ns: "config" }),
          tho: t("tho", { ns: "config" }),
        },
      },
    },
    cachChoiMega: {
      sothuong: t("sothuong", { ns: "config" }),
      "4so": t("4so", { ns: "config" }),
      "3so": t("3so", { ns: "config" }),
      "2so": t("2so", { ns: "config" }),
      truotxien5: t("truotxien5", { ns: "config" }),
      truotxien6: t("truotxien6", { ns: "config" }),
      truotxien7: t("truotxien7", { ns: "config" }),
      truotxien8: t("truotxien8", { ns: "config" }),
      truotxien9: t("truotxien9", { ns: "config" }),
      truotxien10: t("truotxien10", { ns: "config" }),
      chon5: t("chon5", { ns: "config" }),
      chon6: t("chon6", { ns: "config" }),
      chon7: t("chon7", { ns: "config" }),
      chon8: t("chon8", { ns: "config" }),
      chon9: t("chon9", { ns: "config" }),
      chon10: t("chon10", { ns: "config" }),
    },
    cachChoiKeno: t("cachChoiKeno", { ns: "config" }),
    cachChoiSicbo: t("cachChoiSicbo", { ns: "config" }),

    cuocMega: {
      sothuong: t("so_thuong", { ns: "all" }),
      "4so": t("4_so", { ns: "all" }),
      "3so": t("3_so", { ns: "all" }),
      "2so": t("2_so", { ns: "all" }),
      truotxien5: t("truot_xien_5", { ns: "all" }),
      truotxien6: t("truot_xien_6", { ns: "all" }),
      truotxien7: t("truot_xien_7", { ns: "all" }),
      truotxien8: t("truot_xien_8", { ns: "all" }),
      truotxien9: t("truot_xien_9", { ns: "all" }),
      truotxien10: t("truot_xien_10", { ns: "all" }),
      chon5: t("chon_5_an_1", { ns: "all" }),
      chon6: t("chon_6_an_1", { ns: "all" }),
      chon7: t("chon_7_an_1", { ns: "all" }),
      chon8: t("chon_8_an_1", { ns: "all" }),
      chon9: t("chon_9_an_1", { ns: "all" }),
      chon10: t("chon_10_an_1", { ns: "all" }),
    },
    vipIcon: {
      "1": [iconV1_01, iconV1_02],
      "2": [iconV2_01, iconV2_02],
      "3": [iconV3_01, iconV3_02],
      "4": [iconV4_01, iconV4_02],
      "5": [iconV5_01, iconV5_02],
      "6": [iconV6_01, iconV6_02],
      "7": [iconV7_01, iconV7_02],
    },
  };
  return config;
};

export default Config;
// [
//   {
//       "name": "Số thường",
//       "list": [
//           {
//               "name": "Số thường",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "sothuong"
//           }
//       ]
//   },
//   {
//       "name": "Nhiều số",
//       "list": [
//           {
//               "name": "Trúng 4 số",
//               "tileCuoc": 1,
//               "tileTrathuong": 3,
//               "type": "4so"
//           },
//           {
//               "name": "Trúng 3 số",
//               "tileCuoc": 1,
//               "tileTrathuong": 12,
//               "type": "3so"
//           },
//           {
//               "name": "Trúng 2 số",
//               "tileCuoc": 1,
//               "tileTrathuong": 3,
//               "type": "2so"
//           }
//       ]
//   },
//   {
//       "name": "Lô trượt",
//       "list": [
//           {
//               "name": "Trượt xiên 5",
//               "tileCuoc": 1,
//               "tileTrathuong": 3,
//               "type": "truotxien5"
//           },
//           {
//               "name": "Trượt xiên 6",
//               "tileCuoc": 1,
//               "tileTrathuong": 4,
//               "type": "truotxien6"
//           },
//           {
//               "name": "Trượt xiên 7",
//               "tileCuoc": 1,
//               "tileTrathuong": 3,
//               "type": "truotxien7"
//           },
//           {
//               "name": "Trượt xiên 8",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "truotxien8"
//           },
//           {
//               "name": "Trượt xiên 9",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "truotxien9"
//           },
//           {
//               "name": "Trượt xiên 10",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "truotxien10"
//           }
//       ]
//   },
//   {
//       "name": "Chọn 1",
//       "list": [
//           {
//               "name": "Chọn 5 ăn 1",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "chon5"
//           },
//           {
//               "name": "Chọn 6 ăn 1",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "chon6"
//           },
//           {
//               "name": "Chọn 7 ăn 1",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "chon7"
//           },
//           {
//               "name": "Chọn 8 ăn 1",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "chon8"
//           },
//           {
//               "name": "Chọn 9 ăn 1",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "chon9"
//           },
//           {
//               "name": "Chọn 10 ăn 1",
//               "tileCuoc": 1,
//               "tileTrathuong": 2,
//               "type": "chon10"
//           }
//       ]
//   }
// ]
