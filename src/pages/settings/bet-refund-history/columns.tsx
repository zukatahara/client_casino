import { NS } from "@/constants/ns";
import { RefundHistory } from "@/types/bet.type";
import { formatCurrency } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface TheLoaiCode {
  SB: "Sport Book";
  FH: "Fish Hunter";
  SL: "Slot";
  LC: "Live Casino";
  LK: "Lottery Keno";
  OT: "Others";
  CB: "Cardboard";
  ES: "E-Sport";
}

const listTheloai = {
  SB: "Sport Book",
  FH: "Fish Hunter",
  SL: "Slot",
  LC: "Live Casino",
  LK: "Lottery Keno",
  OT: "Others",
  CB: "Cardboard",
  ES: "E-Sport",
};

export const columns: ColumnDef<RefundHistory>[] = [
  {
    accessorKey: "provider_code",
    header: () => {
      const { t } = useTranslation(NS.betRefund);
      return t("category");
    },
    cell: ({ row }: { row: any }) => {
      const { t } = useTranslation(NS.betRefund);
      return (
        <div>
          {t(
            listTheloai[row.original.provider_code as keyof TheLoaiCode] ||
              row.original.provider_code
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "total_bet",
    header: () => {
      const { t } = useTranslation(NS.betRefund);
      return t("total_bet");
    },
    cell: ({ row }: { row: any }) => {
      return <div>{formatCurrency(row.original.amount || 0)}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => {
      const { t } = useTranslation(NS.betRefund);
      return t("refund");
    },
    cell: ({ row }: { row: any }) => {
      return <div>{formatCurrency(row.original.amount || 0)}</div>;
    },
  },

  {
    accessorKey: "created_at",
    header: () => {
      const { t } = useTranslation(NS.betRefund);
      return t("time");
    },
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          {moment(row.original.created_at).format("DD/MM/YYYY HH:mm:ss")}
        </div>
      );
    },
  },
];
