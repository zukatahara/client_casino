import BackButton from "@/components/back-button";
import "./style.css";
import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const BankDetail = () => {
  const { t } = useTranslation(NS.profile);
  const { profile } = useContext(AppContext);
  if (!profile) return null;
  return (
    <div className="userCenter">
      <div className="bankList">
        <div className="header">
          <div className="van-nav-bar van-nav-bar--fixed">
            <div className="van-nav-bar__content">
              <div className="van-nav-bar__left">
                <BackButton />
              </div>
              <div className="van-nav-bar__title van-ellipsis">
                {t("bank_detail.add")}
              </div>
            </div>
          </div>
        </div>
        <div data-v-0143353b className="scrollList">
          <div data-v-0143353b className="wrapper-tontent">
            <div data-v-0143353b className="header">
              <span data-v-0143353b> {t("bank_detail.account_number")}</span>
              <div data-v-0143353b>{t("bank_detail.account_count")} 1/1</div>
            </div>
            <div data-v-0143353b className="body">
              <div data-v-97b4bb10 className="card card" data-v-0143353b>
                <div data-v-97b4bb10 className="bank">
                  <div data-v-97b4bb10 className="bankName">
                    {profile?.bank_name}
                  </div>
                </div>
                <div data-v-97b4bb10 className="bankNum">
                  {profile?.bank_number}
                </div>
                <div data-v-97b4bb10 className="bankInfo">
                  <div
                    role="radiogroup"
                    className="van-radio-group"
                    data-v-97b4bb10
                  >
                    <div
                      role="radio"
                      tabIndex={0}
                      aria-checked="true"
                      className="van-radio"
                    >
                      <div className="van-radio__icon van-radio__icon--round van-radio__icon--checked">
                        <span className="radio-style iconfont icon-icon_radio_button_sel1" />
                      </div>
                      <span className="van-radio__label">
                        <span>{t("bank_detail.default")}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
              {/**/}
            </div>
            <div data-v-0143353b className="botoom" />
          </div>
          <div
            data-v-0143353b
            className="custom-horizontal-scrollbar"
            style={{ display: "none" }}
          >
            <div data-v-0143353b className="custom-horizontal-indicator" />
          </div>
        </div>
        {/**/}
      </div>
    </div>
  );
};

export default BankDetail;
