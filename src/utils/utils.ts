import { NS } from "@/constants/ns";
// import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function getHoursLeft(h: number) {
  const now = new Date().getTime();
  const target = new Date(now);
  target.setHours(h, 0, 0, 0);

  const timeDiff = target.getTime() - now;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  let formattedTime = "";

  if (hours >= 0 && hours < 10) {
    formattedTime += "0" + hours + ":";
  } else {
    formattedTime += hours + ":";
  }

  if (minutes < 10) {
    formattedTime += "0" + minutes + ":";
  } else {
    formattedTime += minutes + ":";
  }

  if (seconds < 10) {
    formattedTime += "0" + seconds;
  } else {
    formattedTime += seconds;
  }

  return formattedTime;
}

export function formatSeconds2(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime = "";

  if (hours >= 0 && hours < 10) {
    formattedTime += "0" + hours + ":";
  } else {
    formattedTime += hours + ":";
  }

  if (minutes < 10) {
    formattedTime += "0" + minutes + ":";
  } else {
    formattedTime += minutes + ":";
  }

  if (remainingSeconds < 10) {
    formattedTime += "0" + remainingSeconds;
  } else {
    formattedTime += remainingSeconds;
  }

  return formattedTime;
}

export function getTimeLeft() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(18, 0, 0, 0);

  const timeDiff = target.getTime() - now.getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  return {
    hours: [Math.floor(hours / 10), hours % 10],
    minutes: [Math.floor(minutes / 10), minutes % 10],
    seconds: [Math.floor(seconds / 10), seconds % 10],
  };
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}
export function formatNumber(n: string) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function convertCurrencyToString(value: string) {
  return Number(value.replace(/[^0-9]+/g, ""));
}
export const dateList = [
  {
    label: "Thứ 2",
    value: 1,
  },
  {
    label: "Thứ 3",
    value: 2,
  },
  {
    label: "Thứ 4",
    value: 3,
  },
  {
    label: "Thứ 5",
    value: 4,
  },
  {
    label: "Thứ 6",
    value: 5,
  },
  {
    label: "Thứ 7",
    value: 6,
  },
  {
    label: "Chủ nhật",
    value: 0,
  },
];

export function tinhKhoangThoiGian(thoiDiemDauVao: Date) {
  //   const { t, i18n } = useTranslation([NS["ALL"]]);
  // console.log(i18n.language)
  const thoiDiemVao = new Date(thoiDiemDauVao);
  const thoiDiemHienTai = new Date();

  const khoangThoiGian = thoiDiemHienTai.getTime() - thoiDiemVao.getTime();

  // Chuyển đổi khoảng thời gian thành giây, phút, giờ, ngày, tháng
  const giay = Math.floor(khoangThoiGian / 1000);
  const phut = Math.floor(giay / 60);
  const gio = Math.floor(phut / 60);
  const ngay = Math.floor(gio / 24);
  const thang = Math.floor(ngay / 30);
  const nam = Math.floor(thang / 12);

  if (nam > 0) {
    return `${nam} năm trước`;
  } else if (thang > 0) {
    return `${thang} tháng trước`;
  } else if (ngay > 0) {
    return `${ngay} ngày trước`;
  } else if (gio > 0) {
    return `${gio} giờ trước`;
  } else if (phut > 0) {
    return `${phut} phút trước`;
  } else {
    return `${giay} giây trước`;
  }
}
export function tinhKhoangThoiGian001(thoiDiemDauVao: Date, value: any) {
  const thoiDiemVao = new Date(thoiDiemDauVao);
  const thoiDiemHienTai = new Date();

  const khoangThoiGian = thoiDiemHienTai.getTime() - thoiDiemVao.getTime();

  // Chuyển đổi khoảng thời gian thành giây, phút, giờ, ngày, tháng
  const giay = Math.floor(khoangThoiGian / 1000);
  const phut = Math.floor(giay / 60);
  const gio = Math.floor(phut / 60);
  const ngay = Math.floor(gio / 24);
  const thang = Math.floor(ngay / 30);
  const nam = Math.floor(thang / 12);

  if (nam > 0) {
    return `${nam} ${value === "th-TH" ? "ปีที่แล้ว" : "năm trước"}`;
  } else if (thang > 0) {
    return `${thang} ${value === "th-TH" ? "เดือนที่แล้ว" : "tháng trước"}`;
  } else if (ngay > 0) {
    return `${ngay}${value === "th-TH" ? "เมื่อวาน" : "ngày trước"} `;
  } else if (gio > 0) {
    return `${gio} ${value === "th-TH" ? "ชั่วโมงที่ผ่านมา" : "giờ trước"}`;
  } else if (phut > 0) {
    return `${phut} ${value === "th-TH" ? "นาทีที่แล้ว" : "phút trước"}`;
  } else {
    return `${giay} ${value === "th-TH" ? "วินาทีที่แล้ว" : "giây trước"}`;
  }
}
export function useTinhKhoangThoiGian() {
  // const { t, i18n } = useTranslation();

  return { tinhKhoangThoiGian001 };
}
// console.log(i18n.language)

// export function tinhThoiGian(startDate: number, endDate: number) {
//   // Chuyển đổi chuỗi ngày thành đối tượng Date
//   const startDateObj = new Date(startDate).getTime();
//   const endDateObj = new Date(endDate).getTime();

