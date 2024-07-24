import config from "@/constants/config";
import { NS } from "@/constants/ns";
import { BetLotteryHistory } from "@/types/bet.type";
import { formatCurrency } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const getType = (type: string) => {
  let title = "";
  config().listTheLoai.forEach((item) => {
    item.listType.forEach((item) => {
      if (item.value === type) {
        title = item.title;
        return;
      }
    });
  });
  return title;
};
const getTheLoai = (theloai: string) => {
  return config().listLottery[theloai as "45"];
};

const getCuadat = (so: string) => {
  let cuadat = JSON.parse(so);
  cuadat = cuadat.map((item: any) => {
    if (item === "tai" || item === "xiu" || item === "chan" || item === "le") {
      // @ts-ignore
      return config()?.infoCuoc?.[item];
    } else {
      return item;
    }
  });
  return cuadat.join(", ");
};

export const columnsLt: ColumnDef<BetLotteryHistory>[] = [
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
    accessorKey: "type",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.type");
    },
    cell: ({ row }: { row: any }) => {
      return <div>{`${getType(row.original.type) || ""}`}</div>;
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
    accessorKey: "bet",
    header: () => {
      const { t } = useTranslation(NS.betHistory);
      return t("columns_lt.bet");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          {row.original?.so && row.original?.so.slice(0, 1) === "["
            ? getCuadat(row.original?.so)
            : ""}
        </div>
      );
      // return <div>{row.original?.so ? JSON.parse(row.original?.so)?.join(", ") : ''}</div>;
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
          {formatCurrency(Number(row.original.cuoc))}
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
