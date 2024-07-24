// import { useState } from "react";
// import { GrFormPrevious } from "react-icons/gr";

import { NS } from "@/constants/ns";
import { Vip } from "@/types/home.type";
import { useTranslation } from "react-i18next";

// import { GrFormNext } from "react-icons/gr";
function formatNumber(input: string | number) {
  const numberString =
    typeof input === "string"
      ? input.replace(/\D/g, "")
      : input.toString().replace(/\D/g, "");
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const TableVip = ({ vips }: { vips: Vip[] }) => {
  const { t } = useTranslation(NS.vip);

  // const [active, setActive] = useState(0);

  // const listVip = [
  //   "Blue", // Xanh dương
  //   "Red", // Đỏ
  //   "Green", // Xanh lá cây
  //   "Yellow", // Vàng
  //   "White", // Trắng
  //   "Black", // Đen
  //   "Gray", // Xám
  //   "Orange", // Cam
  //   "Purple", // Tím
  //   "Pink", // Hồng
  //   "Brown", // Nâu
  //   "Sky blue", // Xanh da trời
  //   "Light pink", // Hồng nhạt
  //   "Sea green", // Xanh nước biển
  //   "Maroon", // Đỏ rượu vang
  //   "Tan", // Màu da
  //   "Silver", // Màu ghi
  //   "Gold", // Màu vàng nghệ
  // ];

  return (
    <div className="mt-2">
      <div className="flex justify-center">
        <div
          className={`w-[1200px] m-auto min-h-[200px] bg-[#e7e7e7] xs:bg-transparent leading-[35px] p-10 text-[12px] xs:w-full xs:text-[10px] xs:leading-[20px] xs:p-4`}
        >
          <p className="font-bold text-xl text-center my-[30px] xs:text-[14px] xs:my-[15px]">
            {t("detailed_content")}
          </p>
          <h1 className="text-[#FF9900] font-bold text-2xl text-center xs:text-[16px]">
            {t("vip_system")}
          </h1>
          <p className="leading"> {t("event_code")}</p>
          <p className="leading">{t("event_target")}</p>
          <p>{t("start_time")}</p>
          <p>{t("end_time")}</p>
          <p>
            {t("note")}
            <span className="text-[red] font-bold">
              {t("point_conversion")}
            </span>
          </p>
          <p>{t("event_details")}</p>
          <table className="select-none bg-[#ff9900] w-full border border-collapse xs:leading-1 xs:text-[9px]">
            <tr>
              <th className="border">{t("vip_level")}</th>
              <th className="border">{t("total_bet")}</th>
              <th className="border">{t("total_deposit")}</th>
              {/* <th className="border">Cược hợp lệ duy trì</th> */}
              <th className="border">{t("upgrade_bonus")}</th>
              <th className="border">{t("monthly_bonus_new")}</th>
              <th className="border">{t("weekly_bonus_new")}</th>
              <th className="border">{t("birthday_bonus_new")}</th>
            </tr>
            {vips.map((item, i) => {
              return (
                <tr key={i}>
                  <th className="border">{item.level}</th>
                  <th className="border">{formatNumber(item.bet_amount)}</th>
                  <th className="border">
                    {formatNumber(item.deposit_amount)}
                  </th>
                  {/* <th className="border">
                    {formatNumber(item.cuoc_hop_le_duy_tri)}
                  </th> */}
                  <th className="border">
                    {formatNumber(item.up_level_reward)}
                  </th>
                  <th className="border">{formatNumber(item.month_reward)}</th>
                  <th className="border">{formatNumber(item.week_reward)}</th>
                  <th className="border">
                    {formatNumber(item.birth_day_reward)}
                  </th>
                </tr>
              );
            })}
          </table>
          <p>{t("upgrade_instructions")}</p>
          <p>{t("example")}</p>
          <p>{t("monthly_bonus_time")}</p>
          <p>{t("withdrawal_instructions")}</p>
          <p>{t("vip_exclusion")}</p>
          <p>{t("vip_promotion_limit")}</p>
          <p>{t("maintain_vip_level")}</p>
          <p>{t("promotion_fraud")}</p>
          <p>{t("abuse_policy")}</p>
          <p>{t("event_discretion")}</p>
          <p>{t("event_details_agreement")}</p>
        </div>
      </div>
    </div>
  );
};
