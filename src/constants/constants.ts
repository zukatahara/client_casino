import { useTranslation } from "react-i18next";
import { NS } from "./ns";
const customHook = () => {
  const { t } = useTranslation([NS["ALL"]]);
  return t;
};
export const useColorList = (t: any) => {
  t = t || customHook();

  const colorList = [
    [
      {
        id: "tai",
        label: t("tai", { ns: "all" }),
        color: "red",
      },
      {
        id: "xiu",
        label: t("xiu", { ns: "all" }),
        color: "blue",
      },
    ],
    [
      {
        id: "le",
        label: t("le", { ns: "all" }),
        color: "red",
      },
      {
        id: "chan",
        label: t("chan", { ns: "all" }),
        color: "blue",
      },
    ],
    [
      {
        id: "duoi",
        label: t("duoi", { ns: "all" }),
        color: "blue",
      },
      {
        id: "hoa",
        label: t("hoa", { ns: "all" }),
        color: "gray",
      },
      {
        id: "tren",
        label: t("tren", { ns: "all" }),
        color: "red",
      },
    ],
    [
      {
        id: "kim",
        label: t("kim", { ns: "all" }),
        color: "yellow",
      },
      {
        id: "moc",
        label: t("moc", { ns: "all" }),
        color: "green",
      },
      {
        id: "thuy",
        label: t("thuy", { ns: "all" }),
        color: "blue",
      },
      {
        id: "nh_hoa",
        label: t("hoa_hoa", { ns: "all" }),
        color: "red",
      },
      {
        id: "tho",
        label: t("tho", { ns: "all" }),
        color: "brown",
      },
    ],
    [
      {
        id: "tai_chan",
        label: t("tai_chan", { ns: "all" }),
        color: "red",
      },
      {
        id: "tai_le",
        label: t("tai_le", { ns: "all" }),
        color: "red",
      },
      { id: "xiu_chan", label: t("xiu_chan", { ns: "all" }), color: "red" },
      { id: "xiu_le", label: t("xiu_le", { ns: "all" }), color: "red" },
    ],
  ];
  return colorList;
};
export const colorList = [
  [
    {
      id: "tai",
      label: "Tài",
      color: "red",
    },
    {
      id: "xiu",
      label: "Xỉu",
      color: "blue",
    },
  ],
  [
    {
      id: "le",
      label: "Lẻ",
      color: "red",
    },
    {
      id: "chan",
      label: "Chẵn",
      color: "blue",
    },
  ],
  [
    {
      id: "duoi",
      label: "Dưới",
      color: "blue",
    },
    {
      id: "hoa",
      label: "Hoà",
      color: "gray",
    },
    {
      id: "tren",
      label: "Trên",
      color: "red",
    },
  ],
  [
    {
      id: "kim",
      label: "Kim",
      color: "yellow",
    },
    {
      id: "moc",
      label: "Mộc",
      color: "green",
    },
    {
      id: "thuy",
      label: "Thuỷ",
      color: "blue",
    },
    {
      id: "nh_hoa",
      label: "Hoả",
      color: "red",
    },
    {
      id: "tho",
      label: "Thổ",
      color: "brown",
    },
  ],
  [
    {
      id: "tai_chan",
      label: "Tài Chẵn",
      color: "red",
    },
    {
      id: "tai_le",
      label: "Tài Lẻ",
      color: "red",
    },
    { id: "xiu_chan", label: "Xỉu Chẵn", color: "red" },
    { id: "xiu_le", label: "Xỉu Lẻ", color: "red" },
  ],
];

export function findLabelsById(id: any) {
  // const colorList = useColorList(t);
  const matchingSet = colorList.find((item) =>
    item.some((subItem) => subItem.id === id)
  );

  return matchingSet
    ? matchingSet.find((subItem) => subItem.id === id)?.label
    : null;
}

export function findItemInColorListById(id: string) {
  const matchingSet = colorList.find((item) =>
    item.some((subItem) => subItem.id === id)
  );

  return matchingSet ? matchingSet.find((subItem) => subItem.id === id) : null;
}

export const soNhan = {
  xsmn: {
    lo2: 18,
    lo2so1k: 1,
    lo2sodau: 16,
    lo3so: 17,
    lo4so: 16,
    "3cang": 1,
    "3cangg1": 1,
    cang4: 1,
    dau: 1,
    daude: 1,
    daude1: 1,
    de: 1,
    de1: 1,
    de7: 1,
    ds_soba_keo_doi: 1,
    ds_soba_so_don: 1,
    ds_sobon_keo_doi: 1,
    ds_sobon_so_don: 1,
    ds_sodau_keo_doi: 1,
    ds_sodau_so_don: 1,
    ds_sohai_keo_doi: 1,
    ds_sohai_so_don: 1,
    ds_sonam_keo_doi: 1,
    ds_sonam_so_don: 1,
    ds_tong: 1,
    duoi: 1,
    thuvi_keo_doi: 1,
    thuvi_so_don: 1,
    truotxien4: 1,
    truotxien8: 1,
    truotxien10: 1,
    xien2: 1,
    xien3: 1,
    xien4: 1,
  },
  xsmb: {
    lo2: 27,
    lo2so1k: 1,
    lo2sodau: 23,
    lo3so: 23,
    lo4so: 20,
    "3cang": 1,
    "3cangg1": 1,
    cang4: 1,
    dau: 1,
    daude: 1,
    daude1: 1,
    de: 1,
    de1: 1,
    de7: 4,
    ds_soba_keo_doi: 1,
    ds_soba_so_don: 1,
    ds_sobon_keo_doi: 1,
    ds_sobon_so_don: 1,
    ds_sodau_keo_doi: 1,
    ds_sodau_so_don: 1,
    ds_sohai_keo_doi: 1,
    ds_sohai_so_don: 1,
    ds_sonam_keo_doi: 1,
    ds_sonam_so_don: 1,
    ds_tong: 1,
    duoi: 1,
    thuvi_keo_doi: 1,
    thuvi_so_don: 1,
    truotxien4: 1,
    truotxien8: 1,
    truotxien10: 1,
    xien2: 1,
    xien3: 1,
    xien4: 1,
  },
};

export const listTypeGame = {
  LC: "Live Casino",
  SL: "Nổ hũ",
  FH: "Bắn cá",
  CB: "Game bài",
  SB: "Thể thao",
  OT: "Game khác",
};
