export interface Discount {
  id: number;
  title: string;
  sub_title: string;
  link: string;
  noidung: string;
  times_get_max: number;
  money_get: number;
  money_min_get: number;
  money_max_get: number;
  phantram: number;
  vongcuoc: number;
  status: number;
  danhmuc: string;
  start: Date;
  end: Date;
  image: string;
  created_at: Date;
}
