import http from "@/lib/http";
import { Message, MessageResponse, User } from "@/types/user.type";
import { AuthResponse } from "src/types/auth.type";

export const URL_LOGIN = "/api/user/login";
export const URL_REGISTER = "/api/user/register";
export const URL_CHANGE_PASSWORD = "/api/user/change_password";
export const URL_PROFILE = "api/user/userInfo";
export const URL_CHANGE_PASSWORD_WITHDRAW =
  "/api/user/change/password-transaction";
export const URL_ADD_BANK = "/api/user/addbanking";
export const URL_GET_BANK_LIST = "api/user/list/bank";
export const URL_GET_BANK_LIST_CHARGE = "/api/user/listbank";
export const URL_CHARGE = "/api/user/deposit";
const URL_LIST_TRANSACTION = "/api/user/deposit/history";
const URL_LIST_TRANSACTION2 = "/api/user/transaction";
import { ChargeHistoryConfig } from "@/types/bet.type";

export interface RegisterBody {
  username: string;
  password: string;
  re_password: string;
  fullname: string;
  sdt: string;
  invite?: string;
  key?: string;
}

const authApi = {
  registerAccount(body: RegisterBody) {
    return http.post<AuthResponse>(URL_REGISTER, body);
  },
  login(body: { username: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  getProfile() {
    return http.get<User>(URL_PROFILE);
  },
  changePassword(body: { newPassword: string; passwordOld: string }) {
    return http.put<{
      msg: string;
      status: boolean;
    }>(URL_CHANGE_PASSWORD, body);
  },
  changePasswordWithdraw(body: {
    newPassword: string;
    password_user?: string | undefined;
    type: boolean;
  }) {
    return http.put<{
      msg: string;
      status: boolean;
    }>(URL_CHANGE_PASSWORD_WITHDRAW, body);
  },
  addBank(body: { nameuser: string; nameBank: string; stk: string }) {
    return http.post<{
      msg: string;
      status: boolean;
    }>(URL_ADD_BANK, body);
  },
  getBankList() {
    return http.get<{
      status: boolean;
      data: {
        title: string;
      }[];
    }>(URL_GET_BANK_LIST);
  },
  getListBankCharge() {
    return http.get<{
      status: boolean;
      data: {
        bank: string;
        bank_account: string;
        bank_number: string;
        created_at: Date;
        id: number;
        qr_code: string;
        status: number;
        logo?: string;
      }[];
    }>(URL_GET_BANK_LIST_CHARGE);
  },
  charge(body: {
    money: number;
    noidung: string;
    namebank: string;
    km?: string;
    chutk: string;
    stk: string;
  }) {
    return http.post<{
      msg: string;
      status: boolean;
    }>(URL_CHARGE, body);
  },
  withdraw(body: { money: number; password: string }) {
    return http.post<{
      msg: string;
      status: boolean;
    }>("/api/user/withdraw", body);
  },
  getListTransaction() {
    return http.get<{
      status: boolean;
      data: {
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
        status: 0;
        id_deposit: null;
        admin: null;
        created_at: Date;
        updated_at: Date;
      }[];
    }>(URL_LIST_TRANSACTION);
  },
  getListTransaction2(params: ChargeHistoryConfig) {
    return http.get<any>(URL_LIST_TRANSACTION2, {
      params,
    });
  },
  getListCharge(params: ChargeHistoryConfig) {
    return http.get<{
      status: boolean;
      data: {
        count: number;
        rows: {
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
          status: 0;
          id_deposit: null;
          admin: null;
          created_at: Date;
          updated_at: Date;
        }[];
      };
    }>(URL_LIST_TRANSACTION, {
      params,
    });
  },
  getWithdrawHistory() {
    return http.get<{
      status: boolean;
      data: {
        count: number;
        rows: {
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
          status: 0;
          id_deposit: null;
          admin: null;
          created_at: Date;
          updated_at: Date;
        }[];
      };
    }>("/api/user/withdraw/history");
  },
  refresh() {
    return http.post<{
      money: number;
    }>("/api/user/refresh");
  },
  getListNotice() {
    return http.get<MessageResponse<Message>>("/api/user/notification/all");
  },
  getListMessage() {
    return http.get<MessageResponse<Message>>(
      "/api/user/notification/optional"
    );
  },
  readMessage(id: number) {
    return http.put(`/api/user/notification/optional/${id}`);
  },
  genQRCode(body: {
    stk: string;
    chutk: string;
    namebank: string;
    money: number;
    noidung: string;
  }) {
    return http.post<{
      status: boolean;
      qr_code: string;
    }>("/api/user/gen-qr-code", body);
  },

  getRefundHistory(params: ChargeHistoryConfig) {
    return http.get<{
      status: boolean;
      data: {
        count: number;
        rows: {
          id: number;
          username: string;
          amount: number;
          provider_code: string;
          total_bet: number;
          created_at: Date;
          from: Date;
          to: Date;
        }[];
      };
    }>("/api/user/refund/history", {
      params,
    });
  },
  getVipAwardHistory(params: ChargeHistoryConfig) {
    return http.get<{
      status: boolean;
      data: {
        count: number;
        rows: {
          id: number;
          username: string;
          amount: number;
          level: number;
          type: string;
          created_at: Date;
        }[];
      };
    }>("/api/user/vip-award", {
      params,
    });
  },
};

export default authApi;
