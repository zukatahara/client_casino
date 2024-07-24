import http from "@/lib/http";
import { Agency } from "@/types/agency.type";
import { AuthResponse } from "src/types/auth.type";

const URL_PROGRAM = "/api/portal/agency/program";
const URL_REGISTER = "/api/portal/agency/list";

export interface RegisterBody {
  username: string;
  password: string;
  fullname: string;
  phone: string;
}

const agencyApi = {
  registerAgency(body: RegisterBody) {
    return http.post<AuthResponse>(URL_REGISTER, body);
  },

  getAgency() {
    return http.get<Agency>(URL_PROGRAM);
  },
};

export default agencyApi;
