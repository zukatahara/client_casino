// import { DatePickerWithRange } from "@/components/ui/date-picker";
import GameNavBar from "../_components/game-nav-bar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Config from "@/constants/config";
import { createSearchParams, useNavigate } from "react-router-dom";
import useQueryResultConfig from "@/hooks/useQueryResultConfig";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import { LotteryResultConfig } from "@/types/bet.type";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import Detail from "./_components/detail";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const ResultHistory = () => {
  const config = Config();
  const { t } = useTranslation(NS.lotteryResult);
  const listType = Object.keys(config.listLottery)
    .map((key) => {
      return {
        value: `lottery-${key}`,
        label: config.listLottery[key as keyof typeof config.listLottery],
        type: "lottery",
      };
    })
    .concat(
      Object.keys(config.listSicbo)
        .map((key) => {
          return {
            value: `sicbo-${key}`,
            label:
              config.listSicbo[key as unknown as keyof typeof config.listSicbo],
            type: `sicbo`,
          };
        })
        .concat(
          Object.keys(config.listMega).map((key) => {
            return {
              value: `mega-${key}`,
              label:
                config.listMega[key as unknown as keyof typeof config.listMega],
              type: `mega`,
            };
          })
        )
        .concat(
          Object.keys(config.listKeno).map((key) => {
            return {
              value: `keno-${key}`,
              label:
                config.listKeno[key as unknown as keyof typeof config.listKeno],
              type: `keno`,
            };
          })
        )
    );
  const queryConfig = useQueryResultConfig();
  const [date, setDate] = useState<DateValueType>(null);
  const [type, setType] = useState(
    queryConfig.gameType
      ? `${queryConfig.gameType}-${queryConfig.type}`
      : listType[0].value
  );
  const [typeShow, setTypeShow] = useState(listType[0].type);

  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["results", queryConfig],
    queryFn: () =>
      gameApi.getHistoryGameLottery(queryConfig as LotteryResultConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  });

  const { data: dataSicbo } = useQuery({
    queryKey: ["results-sicbo", queryConfig],
    queryFn: () =>
      gameApi.getHistoryGameSicbo(queryConfig as LotteryResultConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  });

  const handleSearch = () => {
    setTypeShow(type.split("-")[0] === "sicbo" ? "sicbo" : "lottery");
    navigate({
      pathname: "/mobile/result-history",
      search: createSearchParams({
        ...queryConfig,
        startDate: `${moment(date?.startDate).format("YYYY-MM-DD")} 00:00:00`,
        endDate: `${moment(date?.endDate).format("YYYY-MM-DD")} 23:59:59`,
        gameType: type.split("-")[0] === "sicbo" ? "sicbo" : "lottery",
        type: type.split("-")[1],
      }).toString(),
    });
  };

  useEffect(() => {
    handleSearch();
  }, [type]);

  const listData = data?.data?.data?.data || [];
  const listSicbo = dataSicbo?.data?.data?.data || [];
  return (
    <div>
      <GameNavBar title={t("draw_history")} />
      <div className="container">
        <div className="flex items-center py-4 mt-20">
          <Datepicker
            containerClassName={
              "w-[300px] border border-slate-400 rounded-md relative"
            }
            primaryColor={"blue"}
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
          />
        </div>
        <Button>{t("search")}</Button>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[300px] bg-transparent border text-slate-200 mt-4">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="h-[400px]">
            {listType.map((option) => (
              <SelectItem
                onClick={() => {
                  setType(option.value);
                }}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4 space-y-4 text-slate-200 text-xs">
          {typeShow === "lottery" &&
            listData.map((item, index) => {
              return <Detail lottery={item} key={index} />;
            })}
          {typeShow === "sicbo" &&
            listSicbo.map((item, index) => {
              return (
                <div key={index} className="w-full p-2 flex">
                  <div className="w-1/3">
                    <div>{item.id}</div>
                    <div>{moment(item.created_at).format("DD/MM/YYYY")}</div>
                    <div>{moment(item.created_at).format("HH:mm:ss")}</div>
                  </div>
                  <div className="w-2/3">
                    <div className="flex justify-end items-center">
                      {String(item.ketqua)
                        .split(",")
                        .map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={`dice dice-${item}`}
                            ></div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ResultHistory;
