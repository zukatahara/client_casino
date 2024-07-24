import http from "@/lib/http";
const PRIZE_LIST_URL = "/api/user/playprize/list";
const PRIZE_URL = "/api/user/playprize";
const COUNT_PRIZR_URL = "/api/user/playprize/count";
const HISTORY_PRIZE = "/api/user/playprize/history";

const prizeApi = {
  getPrizeList() {
    return http.get<{
      status: boolean;
      data: any;
    }>(PRIZE_LIST_URL);
  },
  getPrize() {
    return http.get<{
      status: boolean;
      index: number;
    }>(PRIZE_URL);
  },
  countPrize() {
    return http.get<{}>(COUNT_PRIZR_URL);
  },
  historyPrize(page: number, limit: number) {
    return http.get<{}>(`${HISTORY_PRIZE}?page=${page}&limit=${limit}`);
  },
};
export default prizeApi;
