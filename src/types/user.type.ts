export interface User {
  id: number;
  fullname: string;
  phone: string;
  username: string;
  money: number;
  money_bet: number;
  coin: number;
  spin_number: number;
  status: number;
  bank_name: string;
  bank_number: string;
  bank_user: string;
  level: string;
  khoacuoc: 0;
  invite: string;
  created_at: Date;
  time: string;
  totalWinLose: 0;
  isPWV2: true;
  avatar: string;
  vipInfo?: {
    logo: string;
    logo2: string;
  };
}

export interface MessageResponse<T> {
  status: boolean;
  data: Data<T>;
}

export interface Data<T> {
  total: number;
  data: T[];
  countUnread?: number;
}

export interface Message {
  id: number;
  title: string;
  content: string;
  "title_en-EN": string;
  "content_en-EN": string;
  "title_vi-VN": string;
  "content_vi-VN": string;
  "title_th-TH": string;
  "content_th-TH": string;
  type: string;
  username: string;
  admin: string;
  readed: number;
  status: number;
  created_at: string;
  updated_at: string;
}
