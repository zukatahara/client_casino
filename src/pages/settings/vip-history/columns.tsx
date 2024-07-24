import { NS } from "@/constants/ns";
import { VipAwardHistory } from "@/types/bet.type";
import { formatCurrency } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface TheLoaiCode {
  30: "Thưởng tháng";
  7: "Thưởng tuần";
  birth_day: "Sinh nhật";
  level_up: "Tăng level";
}

export const columns: ColumnDef<VipAwardHistory>[] = [
  {
    accessorKey: "type",
    header: () => {
      const { t } = useTranslation(NS.vip);
      return t("reward_type");
    },
    cell: ({ row }: { row: any }) => {
      const { t } = useTranslation(NS.vip);
      const listTheloai = {
        30: t("monthly_reward"),
        7: t("weekly_reward"),
        birth_day: t("birthday"),
        level_up: t("level_up"),
      };
      return (
        <div>
          {listTheloai[row.original.type as keyof TheLoaiCode] ||
            row.original.type}
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: () => {
      const { t } = useTranslation(NS.vip);
      return t("level");
    },
  },
  {
    accessorKey: "amount",
    header: () => {
      const { t } = useTranslation(NS.vip);
      return t("reward");
    },
    cell: ({ row }: { row: any }) => {
      return <div>{formatCurrency(row.original.amount || 0)}</div>;
    },
  },

  {
    accessorKey: "created_at",
    header: () => {
      const { t } = useTranslation(NS.vip);
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
