export type Game = {
  id: number;
  title: string;
  providercode: string;
  logo: string;
  icon1: string;
  icon2: string;
  images_pc: string;
  images_mobile: string;
  type: string;
  gameid: string;
  status: number;
  type_logo: number;
  create_at: Date;
  percent: number;
};

export type GameResponse = {
  data: {
    listProvidercode: { title: string; providercode: string }[];
    listTypeGame: { title: string; type: string }[];
    data: Game[];
  };
  status: boolean;
};

export interface BalanceGame3 {
  errCode: string;
  balance: number;
  errMsg: string;
  providercode: string;
  icon_logo: string;
  title: string;
}
