import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { NS } from "@/constants/ns";
import { URL } from "@/constants/url";
import { AppContext } from "@/contexts/app.context";
import { User } from "@/types/user.type";
import { clearLS } from "@/utils/auth";
import { formatCurrency } from "@/utils/utils";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "username" | "money" | "level">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { t } = useTranslation([NS["ALL"]]);
  // {t("khong_co_lich_su", { ns: "all" })}
  const { reset, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    reset();
    clearLS();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between">
        <div className="relative">
          {user?.level && Number(user?.level) > 0 ? (
            <img
              className="absolute bottom-[-4px] right-[2px] z-50 w-7"
              src={`${URL.baseUrl}${profile?.vipInfo?.logo}`}
              alt=""
            />
          ) : (
            ""
          )}
          <UserAvatar className="h-10 w-10 mr-3" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-slate-500 dark:text-slate-200 flex gap-2">
            {user?.level && Number(user?.level) > 0 ? (
              <img
                className="w-14 object-contain"
                src={`${URL.baseUrl}${profile?.vipInfo?.logo2}`}
                alt=""
              />
            ) : (
              ""
            )}{" "}
            {user.username}
          </span>
          <span className="text-base text-yellow-500">
            {formatCurrency(user.money)}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-slate-500" align="end">
        <DropdownMenuItem asChild>
          <Link
            to="/settings"
            className=" menuItem dark:text-white hover:bg-[#f3fafd] hover:text-[#4a69ff]  gap-3 py-3 cursor-pointer"
          >
            <i
              data-v-26a8675a=""
              className="iconfont icon-icon_personal_data "
            ></i>
            {t("thong_tin_ca_nhan", { ns: "all" })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/settings/my-purse"
            className=" menuItem dark:text-white hover:bg-[#f3fafd] hover:text-[#4a69ff]  gap-3 py-3 cursor-pointer"
          >
            <i
              data-v-26a8675a=""
              className="iconfont icon-icon_top_up_record"
            ></i>
            {t("quy_tien", { ns: "all" })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/settings/bet-history"
            className=" menuItem dark:text-white hover:bg-[#f3fafd] hover:text-[#4a69ff]  gap-3 py-3 cursor-pointer"
          >
            <i data-v-26a8675a="" className="iconfont icon-icon_stake"></i>
            {t("lich_su_cuoc", { ns: "all" })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/settings/message"
            className=" menuItem dark:text-white hover:bg-[#f3fafd] hover:text-[#4a69ff]  gap-3 py-3 cursor-pointer"
          >
            <i
              data-v-26a8675a=""
              className="iconfont icon-icon_message_centre"
            ></i>
            {t("hom_thu", { ns: "all" })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/help"
            className=" menuItem dark:text-white hover:bg-[#f3fafd] hover:text-[#4a69ff]  gap-3 py-3 cursor-pointer"
          >
            <i
              data-v-26a8675a=""
              className="iconfont icon-icon_help_centre"
            ></i>
            {t("trung_tam_tro_giup", { ns: "all" })}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" menuItem dark:text-white hover:bg-[#f3fafd] hover:text-[#4a69ff]  justify-center py-3 cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            handleLogout();
          }}
        >
          {t("dang_xuat", { ns: "all" })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
