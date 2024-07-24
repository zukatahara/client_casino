export interface OrderProps {
  value: string;
  price: number;
  tiLe: number;
  soNhan: number;
  type: string;
}

export interface OrderKenoProps {
  value: string;
  price: number;
  type: string;
}

export interface OrderMegaProps {
  so: string;
  sodiem: number;
  type: string;
  soNhan?: number;
}

export interface TileMega {
  name: string;
  list: {
    name: string;
    tileCuoc: number;
    tileTrathuong: number;
    type: string;
  }[];
}

export interface HistoryUserMega {
  id: number;
  username: string;
  ref?: any;
  cuoc: string;
  so: string;
  theloai: string;
  type: string;
  phien: string;
  thanhtoan: number;
  win: number;
  amount: number;
  date?: any;
  created_at: string;
  updated_at: string;
}