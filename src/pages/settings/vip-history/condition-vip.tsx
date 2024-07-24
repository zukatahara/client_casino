import { useTranslation } from "react-i18next";
import "./style.css";
import { NS } from "@/constants/ns";
export default function VipCondition({
  profile,
  infoVipSelect,
  total,
  totalBet,
}: any) {
  const { t } = useTranslation(NS.vip);
  const processDeposit =
    total >= infoVipSelect?.deposit_amount
      ? 100
      : 100 -
        ((parseInt(infoVipSelect?.deposit_amount) - parseInt(total)) /
          parseInt(infoVipSelect?.deposit_amount)) *
          100;
  const processBet =
    totalBet >= infoVipSelect?.bet_amount
      ? 100
      : 100 -
        ((parseInt(infoVipSelect?.bet_amount) - parseInt(totalBet)) /
          parseInt(infoVipSelect?.bet_amount)) *
          100;
  return (
    <div>
      <div className="detail-card w-3/5 border-solid border p-2  border-zinc-100 rounded-sm">
        <div className="card-title flex justify-between">
          <span>
            {t("promotion_condition")} "VIP{infoVipSelect?.level}"
          </span>
          <span
            className={`status ${
              profile?.level >= infoVipSelect?.level
                ? "text-green-400 border border-green-500"
                : "text-red-400 border border-red-500"
            } rounded-lg p-1 text-xs`}
          >
            {profile?.level >= infoVipSelect?.level
              ? t("passed")
              : t("not_passed")}
          </span>
        </div>
        <div className="border-top-zinc-100 mt-3">
          <div className="grid">
            <div className="grid gap-2">
              <span>{t("current_points")}</span>
              <div className="flex justify-between">
                <span className="text-xs">
                  {parseFloat(totalBet).toLocaleString()} /{" "}
                  {infoVipSelect?.deposit_amount?.toLocaleString()}
                </span>
                <span className="text-xs">
                  {totalBet >= infoVipSelect?.deposit_amount
                    ? t("congratulations")
                    : `${t("missing")} ${(
                        parseInt(infoVipSelect?.deposit_amount) -
                        parseInt(totalBet)
                      ).toLocaleString()}`}
                </span>
              </div>
              <div className="item-progress-bar">
                <div
                  className={`progress-line gold`}
                  style={{
                    width: `${processBet}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="grid gap-2">
              <span>{t("total_deposit_upgrade")}</span>
              <div className="flex justify-between">
                <span className="text-xs">
                  {total?.toLocaleString()} /{" "}
                  {infoVipSelect?.bet_amount?.toLocaleString()}
                </span>
                <span className="text-xs">
                  {total >= infoVipSelect?.bet_amount
                    ? t("congratulations")
                    : `${t("missing")} ${(
                        parseInt(infoVipSelect?.bet_amount) - parseInt(total)
                      ).toLocaleString()}`}
                </span>
              </div>
              <div className="item-progress-bar">
                <div
                  className={`progress-line green`}
                  style={{
                    width: `${processDeposit}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}