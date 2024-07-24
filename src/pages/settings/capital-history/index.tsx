import { useEffect, useState } from "react";
// import { columns } from "./columns";
import { useColumns } from "./columns";

import { DataTable } from "./data-table";
import moment from "moment";
import { createSearchParams, useNavigate } from "react-router-dom";
import useQueryChargeConfig from "@/hooks/useQueryChargeConfig ";
import { useQuery } from "@tanstack/react-query";
import authApi from "@/apis/auth.api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
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
const CapitalHistory = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const columns = useColumns();
  const dateOption = [
    {
      label: t("hom_nay", { ns: "all" }),
      value: "today",
    },
    {
      label: t("hom_qua", { ns: "all" }),
      value: "yesterday",
    },
    {
      label: t("7_ngay_gan_day", { ns: "all" }),
      value: "7",
    },
    {
      label: t("30_ngay_gan_day", { ns: "all" }),
      value: "30",
    },
  ];
  const [dateOptionSelected, setDateOptionSelected] = useState(
    dateOption[2].value
  );
  const [date, setDate] = useState<DateValueType>(null);
  const navigate = useNavigate();
  const queryConfig = useQueryChargeConfig();
  const { data } = useQuery({
    queryKey: ["charge-history", queryConfig],
    queryFn: () => authApi.getListTransaction2(queryConfig as any),
  });
  const handleSearch = () => {
    if (dateOptionSelected === "optional") {
      return navigate({
        pathname: "/settings/capital-history",
        search: createSearchParams({
          ...queryConfig,
          startDate: `${moment(date?.startDate).format("YYYY-MM-DD")} 00:00:00`,
          endDate: `${moment(date?.endDate).format("YYYY-MM-DD")} 23:59:59`,
        }).toString(),
      });
    }
    navigate({
      pathname: "/settings/capital-history",
      search: createSearchParams({
        ...queryConfig,
        startDate: getDateByOption(dateOptionSelected).startDate,
        endDate: getDateByOption(dateOptionSelected).endDate,
      }).toString(),
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const reset = () => {
    setDate(null);
    setDateOptionSelected("7");
    handleSearch();
  };

  const listData = data?.data?.data || [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center py-4">
        <Datepicker
          containerClassName={"w-[300px] border border-slate-400 rounded-md"}
          primaryColor={"blue"}
          value={date}
          onChange={(value) => {
            setDate(value);
            setDateOptionSelected("optional");
          }}
        />
        <div className="flex items-center text-base text-slate-700 ml-4">
          {dateOption.map((option) => (
            <div
              onClick={() => {
                setDateOptionSelected(option.value);
              }}
              key={option.value}
              className={cn(
                "px-2 py-2 border border-slate-200 dark:border-slate-700 border-solid rounded-md mr-2",
                dateOptionSelected === option.value && "bg-main text-white"
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 mb-6">
        <Button onClick={handleSearch} className="btn_submit_new">
          {" "}
          {t("tim_kiem", { ns: "all" })}
        </Button>
        <Button onClick={reset} variant={"outline"} className="text-main ml-4">
          {t("dat_lai", { ns: "all" })}
        </Button>
      </div>
      <DataTable columns={columns} data={listData} />
    </div>
  );
};

export default CapitalHistory;
