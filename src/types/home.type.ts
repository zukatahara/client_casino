export type Logo = {
  logo_image: string;
  logo_mobile: string;
  logo_form_mobile: string;
  favicon: string;
  popup_home_page: string;
};

export type NoticeHome = {
  id: number;
  "en-EN": string;
  "th-TH": string;
  "vi-VN": string;
  created_at: Date;
};

export type Vip = {
  id: number;
  title: string;
  month_reward: number;
  up_level_reward: number;
  week_reward: number;
  bet_amount: number;
  deposit_amount: number;
  level: number;
  birth_day_reward: number;
};

export type ResponseVip = {
  status: boolean;
  data: Vip[];
};
