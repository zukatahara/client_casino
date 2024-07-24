import { HistoryGameKeno } from "@/apis/game.api";
import { findLabelsById } from "@/constants/constants";
import { NS } from "@/constants/ns";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsKeno: ColumnDef<HistoryGameKeno>[] = [
  {
    accessorKey: "created_at",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("draw_time");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          {moment(row.original.created_at).format("DD/MM/YYYY HH:mm:ss")}
        </div>
      );
    },
  },
  {
    accessorKey: "phien",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("draw_number");
    },
  },
  {
    accessorKey: "draw_result",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("draw_result");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return (
        <div className="grid grid-cols-10 gap-1">
          {row.original.result &&
            String(row.original.result)
              .split(",")
              .map((item) => {
                return <div className="ball ball-small">{item}</div>;
              })}
        </div>
      );
    },
  },
  {
    accessorKey: "tong",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("total");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return <div className="open_results">{row.original.tong}</div>;
    },
  },
  {
    accessorKey: "taixiu",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("tai_xiu");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      const { t } = useTranslation(NS.lotteryResult);
      return (
        <div className="open_results name">
          {row.original.taixiu === "tai" ? t("tai") : t("xiu")}
        </div>
      );
    },
  },
  {
    accessorKey: "chanle",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("even_odd");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      const { t } = useTranslation(NS.lotteryResult);
      return (
        <div className="open_results name">
          {row.original.chanle === "chan" ? t("even") : t("odd")}
        </div>
      );
    },
  },
  {
    accessorKey: "trenHoaDuoi",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("trenhaduoi");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      const { t } = useTranslation(NS.lotteryResult);
      return (
        <div className="open_results name">
          {row.original.trenHoaDuoi === "tren" ? t("tren") : t("duoi")}
        </div>
      );
    },
  },
  {
    accessorKey: "nguHanh",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("nguhanh");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      const { t } = useTranslation(NS.lotteryResult);
      return (
        <div className="open_results name">
          {t(findLabelsById(row.original.nguHanh) || "Tài")}
        </div>
      );
    },
  },
];
