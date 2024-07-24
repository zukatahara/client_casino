import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/lottery/columns";
import { createSearchParams, useNavigate } from "react-router-dom";
import useQueryResultConfig from "@/hooks/useQueryResultConfig";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import { LotteryResultConfig } from "@/types/bet.type";
import config from "@/constants/config";
import { columnsSicbo } from "./_components/sicbo/columns";
import { columnsMega } from "./_components/mega/column";
import { columnsKeno } from "./_components/keno/column";
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

const typeLottery = [
  {
    id: 32,
    title: "Miền Bắc",
    value: "xsmb",
    series_id: 2,
    week_days: [0, 1, 2, 3, 4, 5, 6],
    link: "/mobile/xo-so/xsmb",
  },
  {
    id: 45,
    title: "M.bắc SVIP 5 phút",
    value: "300",
    series_id: 2,
    week_days: [0, 1, 2, 3, 4, 5, 6],
    link: "/mobile/xo-so/300",
  },
  {
    id: 46,
    title: "M.bắc SVIP 3 phút",
    value: "180",
    series_id: 2,
    week_days: [0, 1, 2, 3, 4, 5, 6],
    link: "/mobile/xo-so/180",
  },
  {
    id: 49,
    title: "Miền Bắc VIP 2 phút",
    value: "120",
    series_id: 2,
    week_days: [0, 1, 2, 3, 4, 5, 6],
    link: "/mobile/xo-so/120",
  },
  {
    id: 48,
    title: "Miền Bắc VIP 75 giây ",
    value: "75",
    series_id: 2,
    week_days: [0, 1, 2, 3, 4, 5, 6],
    link: "/mobile/xo-so/75",
  },
  {
    id: 47,
    title: "Miền Bắc VIP 45 giây",
    value: "45",
    series_id: 2,
    week_days: [0, 1, 2, 3, 4, 5, 6],
    link: "/mobile/xo-so/45",
  },
];
const LotteryResult = () => {
  const { t } = useTranslation(NS.lotteryResult);
  const [typeShow, setTypeShow] = useState("lottery");
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
    dateOption[0].value
  );
  const configInfo = config();
  const [date, setDate] = useState<DateValueType>(null);
  const [gameType, setGameType] = useState("xsmb");
  const [type, setType] = useState(typeLottery[0].value);
  const navigate = useNavigate();
  const queryConfig = useQueryResultConfig();
  const { data } = useQuery({
    queryKey: ["results", queryConfig],
    queryFn: () =>
      gameApi.getHistoryGameLottery(queryConfig as LotteryResultConfig),
  });

  const { data: dataSicbo } = useQuery({
    queryKey: ["results-sicbo", queryConfig],
    queryFn: () =>
      gameApi.getHistoryGameSicbo(queryConfig as LotteryResultConfig),
  });

  const { data: dataMega } = useQuery({
    queryKey: ["results-mega", queryConfig],
    queryFn: () =>
      gameApi.getHistoryGameMega(queryConfig as LotteryResultConfig),
  });

  const { data: dataKeno } = useQuery({
    queryKey: ["results-keno", queryConfig],
    queryFn: () =>
      gameApi.getHistoryGameKeno(queryConfig as LotteryResultConfig),
  });

  const handleSearch = () => {
    setTypeShow(
      gameType === "sicbo"
        ? "sicbo"
        : gameType === "mega"
        ? "mega"
        : gameType === "keno"
        ? "keno"
        : "lottery"
    );

    if (dateOptionSelected === "optional") {
      return navigate({
        pathname: "/settings/lottery-result",
        search: createSearchParams({
          ...queryConfig,
          startDate: `${moment(date?.startDate).format("YYYY-MM-DD")} 00:00:00`,
          endDate: `${moment(date?.endDate).format("YYYY-MM-DD")} 23:59:59`,
          gameType:
            gameType === "sicbo"
              ? "sicbo"
              : gameType === "mega"
              ? "mega"
              : "lottery",
          type: type,
        }).toString(),
      });
    }
    navigate({
      pathname: "/settings/lottery-result",
      search: createSearchParams({
        ...queryConfig,
        startDate: getDateByOption(dateOptionSelected).startDate,
        endDate: getDateByOption(dateOptionSelected).endDate,
        gameType:
          gameType === "sicbo"
            ? "sicbo"
            : gameType === "mega"
            ? "mega"
            : "lottery",
        type: type,
      }).toString(),
    });
  };

  useEffect(() => {
    handleSearch();
  }, [gameType, type, dateOptionSelected]);

  const reset = () => {
    setGameType("xsmb");
    setType(Object.keys(configInfo.listXsmb)[0]);
    setDate(null);
    setDateOptionSelected("today");
    handleSearch();
  };

  const listData = data?.data?.data?.data || [];
  const listSicbo = dataSicbo?.data?.data?.data || [];
  const listMega = dataMega?.data?.data?.data || [];
  const listKeno = dataKeno?.data?.data?.data || [];
  return (
    <div className="container mx-auto py-10">
      <ScrollArea className="w-full max-w-4xl">
        <div className="w-full max-w-4xl flex items-center border-b border-slate-200 dark:border-slate-700 border-solid overflow-x-auto scroll-custom">
          <span
            className={cn(
              "py-2 px-4 text-slate-800 text-base w-24 whitespace-nowrap",
              gameType === "xsmb" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("xsmb");
              setType(Object.keys(configInfo.listXsmb)[0]);
            }}
          >
            {t("north")}
          </span>
          <span
            className={cn(
              "py-2 px-4 text-slate-800 text-base w-24 whitespace-nowrap",
              gameType === "xsmn" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("xsmn");
              setType(Object.keys(configInfo.listXsmn)[0]);
            }}
          >
            {t("south")}
          </span>
          <span
            className={cn(
              "py-2 px-4 text-slate-800 text-base w-24 whitespace-nowrap",
              gameType === "xsmt" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("xsmt");
              setType(Object.keys(configInfo.listXsmt)[0]);
            }}
          >
            {t("central")}
          </span>
          <span
            className={cn(
              "py-2 px-4 text-slate-800 text-base w-20 whitespace-nowrap",
              gameType === "sicbo" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("sicbo");
              setType(Object.keys(configInfo.listSicbo)[0]);
            }}
          >
            {t("sicbo")}
          </span>
          <span
            className={cn(
              "py-2 px-4 text-slate-800 text-base w-26 whitespace-nowrap",
              gameType === "mega" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("mega");
              setType(Object.keys(configInfo.listMega)[0]);
            }}
          >
            {t("mega_6_45")}
          </span>
          <span
            className={cn(
              "py-2 px-4 text-slate-800 text-base w-26 whitespace-nowrap",
              gameType === "keno" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("keno");
              setType(Object.keys(configInfo.listKeno)[0]);
            }}
          >
            {t("keno")}
          </span>
        </div>
      </ScrollArea>
      <div className="mt-4">
        {gameType === "xsmb" && (
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[220px] bg-transparent border text-slate-800">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(configInfo.listXsmb).map((option) => (
                <SelectItem key={option} value={option}>
                  {configInfo.listXsmb[option as "45"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {gameType === "xsmn" && (
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[220px] bg-transparent border text-slate-800">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(configInfo.listXsmn).map((option) => (
                <SelectItem key={option} value={option}>
                  {configInfo.listXsmn[option as "xsmn-xscm"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {gameType === "xsmt" && (
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[220px] bg-transparent border text-slate-800">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(configInfo.listXsmt).map((option) => (
                <SelectItem key={option} value={option}>
                  {configInfo.listXsmt[option as "xsmt-xstth"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {gameType === "sicbo" && (
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[220px] bg-transparent border text-slate-800">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(configInfo.listSicbo).map((option) => (
                <SelectItem key={option} value={option}>
                  {configInfo.listSicbo[option as "60"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {gameType === "mega" && (
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[220px] bg-transparent border text-slate-800">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(configInfo.listMega).map((option) => (
                <SelectItem key={option} value={option}>
                  {configInfo.listMega[option as "1"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {gameType === "keno" && (
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[220px] bg-transparent border text-slate-800">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(configInfo.listKeno).map((option) => (
                <SelectItem key={option} value={option}>
                  {configInfo.listKeno[option as "60"]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
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
      <div className="my-4">
        <Button onClick={handleSearch} className="btn_submit_new">
          {t("search")}
        </Button>
        <Button onClick={reset} variant={"outline"} className="text-main ml-4">
          {t("reset")}
        </Button>
      </div>
      {typeShow !== "sicbo" && typeShow !== "mega" && typeShow !== "keno" && (
        <DataTable columns={columns} data={listData} />
      )}
      {typeShow === "sicbo" && (
        <DataTable columns={columnsSicbo} data={listSicbo} />
      )}
      {typeShow === "mega" && (
        <DataTable columns={columnsMega} data={listMega} />
      )}
      {typeShow === "keno" && (
        <DataTable columns={columnsKeno} data={listKeno} />
      )}
    </div>
  );
};

export default LotteryResult;
