import "./style.css";
import { useQuery } from "@tanstack/react-query";
// import homeApi from "@/apis/home.api";
import config from "@/constants/config";
import BackButton from "@/components/back-button";
import { gameApi } from "@/apis/game.api";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useState } from "react";
import useQueryConfig from "@/hooks/useQueryConfig";
import { BetHistoryConfig } from "@/types/bet.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/utils/utils";
import { findLabelsById, listTypeGame } from "@/constants/constants";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

// type ListCuaDatKeno = {
//   [type: string]: {
//     [so: string]: string;
//   };
// }

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

const BettingRecord = () => {
  const { t } = useTranslation([NS["ALL"], NS["keno"]]);
  const { t: tBetHistory } = useTranslation(NS.betHistory);
  const configInfo = config();
  const dateOption = [
    {
      label: tBetHistory("today"),
      value: "today",
    },
    {
      label: tBetHistory("yesterday"),
      value: "yesterday",
    },
    {
      label: tBetHistory("last_7_days"),
      value: "7",
    },
    {
      label: tBetHistory("last_30_days"),
      value: "30",
    },
  ];
  const [dateOptionSelected, setDateOptionSelected] = useState(
    dateOption[2].value
  );
  const [gameType, setGameType] = useState("lottery");
  const [providercode, setProvidercode] = useState("all");
  const [type, setType] = useState("all");
  // const navigate = useNavigate();
  const queryConfig = useQueryConfig();
  queryConfig.endDate = getDateByOption(dateOptionSelected).endDate;
  queryConfig.startDate = getDateByOption(dateOptionSelected).startDate;
  queryConfig.gameType = gameType;
  queryConfig.providercode = providercode;
  queryConfig.type = type;
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

  const listData = data?.data?.data?.data || [];
  console.log("listData:", listData);
  // const logo = dataSetting?.data.data.logo_image;
  const listGame = gameData?.data?.data?.listTypeGame
    ? [...gameData?.data?.data?.listTypeGame]
    : [];
  const getType = (type: string) => {
    let title = "";
    switch (gameType) {
      case "lottery":
        configInfo.listTheLoai.forEach((item) => {
          item.listType.forEach((item) => {
            if (item.value === type) {
              title = item.title;
              return;
            }
          });
        });
        break;
      default:
        break;
    }

    return title;
  };
  const getTheLoai = (theloai: string) => {
    switch (gameType) {
      case "lottery":
        return configInfo.listLottery[theloai as "45"];
      case "sicbo":
        return configInfo.listSicbo[theloai as "60"];
      case "mega":
        return configInfo.listMega[theloai as "1"];
      case "keno":
        return configInfo.listKeno[theloai as "60"];
    }
    return "";
  };
  const getGameTypeText = (gameType: any, item: any) => {
    switch (gameType) {
      case "lottery":
        return getType(item.type);
      case "sicbo":
        return configInfo.infoCuoc[item.cuadat as "tai"];
      case "keno":
        return configInfo.listNameKeno[item.type as "keo_doi"]?.value;
      default:
        return configInfo.cuocMega[item.type as "sothuong"];
    }
  };
  return (
    <div className="bettingRecord">
      <div className="van-nav-bar van-nav-bar--fixed" id="lottery_nav">
        <div className="van-nav-bar__content">
          <div className="van-nav-bar__left">
            <BackButton />
          </div>

          <div className="van-nav-bar__title van-ellipsis font-semibold">
            {/* <div className="selectAllLottery">
              <span className="allGameSelect">
                <img className="w-32" src={`${config.baseUrl}${logo}`} alt="" />
              </span>
            </div> */}
            {t("lich_su_cuoc", { ns: "all" })}
          </div>
          <div className="van-nav-bar__right"></div>
        </div>
      </div>
      <div className="w-ful h-full">
        <div className="w-full p-4 bg-[#1b233d] h-12 mt-[52px] overflow-x-scroll flex items-center">
          <span
            className={cn(
              "py-2 px-2 text-xs w-20 whitespace-nowrap rounded-md bg-[#35416d] text-[#90a2dc] mr-2",
              gameType === "lottery" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("lottery");
              // setProvidercode("all");
              setType("all");
            }}
          >
            {tBetHistory("lottery")}
          </span>
          <span
            className={cn(
              "py-2 px-2 text-xs w-20 whitespace-nowrap rounded-md bg-[#35416d] text-[#90a2dc] mr-2",
              gameType === "sicbo" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("sicbo");
              // setProvidercode("all");
              setType("all");
            }}
          >
            {tBetHistory("sicbo")}
          </span>
          <span
            className={cn(
              "py-2 px-2 text-xs w-20 whitespace-nowrap rounded-md bg-[#35416d] text-[#90a2dc] mr-2",
              gameType === "mega" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("mega");
              // setProvidercode("all");
              setType("all");
            }}
          >
            {tBetHistory("mega")}
          </span>
          <span
            className={cn(
              "py-2 px-2 text-xs w-20 whitespace-nowrap rounded-md bg-[#35416d] text-[#90a2dc] mr-2",
              gameType === "keno" && "bg-main text-white"
            )}
            onClick={() => {
              setGameType("keno");
              // setProvidercode("all");
              setType("all");
            }}
          >
            {tBetHistory("keno")}
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
                  "py-2 px-2 text-xs max-w-30 whitespace-nowrap rounded-md bg-[#35416d] text-[#90a2dc] mr-2",
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
                {tBetHistory(listTypeGame[game.type] || game.title)}
              </span>
            ))}
        </div>
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
        <div className="container w-full">
          {listData && listData.length === 0 && (
            <div className="w-full mt-2 text-center text-slate-200">
              {tBetHistory("no_data")}
            </div>
          )}
          {listData &&
            listData.length > 0 &&
            listData.map((item) => (
              <div
                key={item.id}
                className="w-full mt-2 rounded-md bg-[#1b233d] p-2"
              >
                {gameType === "bac" ? (
                  <>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-200">{item.id_bet}</span>
                      <span className="text-green-600">
                        <span className="text-yellow-500 mr-3">
                          {formatCurrency(Number(item.bet))}
                        </span>
                        {item.status === 0 ? (
                          <span className="text-orange-400">
                            {tBetHistory("columns_lt.awaiting_result")}
                          </span>
                        ) : item.payout > 0 ? (
                          <span className="text-green-600">
                            {tBetHistory("columns_lt.win")}
                          </span>
                        ) : (
                          <span className="text-red-600">
                            {tBetHistory("columns_lt.lose")}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-2">
                      <span className="text-slate-200">{`${moment(
                        item.match_time
                      ).format("DD/MM/YYYY HH:mm:ss")}`}</span>
                      <span className="text-slate-200">
                        + {formatCurrency(item.payout)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-2 flex-wrap">
                      {/* : gameType === "keno" && item.type === 'ngu_hanh' && item.so === 'hoa' ? 'Hỏa'
                     : gameType === "keno" ? findLabelsById(item.so)
                       : config.cuocMega[item.type as "sothuong"]} */}
                      <span className="text-slate-200 w-1/2">
                        {item.product}
                      </span>
                      <span className="text-slate-200 w-1/2 text-right">
                        {getTheLoai(item.theloai)}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-200">{item.phien}</span>
                      <span className="text-green-600">
                        <span className="text-yellow-500 mr-3">
                          {item.amount
                            ? formatCurrency(Number(item.amount))
                            : item.money
                            ? formatCurrency(Number(item.money))
                            : formatCurrency(Number(item.cuoc))}
                        </span>
                        {item.thanhtoan === 0 ? (
                          <span className="text-orange-400">
                            {tBetHistory("columns_lt.awaiting_result")}
                          </span>
                        ) : item.win > 0 ? (
                          <span className="text-green-600">
                            {tBetHistory("columns_lt.win")}
                          </span>
                        ) : (
                          <span className="text-red-600">
                            {tBetHistory("columns_lt.lose")}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-2">
                      <span className="text-slate-200">{`${moment(
                        item.created_at
                      ).format("DD/MM/YYYY HH:mm:ss")}`}</span>
                      <span className="text-slate-200">
                        + {formatCurrency(item.win)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-2 flex-wrap">
                      <span className="text-slate-200 w-1/2">
                        {getGameTypeText(gameType, item)}
                      </span>
                      <span className="text-slate-200 w-1/2 text-right">
                        {getTheLoai(item.theloai)}
                      </span>
                      <span className="text-slate-200 break-words w-full block mt-2">
                        {["lottery", "mega"].includes(gameType) &&
                          item.so?.slice(0, 1) === "[" &&
                          `${tBetHistory("bet_content")}:`}{" "}
                        {["lottery", "mega", "keno"].includes(gameType) &&
                        item.so?.slice(0, 1) === "["
                          ? JSON.parse(item.so).map((item: any) => (
                              <>
                                {tBetHistory(
                                  ["tai", "xiu", "chan", "le"].includes(item)
                                    ? // @ts-ignore
                                      t(findLabelsById(item), { ns: "keno" })
                                    : item
                                )}
                                ,
                              </>
                            ))
                          : gameType === "keno" &&
                            item.type === "ngu_hanh" &&
                            item.so === "hoa"
                          ? `${tBetHistory("bet_content")}: ${t("hoa", {
                              ns: "all",
                            })}`
                          : gameType === "keno"
                          ? `${tBetHistory("bet_content")}: ${t(
                              // @ts-ignore
                              findLabelsById(item.so),
                              { ns: "keno" }
                            )}`
                          : ""}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BettingRecord;
