import { HistoryGameLottery } from "@/apis/game.api";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Detail from "./detail";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<HistoryGameLottery>[] = [
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
    accessorKey: "gdb",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("draw_result");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return (
        <div className="flex items-center">
          {row.original.gdb &&
            String(row.original.gdb)
              .split("")
              .map((item) => {
                return <div className="ball">{item}</div>;
              })}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => {
      const { t } = useTranslation(NS.lotteryResult);
      return t("action");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return <Detail lottery={row.original} />;
    },
  },
];