//   // Tính toán sự chênh lệch giữa hai ngày
//   const timeDifference = endDateObj - startDateObj;

//   // Tính số giờ, phút, giây từ sự chênh lệch
//   const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//   const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//   // In kết quả
//   // console.log(`Số giờ: ${hours} giờ`);
//   // console.log(`Số phút: ${minutes} phút`);
//   // console.log(`Số giây: ${seconds} giây`);
// }

export function factorial(n: number): number {
  let result: number = 1;
  for (let i: number = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export const tileMegaList = [
  {
    name: "Số thường",
    list: [
      {
        name: "Số thường",
        tileCuoc: 1000,
        tileTrathuong: 7200,
        type: "sothuong",
      },
    ],
  },
  {
    name: "Nhiều số",
    list: [
      {
        name: "Trúng 4 số",
        tileCuoc: 1000,
        tileTrathuong: 7000,
        type: "4so",
      },
      {
        name: "Trúng 3 số",
        tileCuoc: 1000,
        tileTrathuong: 500,
        type: "3so",
      },
      {
        name: "Trúng 2 số",
        tileCuoc: 1000,
        tileTrathuong: 7000,
        type: "2so",
      },
    ],
  },
  {
    name: "Lô trượt",
    list: [
      {
        name: "Trượt xiên 5",
        tileCuoc: 1,
        tileTrathuong: 2,
        type: "truotxien5",
      },
      {
        name: "Trượt xiên 6",
        tileCuoc: 1000,
        tileTrathuong: 7000,
        type: "truotxien6",
      },
      {
        name: "Trượt xiên 7",
        tileCuoc: 1000,
        tileTrathuong: 7000,
        type: "truotxien7",
      },
      {
        name: "Trượt xiên 8",
        tileCuoc: 1000,
        tileTrathuong: 7000,
        type: "truotxien8",
      },
      {
        name: "Trượt xiên 9",
        tileCuoc: 1000,
        tileTrathuong: 7000,
        type: "truotxien9",
      },
      {
        name: "Trượt xiên 10",
        tileCuoc: 1000,
        tileTrathuong: 7000,
        type: "truotxien10",
      },
    ],
  },
  {
    name: "Chọn 1",
    list: [
      {
        name: "Chọn 5 ăn 1",
        tileCuoc: 1000,
        tileTrathuong: 7200,
        type: "chon5",
      },
      {
        name: "Chọn 6 ăn 1",
        tileCuoc: 1000,
        tileTrathuong: 7200,
        type: "chon6",
      },
      {
        name: "Chọn 7 ăn 1",
        tileCuoc: 1000,
        tileTrathuong: 7000,
        type: "chon7",
      },
      {
        name: "Chọn 8 ăn 1",
        tileCuoc: 1000,
        tileTrathuong: 7200,
        type: "chon8",
      },
      {
        name: "Chọn 9 ăn 1",
        tileCuoc: 1000,
        tileTrathuong: 7120,
        type: "chon9",
      },
      {
        name: "Chọn 10 ăn 1",
        tileCuoc: 1000,
        tileTrathuong: 9000,
        type: "chon10",
      },
    ],
  },
];
export const useTileMegaList = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const tileMegaList = [
    {
      name: t("so_thuong", { ns: "all" }),
      list: [
        {
          name: t("so_thuong", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7200,
          type: "sothuong",
        },
      ],
    },
    {
      name: t("nhieu_so", { ns: "all" }),
      list: [
        {
          name: t("trung_4_so", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7000,
          type: "4so",
        },
        {
          name: t("trung_3_so", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 500,
          type: "3so",
        },
        {
          name: t("trung_2_so", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7000,
          type: "2so",
        },
      ],
    },
    {
      name: t("lo_truot", { ns: "all" }),
      list: [
        {
          name: t("truot_xien_5", { ns: "all" }),
          tileCuoc: 1,
          tileTrathuong: 2,
          type: "truotxien5",
        },
        {
          name: t("truot_xien_6", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7000,
          type: "truotxien6",
        },
        {
          name: t("truot_xien_7", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7000,
          type: "truotxien7",
        },
        {
          name: t("truot_xien_8", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7000,
          type: "truotxien8",
        },
        {
          name: t("truot_xien_9", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7000,
          type: "truotxien9",
        },
        {
          name: t("truot_xien_10", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7000,
          type: "truotxien10",
        },
      ],
    },
    {
      name: t("chon_1", { ns: "all" }),
      list: [
        {
          name: t("chon_5_an_1", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7200,
          type: "chon5",
        },
        {
          name: t("chon_6_an_1", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7200,
          type: "chon6",
        },
        {
          name: t("chon_7_an_1", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7000,
          type: "chon7",
        },
        {
          name: t("chon_8_an_1", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7200,
          type: "chon8",
        },
        {
          name: t("chon_9_an_1", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 7120,
          type: "chon9",
        },
        {
          name: t("chon_10_an_1", { ns: "all" }),
          tileCuoc: 1000,
          tileTrathuong: 9000,
          type: "chon10",
        },
      ],
    },
  ];
  return tileMegaList;
};

export const getTypeMega = (type: string) => {
  let title = "";
  const tileMegaList = useTileMegaList();
  tileMegaList.forEach((item) => {
    item.list.forEach((item2) => {
      if (item2.type === type) {
        title = `[${item.name}]${item2.name}`;
        return;
      }
    });
  });
  return title;
};
