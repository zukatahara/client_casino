import { HistoryGameMega } from "@/apis/game.api";
import { NS } from "@/constants/ns";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsMega: ColumnDef<HistoryGameMega>[] = [
  {
    accessorKey: "created_at",
    id: "created_at",
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
        <div className="flex items-center">
          {row.original.result &&
            String(row.original.result)
              .split(",")
              .map((item) => {
                return <div className="ball">{item}</div>;
              })}
        </div>
      );
    },
  },
];
