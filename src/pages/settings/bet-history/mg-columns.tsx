import config from "@/constants/config";
import { NS } from "@/constants/ns";
import { BetLotteryHistory } from "@/types/bet.type";
import { formatCurrency, getTypeMega } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const getTheLoai = (theloai: string) => {
  return config().listMega[theloai as "1"];
};

export const columnsMG: ColumnDef<BetLotteryHistory>[] = [
  {
    accessorKey: "created_at",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.created_at");
    },
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          {moment(row.original.created_at).format("DD/MM/YYYY HH:mm:ss")}
        </div>
      );
    },
  },
  {
    accessorKey: "theloai",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.category");
    },
    cell: ({ row }: { row: any }) => {
      return <div>{`${getTheLoai(row.original.theloai) || ""}`}</div>;
    },
  },
  {
    accessorKey: "type",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.type");
    },
    cell: ({ row }: { row: any }) => {
      return <div>{`${getTypeMega(row.original.type) || ""}`}</div>;
    },
  },
  {
    accessorKey: "bet",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.bet");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          {row.original?.so && String(row?.original?.so).slice(0, 1) === "["
            ? JSON.parse(row?.original?.so || "")?.join(", ")
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "payout",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.stake");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return (
        <div className="text-yellow-500">
          {row.original?.so && row.original?.so.slice(0, 1) === "["
            ? formatCurrency(
                row.original.amount * JSON.parse(row.original?.so).length
              )
            : "0"}
        </div>
      );
    },
  },
  {
    accessorKey: "p_win",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.result");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      const { t } = useTranslation(NS.betHistory);
      return (
        <div>
          {row.original.thanhtoan === 0 ? (
            <span className="text-yellow-500">
              {t("columns_lt.awaiting_result")}
            </span>
          ) : row.original.win > 0 ? (
            <span className="text-green-600">
              + {formatCurrency(row.original.win)}
            </span>
          ) : (
            <span className="text-red-600">{t("columns_lt.lose")}</span>
          )}
        </div>
      );
    },
  },
];
