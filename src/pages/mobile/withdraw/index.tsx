import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/back-button";
import AddBankForm from "./_components/add-bank-form";
import RefreshMoney from "@/components/refresh-money";
import { formatCurrency } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authApi from "@/apis/auth.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import homeApi from "@/apis/home.api";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const WithdrawMobilePage = () => {
  const { t } = useTranslation([NS.withdraw, NS["ALL"]]);
  const queryClient = useQueryClient();
  const { profile } = useContext(AppContext);
  const [money, setMoney] = useState(0);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: dataSetting } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });

  const min_withdraw = dataSetting?.data?.data?.min_withdraw || 0;
  const max_withdraw = dataSetting?.data?.data?.max_withdraw || 0;
  const setting = dataSetting?.data.data;
  const withdrawMutation = useMutation({
    mutationFn: (body: { money: number; password: string }) =>
      authApi.withdraw(body),
    onSuccess: (data) => {
      if (data.data.status) {
        toast({
          title: t("withdraw_success", { ns: "withdraw" }),
        });
        queryClient.invalidateQueries(["profile"]);
        setMoney(0);
        setPassword("");
      }
    },
  });
  useEffect(() => {
    if (profile && !profile.isPWV2) {
      navigate("/mobile/change-password");
      toast({
        title: t("quy_khach_chua_cai_dat_mat_khau_rut_tien", {
          ns: "all",
        }),

        variant: "destructive",
      });
      return;
    }
  }, []);

  const handleWithdraw = () => {
    if (!password) {
      toast({
        title: t("please_enter_password", { ns: "withdraw" }),
        variant: "destructive",
      });
      return;
    }
    if (Number(profile?.money) < money) {
      toast({
        title: t("insufficient_balance", { ns: "withdraw" }),
        variant: "destructive",
      });
      return;
    }
    if (money < 100000) {
      toast({
        title: t("min_withdrawal_amount", { ns: "withdraw" }),
        variant: "destructive",
      });
      return;
    }
    withdrawMutation.mutate({
      money,
      password,
    });
  };

  return (
    <div data-v-12d09028 className="userCenter">
      <div data-v-59eb43e9 data-v-12d09028 className="withdrawal">
        <div
          data-v-59eb43e9
          className="van-nav-bar van-nav-bar--fixed"
          style={{ zIndex: 50 }}
        >
          <div className="van-nav-bar__content">
            <div className="van-nav-bar__left">
              <BackButton />
            </div>
            <div className="van-nav-bar__title van-ellipsis">
              <p data-v-59eb43e9> {t("withdraw", { ns: "withdraw" })} </p>
            </div>
            <Link
              to={"/mobile/withdraw-history"}
              className="van-nav-bar__right"
            >
              <span
                data-v-59eb43e9
                className="rightText iconfont icon-icon_history"
              />
            </Link>
          </div>
        </div>
        <div data-v-59eb43e9 className="scrollList overflow-y-scroll">
          <div data-v-59eb43e9 className="wrapper-tontent">
            <div data-v-59eb43e9 className="cardList">
              <div
                data-v-97b4bb10
                data-v-59eb43e9
                className="card moneyBox leftBox"
              >
                <div data-v-59eb43e9 data-v-97b4bb10 className="moneyLeft">
                  <div data-v-59eb43e9 data-v-97b4bb10 className="money">
                    {formatCurrency(profile?.money || 0)}
                  </div>
                  <div data-v-59eb43e9 data-v-97b4bb10 className="moneyText">
                    <span data-v-59eb43e9 data-v-97b4bb10>
                      {t("balance", { ns: "withdraw" })}
                    </span>
                    <div data-v-59eb43e9 data-v-97b4bb10>
                      <RefreshMoney />
                    </div>
                  </div>
                </div>
              </div>
              <div data-v-97b4bb10 data-v-59eb43e9 className="card moneyBox">
                <div data-v-59eb43e9 data-v-97b4bb10 className="moneyRight">
                  <div data-v-59eb43e9 data-v-97b4bb10 className="money">
                    0
                    <Dialog>
                      <DialogTrigger>
                        <i
                          data-v-59eb43e9
                          data-v-97b4bb10
                          className="iconfont icon-icon_remind"
                        />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {t("balancePendingDialogTitle", { ns: "withdraw" })}
                          </DialogTitle>
                          <div data-v-d768ebec className="dialogBody text-left">
                            <p data-v-d768ebec>
                              {t("balancePendingDialogContent.line1", {
                                ns: "withdraw",
                              })}
                            </p>
                            <p data-v-d768ebec>
                              {t("balancePendingDialogContent.line2", {
                                ns: "withdraw",
                              })}
                            </p>
                            <p data-v-d768ebec>
                              {t("balancePendingDialogContent.line3", {
                                ns: "withdraw",
                              })}
                            </p>
                            <p data-v-d768ebec>
                              {t("balancePendingDialogContent.line4", {
                                ns: "withdraw",
                              })}
                            </p>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div data-v-59eb43e9 data-v-97b4bb10 className="moneyText">
                    <span data-v-59eb43e9 data-v-97b4bb10>
                      {t("pending_balance", { ns: "withdraw" })}
                    </span>
                    <div data-v-59eb43e9 data-v-97b4bb10>
                      <RefreshMoney />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form data-v-59eb43e9 className="van-form">
              <p data-v-59eb43e9 className="remindText">
                {t("selectBankAccount", { ns: "withdraw" })}
              </p>
              <div data-v-59eb43e9 className="van-cell van-field">
                <div className="van-cell__value van-cell__value--alone van-field__value">
                  <div className="van-field__body">
                    <input
                      type="text"
                      autoComplete="off"
                      name="bank_name"
                      placeholder={t("selectBankAccount", { ns: "withdraw" })}
                      className="van-field__control"
                      value={
                        `${profile?.bank_number} ${profile?.bank_name}` || ""
                      }
                      readOnly
                    />
                    <div className="van-field__button">
                      <div data-v-59eb43e9 className="bankNameMore">
                        <i
                          data-v-59eb43e9
                          className="iconfont icon-icon_more_white_16"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div data-v-59eb43e9 className="remindTransfer remindText">
                <div data-v-59eb43e9>
                  <i data-v-59eb43e9 className="iconfont icon-icon_remind" />
                </div>
                <span data-v-59eb43e9>
                  {t("withdraw_range_message", { ns: "withdraw" })} (
                  {formatCurrency(min_withdraw)} ~{" "}
                  {formatCurrency(max_withdraw)}){" "}
                </span>
              </div>
              <div data-v-59eb43e9 className="van-cell van-field">
                <div className="van-cell__value van-cell__value--alone van-field__value">
                  <div className="van-field__body">
                    <input
                      type="tel"
                      autoComplete="off"
                      name="ammont"
                      placeholder={t("enter_withdraw_amount", {
                        ns: "withdraw",
                      })}
                      className="van-field__control"
                      onChange={(e) => {
                        setMoney(Number(e.target.value.replace(/\D/g, "")));
                      }}
                      value={formatCurrency(money)}
                    />
                    <div
                      onClick={() => setMoney(profile?.money as number)}
                      className="van-field__button"
                    >
                      <span data-v-59eb43e9 className="maxAmout">
                        {t("max", { ns: "withdraw" })}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div data-v-59eb43e9 className="van-cell van-field">
                <div className="van-cell__value van-cell__value--alone van-field__value">
                  <div className="van-field__body">
                    <input
                      type="password"
                      autoComplete="off"
                      name="fund_password"
                      placeholder={t("enter_withdraw_password", {
                        ns: "withdraw",
                      })}
                      className="van-field__control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                    />
                  </div>
                </div>
              </div>
              <div data-v-59eb43e9 className="hint">
                <p data-v-59eb43e9>
                  {" "}
                  {t("password_prompt", { ns: "withdraw" })}{" "}
                  <span data-v-59eb43e9 className="withdrawalLimit">
                    {" "}
                    ,
                    {t("max_withdraw_per_day", {
                      ns: "withdraw",
                    })}
                    &nbsp;5.{" "}
                  </span>
                </p>
              </div>
              <div data-v-59eb43e9 className="send">
                <div
                  onClick={handleWithdraw}
                  data-v-59eb43e9
                  className="sendBtn"
                >
                  {" "}
                  {t("withdraw", { ns: "withdraw" })}{" "}
                </div>
              </div>
              {setting?.link_cskh && (
                <Link
                  to={`${setting?.link_cskh}`}
                  target="_blank"
                  data-v-59eb43e9
                  className="bottom block"
                >
                  <span data-v-59eb43e9>
                    {t("forgot_withdraw_password", { ns: "withdraw" })}
                  </span>
                </Link>
              )}
            </form>
          </div>
        </div>
        <div
          data-v-59eb43e9
          className="van-overlay"
          style={{ display: "none" }}
        >
          <div data-v-59eb43e9 className="overlay-wrapper overlay-list">
            <div data-v-59eb43e9 className="title">
              {" "}
              {t("select_bank", { ns: "withdraw" })}
              <span
                data-v-59eb43e9
                className="overlay-xbtn iconfont icon-icon_close_white"
              />
            </div>
            <div data-v-0143353b data-v-59eb43e9 className="panel">
              <div data-v-59eb43e9 data-v-0143353b className="wrapper-content">
                <div
                  data-v-59eb43e9
                  role="radiogroup"
                  className="van-radio-group"
                  data-v-0143353b
                >
                  <div
                    data-v-59eb43e9
                    role="radio"
                    tabIndex={-1}
                    aria-checked="false"
                    className="panel-item van-radio"
                  >
                    <div className="van-radio__icon van-radio__icon--round">
                      <span
                        data-v-59eb43e9
                        className="radio-style iconfont icon-icon_radio_button_sel1"
                      />
                    </div>
                    <span className="van-radio__label">
                      {" "}
                      **** **** **** 5561&nbsp;&nbsp;Agribank{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div
                data-v-0143353b
                className="custom-horizontal-scrollbar"
                style={{ display: "none" }}
              >
                <div data-v-0143353b className="custom-horizontal-indicator" />
              </div>
            </div>
          </div>
        </div>
        {/**/}
      </div>
      <AddBankForm open={Boolean(!profile?.bank_number)} t={t} />
    </div>
  );
};

export default WithdrawMobilePage;
