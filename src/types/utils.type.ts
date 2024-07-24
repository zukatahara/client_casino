import { ToastActionElement, ToastProps } from "@/components/ui/toast";

export interface SuccessResponse {
  msg: string;
  status: boolean;
  msg2: string;
  data?: any;
  errCode: number;
}
export interface ErrorResponse {
  msg: string;
  status: false;
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};
