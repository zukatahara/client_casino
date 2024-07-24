import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import useQueryConfig from "@/hooks/useQueryConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/utils/utils";

import authApi from "@/apis/auth.api";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const getDateByOption = (option: string) => {
  switch (option) {
    case "today":
      return {
        startDate: `${moment().format("YYYY-MM-DD")} 00:00:00`,
        endDate: `${moment().format("YYYY-MM-DD")} 23:59:59`,
      };
    case "yesterday":
      return {
        startDate: `${moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD")} 00:00:00`,
        endDate: `${moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD")} 23:59:59`,
      };
    case "7":
      return {
        startDate: `${moment()
          .subtract(7, "days")
          .format("YYYY-MM-DD")} 00:00:00`,
        endDate: `${moment().format("YYYY-MM-DD")} 23:59:59`,
      };
    case "30":
      return {
        startDate: `${moment()
          .subtract(30, "days")
          .format("YYYY-MM-DD")} 00:00:00`,
        endDate: `${moment().format("YYYY-MM-DD")} 23:59:59`,
      };
    default:
      return {
        startDate: `${moment().format("YYYY-MM-DD")} 00:00:00`,
        endDate: `${moment().format("YYYY-MM-DD")} 23:59:59`,
      };
  }
};

const RefundHistory = () => {
  const { t } = useTranslation(NS.betRefund);
  const dateOption = [
    {
      label: t("today"),
      value: "today",
    },
    {
      label: t("yesterday"),
      value: "yesterday",
    },
    {
      label: t("last_7_days"),
      value: "7",
    },
    {
      label: t("last_30_days"),
      value: "30",
    },
  ];
  const [dateOptionSelected, setDateOptionSelected] = useState(
    dateOption[2].value
  );
  const navigate = useNavigate();
  const queryConfig = useQueryConfig();
  queryConfig.endDate = getDateByOption(dateOptionSelected).endDate;
  queryConfig.startDate = getDateByOption(dateOptionSelected).startDate;

  const { data } = useQuery({
    queryKey: ["refund-history", queryConfig],
    queryFn: () => authApi.getRefundHistory(queryConfig as any),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  });

  const listData = data?.data?.data.rows || [];

  return (
    <div className="bettingRecord">
      <div className="flex items-center justify-between px-4  py-3 border-b-[1px] border-b-[#505e8e] ">
        <ChevronLeft
          className="text-[#fff] cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h3 className="text-[#fff] font-[500] text-[16px]  text-center">
          {t("refund_history")}
        </h3>

        <div></div>
      </div>
      <div className="w-ful h-full">
        <div className="w-full h-9 border-b border-solid border-slate-600 pl-10">
          <Select
            value={dateOptionSelected}
            onValueChange={setDateOptionSelected}
          >
            <SelectTrigger className="w-[180px] bg-transparent border-0 text-slate-50">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {dateOption.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="container w-full px-4">
          {listData && listData.length === 0 && (
            <div className="w-full mt-2 text-center text-slate-200">
              {t("no_data")}
            </div>
          )}
          {listData && listData.length > 0 && (
            <>
              <div className="w-full flex justify-between mt-3">
                <p className="text-slate-200">{t("category")}</p>
                <p className="text-slate-200 text-center">{t("total_bet")}</p>
                <p className="text-slate-200 text-center">{t("refund")}</p>
                <p className="text-slate-200 text-end">{t("time")}</p>
              </div>
              {listData.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex justify-between items-center mt-2 rounded-md bg-[#1b233d] p-2"
                >
                  <p className="text-slate-200 text-xs">{item.provider_code}</p>
                  <p className="text-slate-200 text-xs text-center">
                    {formatCurrency(item.total_bet || 0)}
                  </p>
                  <p className="text-slate-200 text-xs text-center">
                    {formatCurrency(item.amount || 0)}
                  </p>
                  <p className="text-slate-200 text-xs text-end">{`${moment(
                    item.created_at
                  ).format("DD/MM/YYYY")}`}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefundHistory;
