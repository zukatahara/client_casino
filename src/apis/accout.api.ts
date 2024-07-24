import http from "@/lib/http";
import { BalanceGame3 } from "@/types/game.type";

const URL_BALANCE = "/api/user/getBalance";
const URL_MONEY_PENDING = "/api/user/get-money-pending";
const URL_TOTAL_DEPOSIT = "/api/user/deposit/total";
const accountApi = {
  getBalance(params: any) {
    return http.get<{
      data: BalanceGame3[];
      status: boolean;
    }>(URL_BALANCE, { params });
  },
  getMoneyPending() {
    return http.get<any>(URL_MONEY_PENDING);
  },
  totalDeposit() {
    return http.get<any>(URL_TOTAL_DEPOSIT);
  },
  giftCode(code: string) {
    return http.post<{
      status: boolean;
      msg: string;
    }>("/api/user/gift-code", {
      giftCode: code,
    });
  },
};

export default accountApi;
