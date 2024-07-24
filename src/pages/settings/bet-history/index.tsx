import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { gameApi } from "@/apis/game.api";
import useQueryConfig from "@/hooks/useQueryConfig";
import { BetHistoryConfig } from "@/types/bet.type";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import moment from "moment";
import { columnsLt } from "./lt-columns";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { columnsSB } from "./sb-columns";
import { columnsKN } from "./kn-column";
import { columnsMG } from "./mg-columns";
import { formatCurrency } from "@/utils/utils";
import { listTypeGame } from "@/constants/constants";
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

const BetHistory = () => {
  const { t } = useTranslation(NS.betHistory);
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
  const [date, setDate] = useState<DateValueType>(null);
  const [gameType, setGameType] = useState("lottery");
  const [providercode, setProvidercode] = useState("all");
  const [type, setType] = useState("all");

  const navigate = useNavigate();
  const queryConfig = useQueryConfig();
  const { data } = useQuery({
    queryKey: ["bet-history", queryConfig],
    queryFn: () => gameApi.getBetHistory(queryConfig as BetHistoryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  });

  const { data: gameData } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });

  const listGame = gameData?.data?.data?.listTypeGame
    ? [...gameData?.data?.data?.listTypeGame]
    : [];
  const handleSearch = () => {
    if (dateOptionSelected === "optional") {
      return navigate({
        pathname: "/settings/bet-history",
        search: createSearchParams({
          ...queryConfig,
          startDate: `${moment(date?.startDate).format("YYYY-MM-DD")} 00:00:00`,
          endDate: `${moment(date?.endDate).format("YYYY-MM-DD")} 23:59:59`,
          gameType: gameType,
          type,
          providercode: providercode,
        }).toString(),
      });
    }
    navigate({
      pathname: "/settings/bet-history",
      search: createSearchParams({
        ...queryConfig,
        startDate: getDateByOption(dateOptionSelected).startDate,
        endDate: getDateByOption(dateOptionSelected).endDate,
        gameType: gameType,
        type,
        providercode: providercode,
      }).toString(),
    });
  };

  useEffect(() => {
    handleSearch();
  }, [gameType, type, providercode]);

  const reset = () => {
    setGameType("lottery");
    // setProvidercode("all");
    setDate(null);
    setDateOptionSelected("7");
    handleSearch();
  };

  const listData = data?.data?.data?.data || [];
  const tongcuoc = data?.data?.tongcuoc || 0;
  const tongthang = data?.data?.tongthang || 0;
  return (
    <div className="container mx-auto py-10">
      <div className="w-full flex items-center border-b border-slate-200 dark:border-slate-700 border-solid overflow-x-scroll scroll-custom">
        <span
          className={cn(
            "py-2 px-4 text-slate-800 text-base w-20 whitespace-nowrap cursor-pointer dark:text-slate-300",
            gameType === "lottery" && "bg-main text-white"
          )}
          onClick={() => {
            setGameType("lottery");
            // setProvidercode("all");
            setType("all");
          }}
        >
          {t("lottery")}
        </span>
        <span
          className={cn(
            "py-2 px-4 text-slate-800 text-base w-20 whitespace-nowrap cursor-pointer dark:text-slate-300",
            gameType === "sicbo" && "bg-main text-white"
          )}
          onClick={() => {
            setGameType("sicbo");
            // setProvidercode("all");
            setType("all");
          }}
        >
          {t("sicbo")}
        </span>
        <span
          className={cn(
            "py-2 px-4 text-slate-800 text-base w-20 whitespace-nowrap cursor-pointer dark:text-slate-300",
            gameType === "mega" && "bg-main text-white"
          )}
          onClick={() => {
            setGameType("mega");
            // setProvidercode("all");
            setType("all");
          }}
        >
          {t("mega")}
        </span>
        <span
          className={cn(
            "py-2 px-4 text-slate-800 text-base w-20 whitespace-nowrap cursor-pointer dark:text-slate-300",
            gameType === "keno" && "bg-main text-white"
          )}
          onClick={() => {
            setGameType("keno");
            // setProvidercode("all");
            setType("all");
          }}
        >
          {t("keno")}
        </span>
        {listGame
          .concat([
            {
              type: "DM",
              title: "Đá gà",
            },
          ])
          .sort((item1, item2) => {
            // Đặt phần tử có type là 'OT' sau cùng
            if (item1.type === "OT") {
              return 1; // item1 sẽ được đặt sau item2
            } else if (item2.type === "OT") {
              return -1; // item1 sẽ được đặt trước item2
            }
            return 0; // Giữ nguyên thứ tự của các phần tử khác
          })
          .map((game) => (
            <span
              key={game.type}
              className={cn(
                "py-2 px-4 text-slate-800 text-base  whitespace-nowrap cursor-pointer dark:text-slate-300",
                game.type === "DM" && providercode === "DM"
                  ? "bg-main text-white"
                  : type === game.type &&
                      providercode === "all" &&
                      "bg-main text-white"
              )}
              onClick={() => {
                setGameType("bac");
                if (game.type === "DM") {
                  setProvidercode("DM");
                  setType("OT");
                } else {
                  setType(game.type);
                  setProvidercode("all");
                }
              }}
            >
              {/* @ts-ignore */}
              {t(listTypeGame[game.type] || game.title)}
            </span>
          ))}
      </div>
      <div className="flex items-center py-4">
        {/* <DatePickerWithRange
          date={date}
          setDate={setDate}
          className="max-w-sm"
          callback={() => setDateOptionSelected("optional")}
        /> */}
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
                "px-2 py-2 border border-slate-200 dark:border-slate-700 border-solid rounded-md mr-2 cursor-pointer",
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
          {t("search")}
        </Button>
        <Button onClick={reset} variant={"outline"} className="text-main ml-4">
          {t("reset")}
        </Button>
      </div>
      {gameType !== "lottery" &&
        gameType !== "sicbo" &&
        gameType !== "keno" &&
        gameType !== "mega" && <DataTable columns={columns} data={listData} />}
      {["lottery"].includes(gameType) && (
        <DataTable columns={columnsLt} data={(listData as any) || []} />
      )}
      {["sicbo"].includes(gameType) && (
        <DataTable columns={columnsSB} data={(listData as any) || []} />
      )}
      {["keno"].includes(gameType) && (
        <DataTable columns={columnsKN} data={(listData as any) || []} />
      )}
      {["mega"].includes(gameType) && (
        <DataTable columns={columnsMG} data={(listData as any) || []} />
      )}
      <div data-v-7cfe487f className="totalData">
        <div data-v-7cfe487f className="total">
          <div data-v-7cfe487f>
            <i data-v-7cfe487f className="iconfont icon-icon_stake" />{" "}
            {t("total_bet_amount")}：{" "}
          </div>
          <p
            data-v-7cfe487f
            className="el-tooltip item"
            aria-describedby="el-tooltip-4094"
            tabIndex={0}
          >
            {formatCurrency(tongcuoc)}
          </p>
        </div>
        <div data-v-7cfe487f className="loseOrWin">
          <div data-v-7cfe487f>
            <i data-v-7cfe487f className="iconfont icon-icon_wal" />{" "}
            {t("total_win_amount")}:：{" "}
          </div>
          <p
            data-v-7cfe487f
            className="el-tooltip item"
            aria-describedby="el-tooltip-6005"
            tabIndex={0}
          >
            {formatCurrency(tongthang)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetHistory;
