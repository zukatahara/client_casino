import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { UserAvatar } from "./user-avatar";
import { ReactNode, useContext } from "react";
import { AppContext } from "@/contexts/app.context";
import {
  formatCurrency,
  // tinhKhoangThoiGian,
  useTinhKhoangThoiGian,
} from "@/utils/utils";
import RefreshMoney from "./refresh-money";
import iconTopup from "@/assets/images/icon-topup.b7d5be80.svg";
import iconWithdraw from "@/assets/images/icon-withdraw.7122f604.svg";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: ReactNode;
  }[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const { t, i18n } = useTranslation([NS["ALL"]]);
  const { tinhKhoangThoiGian001 } = useTinhKhoangThoiGian();
  const location = useLocation();
  const pathname = location.pathname;
  const { profile } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <Card
        style={{
          backgroundImage: "linear-gradient(137deg,#a98fff 1%,#4a69ff 99%)",
        }}
        className="h-44 w-full mb-4 flex flex-col justify-center items-center space-y-2"
      >
        <div className="relative">
          {profile?.level && Number(profile?.level) > 0 ? (
            <img
              className="absolute bottom-[-3px] right-[0px] z-[2] w-8 object-contain"
              src={`${URL.baseUrl}${profile?.vipInfo?.logo}`}
              alt=""
            />
          ) : (
            ""
          )}
          <UserAvatar className="h-20 w-20" />
        </div>
        <div className="text-base text-slate-50 flex gap-2">
          {profile?.level && Number(profile?.level) > 0 ? (
            <img
              className="w-16 object-contain"
              src={`${URL.baseUrl}${profile?.vipInfo?.logo2}`}
              alt=""
            />
          ) : (
            ""
          )}
          <span>{profile?.username}</span>
        </div>
        <div className="text-xs text-[hsla(0,0%,100%,.65)]">
          {t("gia_nhap", { ns: "all" })}{" "}
          {tinhKhoangThoiGian001(
            profile?.created_at || new Date(),
            i18n.language
          )}
        </div>
      </Card>
      <Card className="border-slate-50 dark:border-slate-700">
        <div className="w-full h-32 border-b border-slate-300 flex justify-start items-start p-4 flex-col">
          <div className="text-base text-slate-400">
            {t("tong_so_du", { ns: "all" })}:
          </div>
          <div className="text-xs text-yellow-500">
            {formatCurrency(profile?.money as number) || 0}
            <RefreshMoney className="ml-2" />
          </div>
          <div className="space-x-2 mt-2">
            <nav data-v-706d3717 className="userNav">
              <Link to={"/settings/charge"}>
                <button
                  data-v-706d3717
                  type="button"
                  className="el-button el-button--default btn-charge"
                >
                  <span>
                    <img
                      data-v-706d3717
                      // src="https://www.xoso66.me/home/static/img/icon-topup.b7d5be80.svg"
                      src={iconTopup}
                      alt=""
                    />
                    <span data-v-706d3717> {t("nap_tien", { ns: "all" })}</span>
                  </span>
                </button>
              </Link>
              {/* <button
                data-v-706d3717
                type="button"
                className="el-button el-button--default btn-myPurse"
              >
                <span>
                  <img
                    data-v-706d3717
                    src="https://www.xoso66.me/home/static/img/icon-wallet.54c179e8.svg"
                    alt=""
                  />
                  <span data-v-706d3717>Chuyển quỹ</span>
                </span>
              </button> */}
              <Link to={"/settings/draw"}>
                <button
                  data-v-706d3717
                  type="button"
                  className="el-button el-button--default btn-draw"
                >
                  <span>
                    <img
                      data-v-706d3717
                      // src="https://www.xoso66.me/home/static/img/icon-withdraw.7122f604.svg"
                      src={iconWithdraw}
                      alt=""
                    />
                    <span data-v-706d3717>{t("rut_tien", { ns: "all" })}</span>
                  </span>
                </button>
              </Link>
            </nav>
          </div>
        </div>
        <ul role="menubar" className="el-menu">
          {items.map((item) => (
            <li
              role="menuitem"
              tabIndex={-1}
              className={cn(
                "el-menu-item menuItem flex items-center",
                pathname === item.href ? "active" : ""
              )}
              style={{ paddingLeft: 20 }}
              onClick={() => navigate(item.href)}
              key={item.href}
            >
              {item.icon}
              {pathname === item.href && <span className="themeActiveBar" />}
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
