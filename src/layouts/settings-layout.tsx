import { SidebarNav } from "@/components/sidebar-nav";
import TradeHistory from "@/components/trade-history";
import { Card } from "@/components/ui/card";
import WithdrawHistory from "@/components/withdraw-history";
import { NS } from "@/constants/ns";
import { cn } from "@/lib/utils";
import { FileClock, History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { t } = useTranslation([NS["ALL"]]);
  const location = useLocation();
  const pathname = location.pathname;
  const sidebarNavItems = [
    {
      title: t("thong_tin_ca_nhan", { ns: "all" }),
      href: "/settings",
      icon: <i className="iconfont menuIcon icon-icon_personal_data"></i>,
    },
    {
      title: t("chuyen_quy", { ns: "all" }),
      href: "/settings/my-purse",
      icon: <i className="iconfont menuIcon icon-icon_my_wallet_nor"></i>,
    },
    {
      title: t("lich_su_cuoc", { ns: "all" }),
      href: "/settings/bet-history",
      icon: <i className="iconfont menuIcon icon-icon_stake"></i>,
    },
    {
      title: t("lich_su_hoan_tra", { ns: "all" }),
      href: "/settings/bet-refund-history",
      icon: <FileClock className="w-5 h-5  mr-3" />,
    },
    {
      title: t("thuong_vip", { ns: "all" }),
      href: "/settings/vip-history",
      icon: <History className="w-5 h-5  mr-3" />,
    },
    {
      title: t("chi_tiet_giao_dich", { ns: "all" }),
      href: "/settings/capital-history",
      icon: <i className="iconfont menuIcon icon-icon_funds_details_nor"></i>,
    },
    {
      title: t("hom_thu", { ns: "all" }),
      href: "/settings/message",
      icon: (
        <i className="iconfont menuIcon activeColor icon-icon_message_centre"></i>
      ),
    },
    {
      title: t("trung_tam_tro_giup", { ns: "all" }),
      href: "/help",
      icon: <i className="iconfont menuIcon icon-icon_help_centre"></i>,
    },
    {
      title: t("ket_qua_mo_thuong", { ns: "all" }),
      href: "/settings/lottery-result",
      icon: <i className="iconfont menuIcon icon-icon_draw_notice"></i>,
    },
  ];
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block container max-w-[95%] mx-auto">
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          <aside className="w-[250px] mr-2">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <Card
            className={cn(
              "border-slate-50 dark:border-slate-700 p-6",
              pathname === "/settings/charge" || pathname === "/settings/draw"
                ? "w-2/3"
                : "w-4/5"
            )}
          >
            {children}
          </Card>
          {pathname === "/settings/charge" && <TradeHistory />}
          {pathname === "/settings/draw" && <WithdrawHistory />}
        </div>
      </div>
    </>
  );
}
