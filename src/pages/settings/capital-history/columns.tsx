import { NS } from "@/constants/ns";
import { ChargeHistory } from "@/types/bet.type";
import { formatCurrency } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const useColumns = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const columns: ColumnDef<ChargeHistory>[] = [
    {
      accessorKey: "created_at",
      header: t("thoi_gian", { ns: "all" }),
      cell: ({ row }: { row: any }) => {
        return (
          <div>
            {moment(row.original.created_at).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: t("loai_hinh", { ns: "all" }),
      cell: ({ row }: { row: any }) => {
        return (
          <div>
            {row.original.type === "admin"
              ? t("cap_nhat_diem", { ns: "all" })
              : row.original.TransType === "charge"
              ? t("nap_tien", { ns: "all" })
              : t("rut_tien", { ns: "all" })}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: t("so_tien", { ns: "all" }),
      cell: ({ row }: { row: any }) => {
        return (
          <div>
            {row.original.TransType === "charge" ? "+" : "-"}
            {formatCurrency(row.original.amount || 0)}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: t("phuong_thuc", { ns: "all" }),
      //@ts-ignore
      cell: ({ row }: { row: any }) => {
        return <div>{t(row.original.type, { ns: "all" })}</div>;
        // <div>{row.original.type}</div>
      },
    },
    {
      accessorKey: "description",
      header: t("ghi_chu", { ns: "all" }),
      cell: ({ row }: { row: any }) => {
        return <div>{t(row.original.description, { ns: "all" })}</div>;
      },
    },
    {
      accessorKey: "status",
      header: t("trang_thai", { ns: "all" }),
      cell: ({ row }: { row: any }) => {
        return (
          <div>
            {row.original.status === 0 ? (
              <span className="text-yellow-600">{t("cho", { ns: "all" })}</span>
            ) : row.original.status === 1 ? (
              <span className="text-green-600">
                {t("thanh_cong", { ns: "all" })}
              </span>
            ) : (
              <span className="text-red-600">
                {t("that_bai", { ns: "all" })}
              </span>
            )}
          </div>
        );
      },
    },
  ];
  return columns;
};
// export const columns: ColumnDef<ChargeHistory>[] = [
//   {
//     accessorKey: "created_at",
//     header: "Thời gian",
//     cell: ({ row }: { row: any }) => {
//       return (
//         <div>
//           {moment(row.original.created_at).format("DD/MM/YYYY HH:mm:ss")}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "price",
//     header: "Loại hình",
//     cell: ({ row }: { row: any }) => {
//       return (
//         <div>
//           {row.original.type === "admin"
//             ? "Cập nhật điểm"
//             : row.original.TransType === "charge"
//             ? "Nạp tiền"
//             : "Rút tiền"}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "amount",
//     header: "Số tiền",
//     cell: ({ row }: { row: any }) => {
//       return (
//         <div>
//           {row.original.TransType === "charge" ? "+" : "-"}
//           {formatCurrency(row.original.amount || 0)}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "type",
//     header: "Phương thức",
//     //@ts-ignore
//     cell: ({ row }: { row: any }) => {
//       return <div>admin</div>;
//       // <div>{row.original.type}</div>
//     },
//   },
//   {
//     accessorKey: "description",
//     header: "Ghi chú",
//     cell: ({ row }: { row: any }) => {
//       return <div>{row.original.description}</div>;
//     },
//   },
//   {
//     accessorKey: "status",
//     header: "Trạng thái",
//     cell: ({ row }: { row: any }) => {
//       return (
//         <div>
//           {row.original.status === 0 ? (
//             <span className="text-yellow-600">Chờ</span>
//           ) : row.original.status === 1 ? (
//             <span className="text-green-600">Thành công</span>
//           ) : (
//             <span className="text-red-600">Thất bại</span>
//           )}
//         </div>
//       );
//     },
//   },
// ];
