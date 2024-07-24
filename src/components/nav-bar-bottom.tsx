import { Link } from "react-router-dom";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { GiTakeMyMoney } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const NavBarBottom = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const pathname = window.location.pathname;
  return (
    <div className="md:hidden p-2 border-b w-full flex items-center bg-[#1b233d] shadow-sm fixed bottom-0 inset-x-0 z-50 h-14">
      <div className="w-full grid grid-cols-5">
        <Link to={"/"}>
          <div
            className={cn(
              "flex flex-col justify-center items-center text-center",
              pathname === "/" ? "active" : ""
            )}
          >
            {Icons.game2}
            <span className="text-xs text-[#90a2dc]">
              {t("tro_choi", { ns: "all" })}
            </span>
          </div>
        </Link>
        <Link
          to={"/mobile/recharge"}
          className={cn(
            "flex flex-col justify-center items-center text-center",
            pathname === "/mobile/recharge" ? "active" : ""
          )}
        >
          {pathname === "/mobile/recharge" ? (
            <img
              className="w-[30px] h-[30px]"
              src={"/common/deposit-active.png"}
              alt=""
            />
          ) : (
            <img
              className="w-[30px] h-[30px]"
              src={"/common/deposit.png"}
              alt=""
            />
          )}
          <span className="text-xs text-[#90a2dc]">
            {t("nap_tien", { ns: "all" })}
          </span>
        </Link>
        {/* <Link to={"/mobile/betting-record"}>
          <div
            className={cn(
              "flex flex-col justify-center items-center text-center",
              pathname === "/mobile/betting-record" ? "active" : ""
            )}
          >
            {Icons.history2}
            <span className="text-xs text-[#90a2dc]">Lịch sử</span>
          </div>
        </Link> */}
        {/* <Link
          target="_blank"
          to={`${setting?.link_cskh}`}
          className="flex flex-col justify-center items-center text-center"
        >
          {Icons.chat}
          <span className="text-xs text-[#90a2dc]">Phòng chat</span>
        </Link> */}

        <Link to={"/mobile/withdraw"}>
          <div
            className={cn(
              "flex flex-col justify-center items-center text-center",
              pathname === "/mobile/withdraw" ? "active" : ""
            )}
          >
            <GiTakeMyMoney
              className={`w-[30px] h-[30px] text-[${
                pathname === "/mobile/withdraw" ? "#8275ff" : "#90a2dc"
              }]`}
              style={{
                color: pathname === "/mobile/withdraw" ? "#8275ff" : "#90a2dc",
              }}
            />
            <span className="text-xs text-[#90a2dc]">
              {t("rut_tien", { ns: "all" })}
            </span>
          </div>
        </Link>
        <Link to={"/mobile/discount"}>
          <div
            className={cn(
              "flex flex-col justify-center items-center text-center",
              pathname === "/mobile/discount" ? "active" : ""
            )}
          >
            {pathname === "/mobile/discount" ? (
              <img
                className="w-[30px] h-[30px]"
                src={"/common/voucher-active.png"}
                alt=""
              />
            ) : (
              <img
                className="w-[30px] h-[30px]"
                src={"/common/voucher.png"}
                alt=""
              />
            )}
            <span
              className="text-xs text-[#90a2dc]"
              style={{
                // @ts-ignore
                textWrap: "nowrap",
              }}
            >
              {t("uu_dai", { ns: "all" })}
            </span>
          </div>
        </Link>
        <Link to={"/mobile/profile"}>
          <div
            className={cn(
              "flex flex-col justify-center items-center text-center",
              pathname === "/mobile/profile" ? "active" : ""
            )}
          >
            {Icons.user3}
            <span className="text-xs text-[#90a2dc]">
              {t("cua_toi", { ns: "all" })}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBarBottom;
