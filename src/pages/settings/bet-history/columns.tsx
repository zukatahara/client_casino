import { NS } from "@/constants/ns";
import { BetHistory } from "@/types/bet.type";
import { formatCurrency } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<BetHistory>[] = [
  {
    accessorKey: "id_bet",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.bet_code");
    },
  },
  {
    accessorKey: "match_time",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.created_at");
    },
  },
  {
    accessorKey: "site",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.code_game");
    },
  },
  {
    accessorKey: "product",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.category");
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
      return <div>{formatCurrency(row.original.bet || 0)}</div>;
    },
  },
  {
    accessorKey: "payout",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.reward");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return <div>{formatCurrency(row.original.payout || 0)}</div>;
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
      return (
        <div>
          {row.original.payout > 0 ? t("columns_lt.win") : t("columns_lt.lose")}
        </div>
      );
    },
  },
];
