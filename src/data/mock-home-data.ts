// Mock data for home page components based on target website

export interface MockLotteryItem {
  id: number;
  name: string;
  icon: string;
  series_id: number;
  extra: {
    playinfo: Array<{ name: string; play_page_id?: number }>;
    bet_amount?: number;
    min_odds?: number;
    max_odds?: number;
  };
  open_result?: {
    sumTotal?: number;
    bigSmall?: { name: string; result: string; value?: number };
    oddEven?: { name: string; result: string };
    upDown?: { name: string; result: string };
    fiveElements?: { name: string; result: string };
    redGreenViolet?: { name: string; result: string; value?: string };
  };
  open_numbers_formatted?: string[];
  phien?: string;
  time?: number;
}

export const mockLatestLottery: MockLotteryItem[] = [
  // Sicbo 20 giây
  {
    id: 20,
    name: "Sicbo 20 giây",
    icon: "/assets/images/lottery_logo/sicbo/icon/SICBO20.png",
    series_id: 7,
    extra: {
      playinfo: [
        { name: "Kèo đôi", play_page_id: 1 },
        { name: "Tổng", play_page_id: 2 },
        { name: "Số Đơn", play_page_id: 3 },
      ],
    },
    open_result: {
      sumTotal: 12,
      bigSmall: { name: "Tài", result: "big", value: 12 },
      oddEven: { name: "Chẵn", result: "even" },
    },
    open_numbers_formatted: ["6", "1", "1"],
    time: 20,
  },
  // Sicbo 30 giây
  {
    id: 30,
    name: "Sicbo 30 giây",
    icon: "/assets/images/lottery_logo/sicbo/icon/SICBO30.png",
    series_id: 7,
    extra: {
      playinfo: [
        { name: "Kèo đôi", play_page_id: 1 },
        { name: "Tổng", play_page_id: 2 },
        { name: "Số Đơn", play_page_id: 3 },
      ],
    },
    open_result: {
      sumTotal: 9,
      bigSmall: { name: "Xỉu", result: "small", value: 9 },
      oddEven: { name: "Lẻ", result: "odd" },
    },
    open_numbers_formatted: ["6", "1", "1"],
    time: 30,
  },
  // Miền Nam VIP 45 giây
  {
    id: 45,
    name: "Miền Nam VIP 45 giây",
    icon: "/xoso/45.png",
    series_id: 1,
    extra: {
      playinfo: [
        { name: "2D end", play_page_id: 1 },
        { name: "2D 1K", play_page_id: 2 },
        { name: "3D end", play_page_id: 3 },
      ],
    },
    open_numbers_formatted: ["7", "2", "8", "5", "0", "0"],
    time: 45,
  },
  // Miền Nam VIP 1 phút
  {
    id: 60,
    name: "Miền Nam VIP 1 phút",
    icon: "/xoso/60.png",
    series_id: 1,
    extra: {
      playinfo: [
        { name: "2D end", play_page_id: 1 },
        { name: "2D 1K", play_page_id: 2 },
        { name: "3D end", play_page_id: 3 },
      ],
    },
    open_numbers_formatted: ["1", "4", "3", "2", "3", "0"],
    time: 60,
  },
  // Miền Nam VIP 90 giây
  {
    id: 90,
    name: "Miền Nam VIP 90 giây",
    icon: "/xoso/90.png",
    series_id: 1,
    extra: {
      playinfo: [
        { name: "2D end", play_page_id: 1 },
        { name: "2D 1K", play_page_id: 2 },
        { name: "3D end", play_page_id: 3 },
      ],
    },
    open_numbers_formatted: ["7", "9", "4", "5", "4", "3"],
    time: 90,
  },
  // Miền Nam VIP 2 phút
  {
    id: 120,
    name: "Miền Nam VIP 2 phút",
    icon: "/xoso/120.png",
    series_id: 1,
    extra: {
      playinfo: [
        { name: "2D end", play_page_id: 1 },
        { name: "2D 1K", play_page_id: 2 },
        { name: "3D end", play_page_id: 3 },
      ],
    },
    open_numbers_formatted: ["2", "0", "0", "3", "8", "6"],
    time: 120,
  },
];

import { Game } from "@/types/game.type";

export type MockGame = Partial<Game> & {
  id: number;
  title: string;
  type: string;
  images_pc: string;
  icon1?: string;
  icon2?: string;
  providercode: string;
  percent: number;
};

export const mockLiveGames: MockGame[] = [
  {
    id: 1,
    title: "AE SEXY REALITY",
    type: "LC",
    images_pc: "/assets/games/thirdgame/imgs/pc/live/croupier/ae.png",
    icon1: "/assets/games/thirdgame/imgs/pc/live/foreground/ae.png",
    icon2: "/assets/games/thirdgame/imgs/platform_logo/long/ae.png",
    providercode: "ae",
    percent: 1.2,
  },
  {
    id: 2,
    title: "DB CASINO",
    type: "LC",
    images_pc: "/assets/games/thirdgame/imgs/pc/live/croupier/db.png",
    icon1: "/assets/games/thirdgame/imgs/pc/live/foreground/db.png",
    icon2: "/assets/games/thirdgame/imgs/platform_logo/long/db.png",
    providercode: "db",
    percent: 1.2,
  },
  {
    id: 3,
    title: "DG CASINO",
    type: "LC",
    images_pc: "/assets/games/thirdgame/imgs/pc/live/croupier/dg.png",
    icon1: "/assets/games/thirdgame/imgs/pc/live/foreground/dg.png",
    icon2: "/assets/games/thirdgame/imgs/platform_logo/long/dg.png",
    providercode: "dg",
    percent: 1.2,
  },
  {
    id: 4,
    title: "WM CASINO",
    type: "LC",
    images_pc: "/assets/games/thirdgame/imgs/pc/live/croupier/wm.png",
    icon1: "/assets/games/thirdgame/imgs/pc/live/foreground/wm.png",
    icon2: "/assets/games/thirdgame/imgs/platform_logo/long/wm.png",
    providercode: "wm",
    percent: 1.2,
  },
];

export const mockSportsGames: MockGame[] = [
  {
    id: 1,
    title: "FB SPORTS",
    type: "SB",
    images_pc: "/assets/games/thirdgame/imgs/pc/sports/athlete/fbsports.png",
    icon2: "/assets/games/thirdgame/imgs/platform_logo/long/fbsports.png",
    providercode: "fbsports",
    percent: 1.5,
  },
  {
    id: 2,
    title: "SABA Sports",
    type: "SB",
    images_pc: "/assets/games/thirdgame/imgs/pc/sports/athlete/sabasports.png",
    icon2: "/assets/games/thirdgame/imgs/platform_logo/long/saba.png",
    providercode: "saba",
    percent: 1.5,
  },
  {
    id: 3,
    title: "CMD THỂ THAO",
    type: "SB",
    images_pc: "/assets/games/thirdgame/imgs/pc/sports/athlete/cmd.png",
    icon2: "/assets/games/thirdgame/imgs/platform_logo/long/cmd.png",
    providercode: "cmd",
    percent: 1.5,
  },
];
