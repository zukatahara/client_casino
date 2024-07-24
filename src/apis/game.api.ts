import http from "@/lib/http";
import { GameResponse } from "@/types/game.type";
import {
  BetHistory,
  BetHistoryConfig,
  LotteryResultConfig,
} from "@/types/bet.type";

const LIST_GAME_URL = `/api/user/listGame`;
const LAUNCH_GAME_URL = `/api/user/LaunchGame`;

export interface BodyLaunchGame {
  type: string;
  providercode: string;
  html5: string;
}

export interface HistoryGameLottery {
  id: number;
  phien: number;
  theloai: string;
  created_at: Date;
  gdb: string;
  g1: string;
  g2: string;
  g3: string;
  g4: string;
  g5: string;
  g6: string;
  g7: string;
  g8: string;
  pay: number;
  dauduoi: {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
  };
}

export interface HistoryGameSicbo {
  id: number;
  phien: string;
  theloai: string;
  ketqua: string;
  thanhtoan: number;
  changeby: string;
  created_at: string;
  updated_at: string;
}

export interface HistoryGameMega {
  id: number;
  phien: string;
  theloai: string;
  result: string;
  created_at: string;
  updated_at: string;
}

export interface HistoryGameKeno {
  id: number;
  phien: string;
  theloai: string;
  result: string;
  tong: number;
  taixiu: string;
  chanle: string;
  trenHoaDuoi: string;
  nguHanh: string;
  cuocGop: string;
  created_at: string;
  updated_at: string;
}

export const gameApi = {
  getListGame() {
    return http.get<GameResponse>(LIST_GAME_URL);
  },
  lauchGame(body: BodyLaunchGame) {
    return http.post<{
      errCode: number;
      errMsg: string | null;
      gameUrl: string;
      money?: number;
      status: boolean;
      type?: number;
    }>(LAUNCH_GAME_URL, { ...body });
  },
  getBetHistory(params: BetHistoryConfig) {
    return http.get<{
      status: boolean;
      data: {
        data: BetHistory[];
        total: number;
      };
      tongcuoc: number;
      tongthang: number;
    }>("/api/user/bet-history", {
      params,
    });
  },
  loginGame(body: { username: string; token: string }) {
    return http.post<{
      message: string;
      status: boolean;
      UID: string;
      token: string;
    }>("/api/v2/Login", body, {
      baseURL: "https://play.268bet.pro",
    });
  },
  getHistoryGameLottery(params: LotteryResultConfig) {
    return http.get<{
      status: boolean;
      data: {
        data: HistoryGameLottery[];
        total: number;
      };
    }>("/api/user/minigame/history/result", {
      params: {
        ...params,
        gameType: "lottery",
      },
    });
  },
  getHistoryGameSicbo(params: LotteryResultConfig) {
    return http.get<{
      status: boolean;
      data: {
        data: HistoryGameSicbo[];
        total: number;
      };
    }>("/api/user/minigame/history/result", {
      params: {
        ...params,
        gameType: "sicbo",
      },
    });
  },
  getHistoryGameMega(params: LotteryResultConfig) {
    return http.get<{
      status: boolean;
      data: {
        data: HistoryGameMega[];
        total: number;
      };
    }>("/api/user/minigame/history/result", {
      params: {
        ...params,
        gameType: "mega",
      },
    });
  },
  getHistoryGameKeno(params: LotteryResultConfig) {
    return http.get<{
      status: boolean;
      data: {
        data: HistoryGameKeno[];
        total: number;
      };
    }>("/api/user/minigame/history/result", {
      params: {
        ...params,
        gameType: "keno",
      },
    });
  },
};
