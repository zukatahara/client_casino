import { NS } from "@/constants/ns";
import { Vip } from "@/types/home.type";
import { useTranslation } from "react-i18next";

export default function FeatureVip({
  infoVipSelect,
}: {
  infoVipSelect: Vip | undefined;
}) {
  const { t } = useTranslation(NS.vip);
  return (
    <div className="w-full">
      <h3 className="text-xl text-green-500 font-medium">
        {t("exclusive_privileges")}
      </h3>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="grid gap-3 items-center justify-items-center bg-white rounded-sm p-2">
          <img src="/level-vip/level-up.png" height={64} width={64} />
          <span className="text-black  text-center">{t("level_up_bonus")}</span>
          <button
            className="text-[#8275ff]  p-1 text-sm rounded-sm cursor-not-allowed "
            disabled
          >
            {infoVipSelect?.up_level_reward === 0
              ? t("not_enough_level")
              : `${t("receive")} ${infoVipSelect?.up_level_reward}`}
          </button>
        </div>
        <div className="grid gap-3 items-center justify-items-center bg-white rounded-sm p-2">
          <img src="/level-vip/bonus.png" height={64} width={64} />
          <span className="text-black text-center">{t("monthly_bonus")}</span>
          <button className="text-[#8275ff]  p-1 text-sm rounded-sm cursor-not-allowed ">
            {infoVipSelect?.month_reward === 0
              ? t("not_enough_level")
              : `${t("receive")} ${infoVipSelect?.month_reward}`}
          </button>
        </div>
        <div className="grid gap-3 items-center justify-items-center bg-white rounded-sm p-2">
          <img src="/level-vip/bonus.png" height={64} width={64} />
          <span className="text-black  text-center">{t("weekly_bonus")}</span>
          <button className="text-[#8275ff] p-1 text-sm rounded-sm cursor-not-allowed  ">
            {infoVipSelect?.week_reward === 0
              ? t("not_enough_level")
              : `${t("receive")} ${infoVipSelect?.week_reward}`}
          </button>
        </div>
        <div className="grid gap-3 items-center justify-items-center bg-white rounded-sm p-2">
          <img src="/level-vip/bonus.png" height={64} width={64} />
          <span className="text-black  text-center">{t("birthday_bonus")}</span>
          <button className="text-[#8275ff]  p-1 text-sm rounded-sm cursor-not-allowed ">
            {infoVipSelect?.birth_day_reward === 0
              ? t("not_enough_level")
              : `${t("receive")} ${infoVipSelect?.birth_day_reward}`}
          </button>
        </div>
      </div>
    </div>
  );
}
