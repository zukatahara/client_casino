import homeApi from "@/apis/home.api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "@/contexts/app.context";
import "../styles/menu-bar.css";
import { ArrowUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { formatCurrency } from "@/utils/utils";
import { clearLS } from "@/utils/auth";
import RefreshMoney from "./refresh-money";
import { URL } from "@/constants/url";
import { NS } from "@/constants/ns";
import { useTranslation } from "react-i18next";

const NavBarMobile = () => {
  const { t } = useTranslation([NS["ALL"]]);

  const navigate = useNavigate();
  const { isAuthenticated, profile, reset } = useContext(AppContext);
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const handleLogout = () => {
    navigate("/");
    reset();
    clearLS();
  };
  // const logo = (logoData?.data.status && logoData.data.data[0]) || null;
  const logo = data?.data?.data?.logo_image || null;
  // const logo = null;
  return (
    <div
      className="md:hidden p-4 border-b border-[hsla(0,0%,100%,.08)] h-full flex items-center  shadow-sm gap-2 "
      style={{
        background: "url(/background/bg_header_mobile.jpg)",
        backgroundSize: "100% 100%",
      }}
    >
      {/* <MobileSidebar /> */}
      <div className="flex-1 max-w-[40%] ">
        <img
          src={`${URL.baseUrl}${logo}`}
          // src={`https://api.lv88bet.net/images/logov2-1721026478800.png`}
          alt=""
        />
      </div>

      <div className="ml-auto flex h-auto flex-shrink-0">
        {isAuthenticated && (
          <>
            <div className="moneyBox">
              <div className="money">
                <p>{profile?.username}</p>
                <p className="total_money">
                  {formatCurrency(profile?.money || 0)}
                </p>
              </div>
              <RefreshMoney />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between rightInfo">
                <span className="van-popover__wrapper">
                  <button className="recharge van-button van-button--warning van-button--normal">
                    <div className="van-button__content">
                      <span className="van-button__text">
                        {" "}
                        {t("so_tien", { ns: "all" })}
                      </span>
                      <ArrowUp className="van-icon van-icon-arrow-down arrowUp" />
                    </div>
                  </button>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white dark:bg-slate-500"
                align="end"
              >
                <DropdownMenuItem className="text-xs fundItem" asChild>
                  <Link to="/mobile/recharge">
                    <i className="iconfont icon-icon_fund_topup" />
                    {t("nap_tien", { ns: "all" })}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs fundItem" asChild>
                  <Link to="/mobile/withdraw">
                    <i className="iconfont icon-icon_fund_withdraw"></i>{" "}
                    {t("rut_tien", { ns: "all" })}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs fundItem"
                  onSelect={(event) => {
                    event.preventDefault();
                    handleLogout();
                  }}
                >
                  <i className="iconfont icon-icon_fault"></i>
                  {t("dang_xuat", { ns: "all" })}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {!isAuthenticated && (
          <div className="flex gap-2">
            <Link to={"/auth"}>
              <Button
                className="text-[#fff48e] border border-[#fff48e] p-3 rounded-sm text-[15px] !h-[32px] !font-extralight"
                // className="bg_button"
                variant={"ghost"}
              >
                {t("dang_nhap", { ns: "all" })}
              </Button>
            </Link>
            <Link to={"/auth"}>
              <Button
                className="rounded-sm text-[15px] p-3 h-[32px] !font-extralight"
                // className="bg_button"
                style={{
                  border: "none",
                  background: "linear-gradient(to top, #efa000, #fcef86)",
                }}
                variant={"ghost"}
              >
                {t("dang_ky", { ns: "all" })}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarMobile;
