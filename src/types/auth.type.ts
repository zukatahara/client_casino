import { SuccessResponse } from "./utils.type";

export type AuthResponse = SuccessResponse & {
  data: string;
};
