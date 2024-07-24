import { NS } from "@/constants/ns";
import home from "./home.json";
import common from "./common.json";
import lottery from "./lottery.json";
import charge from "./settings/charge.json";
import withdraw from "./settings/withdraw.json";
import config from "./config.json";
import ui from "./ui.json";
import profile from "./settings/profile.json";
import msgApi from "./msgApi.json";
import mega from "./mega.json";
import sicbo from "./sicbo.json";
import all from "./all.json";
import myPurse from "./my_purse.json";
import betHistory from "./bet_history.json";
import betRefund from "./bet_refund.json";
import vip from "./vip.json";
import keno from "./keno.json";
import sideNavGame from "./sideNavGame.json";
import lotteryResult from "./lottery_result.json";
export default {
  [NS.lottery]: lottery,
  [NS.charge]: charge,
  [NS.withdraw]: withdraw,
  [NS.config]: config,
  [NS.ui]: ui,
  [NS.HOME]: home,
  [NS.COMMON]: common,
  [NS.profile]: profile,
  [NS.msgApi]: msgApi,
  [NS.mega]: mega,
  [NS.ALL]: all,
  [NS.myPurse]: myPurse,
  [NS.betHistory]: betHistory,
  [NS.sicbo]: sicbo,
  [NS.betRefund]: betRefund,
  [NS.vip]: vip,
  [NS.keno]: keno,
  [NS.sideNavGame]: sideNavGame,
  [NS.lotteryResult]: lotteryResult,
};
