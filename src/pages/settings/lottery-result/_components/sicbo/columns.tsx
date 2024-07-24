import { HistoryGameSicbo } from "@/apis/game.api";
import { NS } from "@/constants/ns";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsSicbo: ColumnDef<HistoryGameSicbo>[] = [
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
    accessorKey: "ketqua",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("draw_result");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return (
        <div className="flex items-center">
          {row.original.ketqua &&
            String(row.original.ketqua)
              .split(",")
              .map((item) => {
                return <div className={`dice dice-${item}`}></div>;
              })}
        </div>
      );
    },
  },
  {
    accessorKey: "sum",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("total");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      const sum =
        row.original.ketqua
          .split(",")
          .reduce((a: number, b: number) => Number(a) + Number(b), 0) || 0;
      return <div className="open_results">{sum}</div>;
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
      const sum =
        row.original.ketqua
          .split(",")
          .reduce((a: number, b: number) => Number(a) + Number(b), 0) || 0;
      return (
        <div className="open_results name">
          {sum >= 11 ? t("tai") : t("xiu")}
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
      const sum =
        row.original.ketqua
          .split(",")
          .reduce((a: number, b: number) => Number(a) + Number(b), 0) || 0;
      return (
        <div className="open_results name">
          {sum % 2 === 0 ? t("even") : t("odd")}
        </div>
      );
    },
  },
];
