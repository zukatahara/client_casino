import { Link } from "react-router-dom";
import "./style.css";
import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import { formatCurrency } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const FundPageHome = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const { profile } = useContext(AppContext);
  return (
    <div data-v-18e657f8 className="fund-index-wp">
      <div data-v-5b4ebc5a data-v-18e657f8 className="fund-wp">
        <div data-v-5b4ebc5a className="van-nav-bar van-nav-bar--fixed">
          <div className="van-nav-bar__content">
            <div className="van-nav-bar__title van-ellipsis">Quản lý quỹ</div>
          </div>
        </div>
        <div data-v-5b4ebc5a className="base-info-wp login-status mt-4">
          <div data-v-5b4ebc5a className="greeting">
            Hi,<span data-v-5b4ebc5a>{profile?.username}</span>
          </div>
          <div data-v-5b4ebc5a className="amount">
            <p data-v-5b4ebc5a className="moneyNum">
              {formatCurrency(profile?.money || 0)}
            </p>
            <p data-v-5b4ebc5a className="moneyTitle">
              {t("tong_so_du", { ns: "all" })}:&nbsp;
            </p>
          </div>
          <div data-v-5b4ebc5a className="amount">
            <p data-v-5b4ebc5a className="moneyNum">
              {formatCurrency(profile?.money || 0)}
            </p>
            <p data-v-5b4ebc5a className="moneyTitle">
              Số dư trong ví&nbsp;
            </p>
          </div>
          <div data-v-5b4ebc5a className="spec">
            Quản lý quỹ
          </div>
        </div>
        <div data-v-5b4ebc5a className="deposit-withdraw-wp">
          <Link data-v-5b4ebc5a to={"/mobile/recharge"} className="d-w-btn">
            <i data-v-5b4ebc5a className="iconfont icon-icon_fund_topup" />
            <span data-v-5b4ebc5a> {t("nap_tien", { ns: "all" })}</span>
          </Link>
          <Link to={"/mobile/withdraw"}>
            <div data-v-5b4ebc5a className="d-w-btn">
              <i data-v-5b4ebc5a className="iconfont icon-icon_fund_withdraw" />
              <span data-v-5b4ebc5a> {t("rut_tien", { ns: "all" })}</span>
            </div>
          </Link>
        </div>
        <div data-v-5b4ebc5a className="items-wp">
          <Link to={"/mobile/wallet"} data-v-5b4ebc5a className="item">
            <div data-v-5b4ebc5a className="left-label">
              <i
                data-v-5b4ebc5a
                className="iconfont icon-icon_transfer_amount"
              />
              <div data-v-5b4ebc5a>Ví của tôi</div>
            </div>
            <i data-v-5b4ebc5a className="iconfont icon-icon_more_white_16" />
          </Link>
          <Link to={"/mobile/transaction"}>
            <div data-v-5b4ebc5a className="item">
              <div data-v-5b4ebc5a className="left-label">
                <i
                  data-v-5b4ebc5a
                  className="iconfont icon-icon_top_up_record"
                />
                <div data-v-5b4ebc5a>Lịch sử nạp</div>
              </div>
              <i data-v-5b4ebc5a className="iconfont icon-icon_more_white_16" />
            </div>
          </Link>
          <Link to={"/mobile/withdraw-history"}>
            <div data-v-5b4ebc5a className="item">
              <div data-v-5b4ebc5a className="left-label">
                <i
                  data-v-5b4ebc5a
                  className="iconfont icon-icon_withdraw_record"
                />
                <div data-v-5b4ebc5a>Lịch sử rút</div>
              </div>
              <i data-v-5b4ebc5a className="iconfont icon-icon_more_white_16" />
            </div>
          </Link>
          <Link to={"/mobile/refund-history"}>
            <div data-v-5b4ebc5a className="item">
              <div data-v-5b4ebc5a className="left-label">
                <i
                  data-v-5b4ebc5a
                  className="iconfont icon-icon_transfer_record"
                />
                <div data-v-5b4ebc5a>
                  {" "}
                  {t("lich_su_hoan_tra", { ns: "all" })}
                </div>
              </div>
              <i data-v-5b4ebc5a className="iconfont icon-icon_more_white_16" />
            </div>
          </Link>
          <Link to={"/mobile/vip-award"}>
            <div data-v-5b4ebc5a className="item">
              <div data-v-5b4ebc5a className="left-label">
                <i
                  data-v-5b4ebc5a
                  className="iconfont icon-icon_funds_details_nor"
                />
                <div data-v-5b4ebc5a>Lịch sử thưởng vip</div>
              </div>
              <i data-v-5b4ebc5a className="iconfont icon-icon_more_white_16" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FundPageHome;
