export interface BetHistory {
  id: number;
  username: string;
  ref: any;
  cuoc: string;
  so: string;
  theloai: string;
  type: string;
  phien: string;
  thanhtoan: number;
  win: number;
  amount: number;
  date: any;
  created_at: string;
  updated_at: string;
  money: number;
  cuadat: string;

  id_bet: number;
  site: string;
  product: string;
  member: string;
  match_time: string;
  bet: number;
  payout: number;
  status: number;
}

export interface ChargeHistory {
  id: number;
  username: string;
  id_txn: string;
  amount: number;
  request_id: number;
  bank: string;
  bank_number: string;
  bank_account: string;
  qr_url: string;
  description: string;
  id_km: null;
  status_km: 0;
  type: string;
  ref: null;
  status: number;
  id_deposit: null;
  admin: null;
  created_at: Date;
  updated_at: Date;
}

export interface BetLotteryHistory {
  id: number;
  username: string;
  ref: any;
  cuoc: string;
  so: string;
  theloai: string;
  type: string;
  phien: string;
  thanhtoan: number;
  win: number;
  amount: number;
  date: any;
  created_at: string;
  updated_at: string;
}

export interface BetHistoryConfig {
  startDate?: Date;
  endDate?: Date;
  type?: string;
  providercode?: string;
  gameType?: string;
  page?: number;
}

export interface ChargeHistoryConfig {
  startDate?: Date;
  endDate?: Date;
  page?: number;
}

export interface LotteryResultConfig {
  startDate?: string;
  endDate?: string;
  type?: string;
  gameType?: string;
  page?: number;
}

export interface VipAwardHistory {
  id: number;
  username: string;
  amount: number;
  level: number;
  type: string;
  created_at: Date;
}

export interface RefundHistory {
  id: number;
  username: string;
  amount: number;
  provider_code: string;
  total_bet: number;
  created_at: Date;
  from: Date;
  to: Date;
}
