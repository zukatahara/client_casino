import { useEffect, useState } from "react";
// import { columns } from "./columns";
import { useColumns } from "./columns";

import { DataTable } from "./data-table";
import moment from "moment";
//@ts-ignore
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import useQueryChargeConfig from "@/hooks/useQueryChargeConfig ";
import { useQuery } from "@tanstack/react-query";
import authApi from "@/apis/auth.api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import BackButton from "@/components/back-button";
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
const MyTransaction = () => {
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
        pathname: "/mobile/my-transaction",
        search: createSearchParams({
          ...queryConfig,
          startDate: `${moment(date?.startDate).format("YYYY-MM-DD")} 00:00:00`,
          endDate: `${moment(date?.endDate).format("YYYY-MM-DD")} 23:59:59`,
        }).toString(),
      });
    }
    navigate({
      pathname: "/mobile/my-transaction",
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
    <div className="userCenter">
      <div className="van-nav-bar van-nav-bar--fixed" style={{ zIndex: 20 }}>
        <div className="van-nav-bar__content">
          <div className="van-nav-bar__left">
            <BackButton back="/mobile/profile" />
          </div>
          <div className="van-nav-bar__title van-ellipsis">
            <p> {t("chi_tiet_giao_dich", { ns: "all" })}</p>
          </div>
        </div>
      </div>
      <div className="scrollList !top-[60px]">
        <div className="px-3">
          <div className="grid items-center py-4 gap-2">
            <Datepicker
              containerClassName={
                "w-[300px] border border-slate-400 rounded-md relative"
              }
              primaryColor={"blue"}
              value={date}
              onChange={(value) => {
                setDate(value);
                setDateOptionSelected("optional");
              }}
            />
            <div
              className=" items-center text-base text-white overflow-y-scroll  pb-2"
              style={{ display: "-webkit-inline-box" }}
            >
              {dateOption.map((option) => (
                <div
                  onClick={() => {
                    setDateOptionSelected(option.value);
                  }}
                  key={option.value}
                  className={cn(
                    "px-2 py-2 border border-slate-200  border-solid rounded-md mr-2 w-fit",
                    dateOptionSelected === option.value && "bg-main text-white"
                  )}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <Button onClick={handleSearch}>
              {t("tim_kiem", { ns: "all" })}
            </Button>
            <Button
              onClick={reset}
              variant={"outline"}
              className="text-main ml-4"
            >
              {t("dat_lai", { ns: "all" })}
            </Button>
          </div>
          <DataTable columns={columns} data={listData} />
        </div>
      </div>
    </div>
  );
};

export default MyTransaction;
