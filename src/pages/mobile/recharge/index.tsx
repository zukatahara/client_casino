import "./style.css";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authApi from "@/apis/auth.api";
import { cn } from "@/lib/utils";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/back-button";
// import Config from "@/constants/config";
import { Link, useSearchParams } from "react-router-dom";
import { formatCurrency } from "@/utils/utils";
import toast from "react-hot-toast";
import GenQr from "@/pages/settings/charge/_components/gen-qr";
import { Button } from "@/components/ui/button";
// import { formatCurrency } from "@/utils/utils";
import iconBank from "@/assets/images/icon-the.png";
import iconQr from "@/assets/images/icon-qr.png";
import accountApi from "@/apis/accout.api";
import homeApi from "@/apis/home.api";
//@ts-ignore
import * as RadioGroup from "@radix-ui/react-radio-group";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
interface Bank {
  bank: string;
  bank_account: string;
  bank_number: string;
  created_at: Date;
  id: number;
  qr_code: string;
  status: number;
}

const priceSampleList = [
  {
    lable: "+50k",
    value: 50000,
  },
  {
    lable: "+100k",
    value: 100000,
  },
  {
    lable: "+500k",
    value: 500000,
  },
  {
    lable: "+1M",
    value: 1000000,
  },
  {
    lable: "+5M",
    value: 5000000,
  },
  {
    lable: "+10M",
    value: 10000000,
  },
  {
    lable: "+50M",
    value: 50000000,
  },
];

const RechargeMobilePage = () => {
  const POINT = 1;
  const { t } = useTranslation(NS.charge);
  // const config = Config();
  const [searchParams, _] = useSearchParams();
  const [code, setCode] = useState("");
  const [tabActive, setTabActive] = useState(0);

  const [open, setOpen] = useState(false);
  const [money, setMoney] = useState<number>(50000);
  const [qrCode, setQrCode] = useState<string>();
  const { profile } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [bankSelect, setBankSelect] = useState<Bank>();
  //@ts-ignore
  const [discountSelect, setDiscountSelect] = useState<string>(
    searchParams.get("km") || ""
  );
  const queryClient = useQueryClient();

  const { data: dataSetting } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const min_deposit = dataSetting?.data?.data?.min_deposit || 0;
  const max_deposit = dataSetting?.data?.data?.max_deposit || 0;
  const { data } = useQuery({
    queryKey: ["banks-charge"],
    queryFn: () => authApi.getListBankCharge(),
  });
  const { data: dataDiscount } = useQuery({
    queryKey: ["discount"],
    queryFn: () => homeApi.getPromotion(""),
  });

  const discount = dataDiscount?.data.data;

  const banks = data?.data.data || [];
  useEffect(() => {
    if (data && data.data.data) {
      setBankSelect(data.data.data[0]);
    }
  }, [data]);
  //@ts-ignore
  const { toast: toast2 } = useToast();

  const sendGiftcodeMutaion = useMutation({
    mutationFn: () => accountApi.giftCode(code),
    onSuccess: (data) => {
      if (data.data.status) {
        toast.success(data.data.msg);
        setCode("");
        queryClient.invalidateQueries(["profile"]);
      }
    },
  });
  const handleSendGiftcode = () => {
    if (!code) return toast.error(t("enterGiftCode"));
    sendGiftcodeMutaion.mutate();
  };

  const genQrCodeMutation = useMutation({
    mutationFn: () => {
      return authApi.genQRCode({
        chutk: bankSelect?.bank_account as string,
        namebank: bankSelect?.bank as string,
        stk: bankSelect?.bank_number as string,
        money: money as number,
        noidung: profile?.username as string,
      });
    },
    onSuccess: (data) => {
      if (data.data.status) {
        setQrCode(data.data.qr_code);
        setOpen(true);
      }
    },
  });

  const handleGenQRCode = () => {
    if (!money || money < min_deposit) {
      return toast.error(
        `${t("depositAmountError")} ${min_deposit.toLocaleString()}`
      );
    }
    if (money > max_deposit) {
      return toast.error(
        `${t("depositAmountError")} ${max_deposit.toLocaleString()}`
      );
    }
    const checkKM = discount?.find(
      (item) => item.id === parseInt(discountSelect)
    );

    if (checkKM && Number(money) < checkKM.money_min_get) {
      return toast.error(`${t("depositAmountPromoError")}`);
    }
    genQrCodeMutation.mutate();
  };

  const chargeMutation = useMutation({
    mutationFn: ({ money, km }: { money: number; km: string }) => {
      return authApi.charge({
        chutk: bankSelect?.bank_account as string,
        money,
        km: km || "",
        namebank: bankSelect?.bank as string,
        noidung: profile?.username as string,
        stk: bankSelect?.bank_number as string,
      });
    },
    onSuccess: (data) => {
      if (data.data.status) {
        setMoney(0);
        setOpen(false);
        // toast2({
        //   title: "Chuyển khoản thành công",
        // });
        toast.success(`${t("successfulDepositRequest")}`);
      }
    },
  });
  const onSubmit = () => {
    if (!money || money < min_deposit) {
      return toast.error(
        `${t("depositAmountError")} ${min_deposit.toLocaleString()}`
      );
    }
    if (money > max_deposit) {
      return toast.error(
        `${t("depositAmountMaxError")} ${max_deposit.toLocaleString()}`
      );
    }
    let validDiscount = "";
    const checkKM = discount?.find(
      (item) => item.id === parseInt(discountSelect)
    );

    if (checkKM && Number(money) >= checkKM.money_min_get) {
      validDiscount = discountSelect;
    }
    if (checkKM && Number(money) < checkKM.money_min_get) {
      return toast.error(`${t("depositAmountPromoError")}`);
    }
    chargeMutation.mutate({ money: Number(money), km: validDiscount });
  };
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${t("copied")}`);
  };
  return (
    <div className="userCenter">
      <div className="recharge">
        <div className="van-nav-bar van-nav-bar--fixed" style={{ zIndex: 20 }}>
          <div className="van-nav-bar__content">
            <div className="van-nav-bar__left">
              <BackButton />
            </div>
            <div className="van-nav-bar__title van-ellipsis">
              <p> {t("deposit")} </p>
            </div>
            <Link to={"/mobile/transaction"} className="van-nav-bar__right">
              <span className="rightText iconfont icon-icon_history" />
            </Link>
          </div>
        </div>
        <div className="scrollList scroll-list">
          <div className="wrapper-tontent">
            {!showForm && (
              <>
                <div className="card">
                  <p className="channelTitle">
                    {" "}
                    {t("paymentMethodSelection")}{" "}
                  </p>
                  <div className="newTop">
                    <div
                      onClick={() => setTabActive(0)}
                      className={cn("channelList newTopItem", {
                        active: tabActive === 0,
                      })}
                    >
                      <img
                        src={iconBank}
                        // src="https://xoso66.me/server/upload/pay/category/627f8ba2065c7.png?v=20231030"
                        alt=""
                        className="icons"
                      />
                      {t("bank_transfer")}
                    </div>
                    <div
                      onClick={() => setTabActive(1)}
                      className={cn("channelList newTopItem", {
                        active: tabActive === 1,
                      })}
                    >
                      <img
                        src={iconQr}
                        // src="https://xoso66.me/server/upload/pay/category/627f8c49201b2.png?v=20231030"
                        alt=""
                        className="icons"
                      />
                      {t("qr_code")}
                    </div>
                    <div
                      onClick={() => setTabActive(2)}
                      className={cn("channelList newTopItem", {
                        active: tabActive === 2,
                      })}
                    >
                      {t("qr_code")}
                    </div>
                  </div>
                </div>

                {tabActive !== 2 && (
                  <div className="card" style={{ pointerEvents: "auto" }}>
                    <p className="title bankTitle"> {t("selectBank")} </p>
                    <div className="bankList newTop gap-2 justify-between max-h-[40vh]  overflow-y-scroll">
                      {banks &&
                        banks.map((item, index) => {
                          if (
                            tabActive === 1 &&
                            (item.bank === "Momo" || item.bank === "VNPAY")
                          )
                            return null;
                          return (
                            <div
                              onClick={() => setBankSelect(item)}
                              key={index}
                              className={cn(
                                "item newTopItem active ",
                                bankSelect?.id === item.id && "active"
                              )}
                            >
                              <div className="left ]">
                                <div className="imgBg">
                                  <img src={`${URL.baseUrl}/${item.logo}`} />
                                </div>
                              </div>
                              <span>{item.bank}</span>
                              {bankSelect?.id === item.id && (
                                <img
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABICAMAAAA+uQBRAAAAkFBMVEUAAACRot2Sot2as+aRo9yRo96SpOGQo92Ro92Qo9yQot2Ro9yQo9yQot2SotyRo9yTo96Uot+XquOWpeGQotz////8/P6fr+H5+v27x+qpt+SksuKZqt/19vzy9PuVpt6So9z+/v7R2PDL0+7CzOuvvObo7PjW3fLO1u+0wefj6Pbc4fTFzu3u8fnt8Pns7/ntWq4PAAAAFHRSTlMA9WAJ1aAq6Pjby7evj3xmTjcbEeRcWTwAAAHySURBVFjDtdTZcoJAEIVhwSSYfeseEHBBUaMm8f3fLopJnVIYpyBzvju4oIt/lh5X/7pHdXMlPaYwEMYA5BGhDEAezgDk4QxAHsoA5KENQB4M4OTBAFIeDGDkAVIeIOUBUh4g5QFSHiDlAVIeIOUBUh4g5QFSHiDlAVIeIOUBUh4g5QFSHiDlAUae6VqAkCf91k88ec8zmRW6yfHsO0/6pTqbCnjOUxotypM3fvNsVc3w9J3PPPG3qlmfvfSYZ5Hg++DvcA2Nqg5rr73dPXNVxf4HX3fPTPdmUucnz3Slexvsf/BzNVffH+fS4L950Mek0qR1nnjRvL5aSqO2efJxMT9LPdSDjTRrmWeyVNVlfHK+jO4lcbcByIMap/dNnKjihNW13D2TlVa2+d+Lr+p5KRaD1rvns9CD0e9ab4+/lIlF1P5wrY0eFB+HtS618iE2tx0OV5poZZdJdhw2mojNfZfDlY20YsqdYoWbPXa6e+KxAla4yYs7j3tCKlZB35nHPWEldg/OPO4JJha7sHUeTBgptqhN8N4ij2UvJbnYPTnzuCfMxS7qd8uDE+f4geeOeTDBXFyBu655YHHpB6K3znkgE6vBaz2PV2E9j0+DsJbHq+iVm+fujZoneqbmCZ76xDzBQ/hO2j2D6Pb+8aV++fwA07kHDZcQPy0AAAAASUVORK5CYII="
                                  alt=""
                                  className="floatImg"
                                  style={{}}
                                />
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                {tabActive === 0 && (
                  <>
                    <div className="card" style={{ pointerEvents: "auto" }}>
                      <p className="title bankTitle"> {t("qrCode")} </p>
                      <img
                        className="w-4/5 block mt-2 mx-auto"
                        src={`${URL.baseUrl}/${bankSelect?.qr_code}`}
                        alt=""
                      />
                    </div>
                    <div className="card" style={{ pointerEvents: "auto" }}>
                      <div className="promptItem">
                        <p>1. {t("paymentReminder")}&nbsp;</p>
                        {/* <p>{t("instruction_1")}</p> */}
                        <p>
                          2.
                          {t("instruction_3", {
                            min_deposit: min_deposit.toLocaleString(),
                            max_deposit: max_deposit.toLocaleString(),
                          })}
                        </p>
                        <p>3. {t("instruction_6")}</p>
                        <p>4. {t("step4")}</p>
                      </div>

                      <div className="send">
                        <div
                          onClick={() => setShowForm(true)}
                          className="sendBtn"
                        >
                          {t("deposit_now")}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {showForm && bankSelect && (
              <>
                <div
                  data-v-1335f42b
                  data-v-0143353b
                  className="wrapper-tontent"
                >
                  <div
                    data-v-1335f42b
                    data-v-0143353b
                    className="wrapper-header"
                  >
                    <p data-v-1335f42b data-v-0143353b className="title">
                      <img
                        data-v-1335f42b
                        data-v-0143353b
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAACSUlEQVRYCc2YvUoDQRDHc0awzVlJMCLYir2mskjlB6Sz9AUE30OQgPgOPkDSGEmXVGIp2kZMLAQrFVE4//9j74zLziV7X7mBcd3ZnZkfu5u93XVKluJ5nguXPWgDugatKkVRGikdouxCO47jvKFMXwDShPag39BZhX3p00yNCMHq0D40qTBGPTYYnMvQVlIKgz9jlq3A4FCBXhuCpWVi7MpMUOwIvU8rc0Qc5oiGQgdOU5Yjo/Mxlzx9aMxizegQer1lnDr04q9pXhL++pyADiQD/L8d1FX5iPIS+qXZ41aX4Mg9aVcLMMAGGkKVAMNNzyQ6oBbHvookXKcvhmR/mycauZuaZN0+5XQPJHowJOv5nmhwodLnYHV6ePseAhAZ3EWE24eyNMkZOr0bGjyDzca0Yujss/APv9qSHEkNGdkbCwhcyyh4nLA1jhDPM5IcouFVakxgv4Ivz1K6VKcB3WF/eNa9ktaxLj+FGFVOWdQCDTdOIUDaZo9A44ioeQONCcRzsCR5A40INJRoYM8baEigm7SBsGgPoLfQU1WeqHIrIhebugRqQ39YMwjb40owunopxSNDx28EvfRx3ZC8k9iRT/y4BiNwISTYFOyxzYBZhrPp6+AzBMPJM1EfHXe0TNwSzqEfmj1ulQe0Y6i+lv4f0BgdQIU4wpIlFEAV55BPKgAV6xqkoIpzUQzmDiNFqCwvjLNfpSegivPYEECpKeSvb/7PMZNQCiyXB6twY9QBpDpGi096vKnwcsAd1/Sk9wQ7n/Tatk96v/K1dmeRRbU+AAAAAElFTkSuQmCC"
                        alt=""
                        className="title-icon"
                      />
                      {t("please_transfer_to_account")}
                    </p>
                  </div>
                  <div
                    data-v-97b4bb10
                    data-v-1335f42b
                    className="card bankBox"
                    data-v-0143353b
                  >
                    <div data-v-1335f42b data-v-97b4bb10 className="item">
                      <div data-v-1335f42b data-v-97b4bb10 className="title">
                        {t("bank")}
                      </div>
                      <div
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="item-info"
                      >
                        <div
                          data-v-1335f42b
                          data-v-97b4bb10
                          className="item-left"
                        >
                          <div
                            data-v-1335f42b
                            data-v-97b4bb10
                            className="items"
                          >
                            {bankSelect.bank}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-v-1335f42b data-v-97b4bb10 className="item">
                      <div data-v-1335f42b data-v-97b4bb10 className="title">
                        {t("accountNumber")}
                      </div>
                      <div
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="item-info"
                      >
                        <div
                          data-v-1335f42b
                          data-v-97b4bb10
                          className="item-left"
                        >
                          <div
                            data-v-1335f42b
                            data-v-97b4bb10
                            className="items"
                          >
                            {bankSelect.bank_number}
                          </div>
                        </div>
                        <span
                          data-v-1335f42b
                          data-v-97b4bb10
                          className="copyText"
                          onClick={() => {
                            copyText(bankSelect.bank_number);
                          }}
                        >
                          {t("copy")}
                        </span>
                      </div>
                    </div>
                    <div data-v-1335f42b data-v-97b4bb10 className="item">
                      <div data-v-1335f42b data-v-97b4bb10 className="title">
                        {t("recipient")}
                      </div>
                      <div
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="item-info"
                      >
                        <div
                          data-v-1335f42b
                          data-v-97b4bb10
                          className="item-left"
                        >
                          <div
                            data-v-1335f42b
                            data-v-97b4bb10
                            className="items"
                          >
                            {bankSelect.bank_account}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-v-1335f42b data-v-97b4bb10 className="item">
                      <div data-v-1335f42b data-v-97b4bb10 className="title">
                        {t("transaction_content")}
                      </div>
                      <div
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="item-info"
                      >
                        <div
                          data-v-1335f42b
                          data-v-97b4bb10
                          className="item-left"
                        >
                          <div
                            data-v-1335f42b
                            data-v-97b4bb10
                            className="items"
                          >
                            {profile?.username}
                          </div>
                        </div>
                        <span
                          data-v-1335f42b
                          data-v-97b4bb10
                          className="copyText"
                          onClick={() => {
                            copyText(profile?.username as string);
                          }}
                        >
                          {t("copy")}
                        </span>
                      </div>
                    </div>
                    <div
                      data-v-1335f42b
                      data-v-97b4bb10
                      className="payPrompt"
                      style={{ display: "none" }}
                    >
                      <span data-v-1335f42b data-v-97b4bb10>
                        {t("depositNote")}
                      </span>
                      &nbsp;
                      <b
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="payammout"
                      />
                    </div>
                  </div>
                  <div
                    data-v-1335f42b
                    data-v-0143353b
                    className="wrapper-header"
                  >
                    <p data-v-1335f42b data-v-0143353b className="title">
                      {t("deposit_information")}
                    </p>
                  </div>
                  <div
                    data-v-97b4bb10
                    data-v-1335f42b
                    className="card moneyBox"
                    data-v-0143353b
                  >
                    <div
                      data-v-1335f42b
                      data-v-97b4bb10
                      className="transferInMoneyList"
                    >
                      <p
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="transferInText"
                      >
                        {t("quick_select")}
                      </p>
                      <div
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="moneyGrid"
                      >
                        <div
                          data-v-1335f42b
                          className="van-grid"
                          data-v-97b4bb10
                        >
                          {priceSampleList.map((item, index) => {
                            return (
                              <div
                                data-v-1335f42b
                                key={index}
                                className="van-grid-item"
                                onClick={() => {
                                  setMoney(item.value);
                                }}
                              >
                                <div
                                  data-v-1335f42b
                                  className="van-grid-item__content van-grid-item__content--center"
                                >
                                  <div data-v-1335f42b className="moneyList">
                                    {item.lable}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="payAmmout"
                      >
                        <div
                          data-v-1335f42b
                          className="van-cell van-field"
                          data-v-97b4bb10
                        >
                          <div className="van-cell__value van-cell__value--alone van-field__value">
                            <div className="van-field__body">
                              <input
                                type="text"
                                autoComplete="off"
                                name="payAmmout"
                                placeholder={`${t(
                                  "deposit_amount"
                                )} ${min_deposit.toLocaleString()}-${max_deposit.toLocaleString()}`}
                                className="van-field__control"
                                value={formatCurrency(money)}
                                onChange={(e) =>
                                  setMoney(
                                    Number(e.target.value.replace(/\D/g, ""))
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-1">
                        {t("tuong_ung", { ns: "all" })}:{" "}
                        <b>{formatCurrency(+money * POINT)}</b>{" "}
                        {t("diem", { ns: "all" })}
                      </p>
                    </div>
                    <div data-v-1335f42b data-v-97b4bb10 className="payPrompt">
                      <p data-v-1335f42b data-v-97b4bb10>
                        {t("transactionNote")}
                      </p>
                    </div>
                  </div>
                  <div
                    data-v-1335f42b
                    data-v-0143353b
                    style={{ display: "none" }}
                  >
                    <p data-v-1335f42b data-v-0143353b className="timeTitle">
                      Vui lòng chọn thời gian chuyển tiền
                    </p>
                    <div
                      data-v-1335f42b
                      data-v-0143353b
                      className="transferTimeBox"
                    >
                      <div
                        data-v-1335f42b
                        className="van-cell van-field"
                        data-v-0143353b
                      >
                        <div className="van-cell__value van-cell__value--alone van-field__value">
                          <div className="van-field__body">
                            <input
                              type="text"
                              autoComplete="off"
                              name="payAmmout"
                              placeholder="Vui lòng chọn thời gian chuyển tiền"
                              className="van-field__control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {discount?.length !== 0 && (
                    <div className="my-2 grid gap-2">
                      <p>Khuyến mãi</p>
                      <RadioGroup.Root
                        className="RadioGroupRoot"
                        value={discountSelect}
                        onValueChange={(value) => {
                          setDiscountSelect(value);
                        }}
                      >
                        {discount?.map((item) => (
                          <div key={item.id}>
                            <div className="flex items-center">
                              <RadioGroup.Item
                                className="RadioGroupItem-mobile"
                                value={item.id.toString()}
                                id={item.id.toString()}
                              >
                                <RadioGroup.Indicator className="RadioGroupIndicator-mobile" />
                              </RadioGroup.Item>

                              <label
                                className="Label text-white "
                                htmlFor={item.id.toString()}
                              >
                                {item.title}
                              </label>
                            </div>
                            <span className="pl-8 font-extralight text-sm text-slate-400">
                              Tối thiểu: {item.money_min_get.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </RadioGroup.Root>
                    </div>
                  )} */}
                  <div data-v-1335f42b data-v-0143353b className="flex gap-4">
                    <Button
                      data-v-1335f42b
                      data-v-0143353b
                      className="text-sm px-10 py-5 rounded-md bg-none border border-main text-main w-[30%]"
                      onClick={() => setShowForm(false)}
                    >
                      {t("cancel")}
                    </Button>
                    <Button
                      onClick={() => onSubmit()}
                      data-v-1335f42b
                      data-v-0143353b
                      className="text-sm px-3 py-5 rounded-md mx-auto w-[100%]"
                    >
                      {t("successfulTransfer")}
                    </Button>
                  </div>
                </div>
              </>
            )}
            {tabActive === 1 && (
              <>
                <div
                  data-v-1335f42b
                  data-v-0143353b
                  className="wrapper-tontent"
                >
                  <div
                    data-v-1335f42b
                    data-v-0143353b
                    className="wrapper-header"
                  >
                    <p data-v-1335f42b data-v-0143353b className="title">
                      {t("deposit_information")}
                    </p>
                  </div>
                  <div
                    data-v-97b4bb10
                    data-v-1335f42b
                    className="card moneyBox"
                    data-v-0143353b
                  >
                    <div
                      data-v-1335f42b
                      data-v-97b4bb10
                      className="transferInMoneyList"
                    >
                      <p
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="transferInText"
                      >
                        {t("quick_select")}
                      </p>
                      <div
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="moneyGrid"
                      >
                        <div
                          data-v-1335f42b
                          className="van-grid"
                          data-v-97b4bb10
                        >
                          {priceSampleList.map((item, index) => {
                            return (
                              <div
                                data-v-1335f42b
                                key={index}
                                className="van-grid-item"
                                onClick={() => {
                                  setMoney(item.value);
                                }}
                              >
                                <div
                                  data-v-1335f42b
                                  className="van-grid-item__content van-grid-item__content--center"
                                >
                                  <div data-v-1335f42b className="moneyList">
                                    {item.lable}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        data-v-1335f42b
                        data-v-97b4bb10
                        className="payAmmout"
                      >
                        <div
                          data-v-1335f42b
                          className="van-cell van-field"
                          data-v-97b4bb10
                        >
                          <div className="van-cell__value van-cell__value--alone van-field__value">
                            <div className="van-field__body">
                              <input
                                type="text"
                                autoComplete="off"
                                name="payAmmout"
                                placeholder={`${t(
                                  "deposit_amount"
                                )} ${min_deposit.toLocaleString()}-${max_deposit.toLocaleString()}`}
                                className="van-field__control"
                                value={formatCurrency(money)}
                                onChange={(e) =>
                                  setMoney(
                                    Number(e.target.value.replace(/\D/g, ""))
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-1">
                        {t("tuong_ung", { ns: "all" })}:{" "}
                        <b>{formatCurrency(+money * POINT)}</b>{" "}
                        {t("diem", { ns: "all" })}
                      </p>
                    </div>
                    <div className="promptItem mt-4">
                      <p>{t("paymentReminder")}&nbsp;</p>
                      {/* <p>{t("instruction_1")}</p> */}
                      <p>
                        1.{" "}
                        {t("instruction_3", {
                          min_deposit: min_deposit.toLocaleString(),
                          max_deposit: max_deposit.toLocaleString(),
                        })}
                      </p>
                      <p>2. {t("instruction_6")}&nbsp;</p>
                      <p>3. {t("step4")}</p>
                    </div>
                  </div>
                  {/* {discount?.length !== 0 && (
                    <div className="my-2 grid gap-2">
                      <p>Khuyến mãi</p>
                      <RadioGroup.Root
                        className="RadioGroupRoot"
                        value={discountSelect}
                        onValueChange={(value) => {
                          console.log(value, "value");
                          setDiscountSelect(value);
                        }}
                      >
                        {discount?.map((item) => (
                          <div key={item.id}>
                            <div className="flex items-center">
                              <RadioGroup.Item
                                // disabled={money < item.money_min_get}
                                className="RadioGroupItem-mobile"
                                value={item.id.toString()}
                                id={item.id.toString()}
                              >
                                <RadioGroup.Indicator className="RadioGroupIndicator-mobile" />
                              </RadioGroup.Item>

                              <label
                                className="Label text-white "
                                htmlFor={item.id.toString()}
                              >
                                {item.title}
                              </label>
                            </div>
                            <span className="pl-8 font-extralight text-sm text-slate-400">
                              Tối thiểu: {item.money_min_get.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </RadioGroup.Root>
                    </div>
                  )} */}
                  <div data-v-1335f42b data-v-0143353b className="w-full gap-4">
                    <GenQr
                      open={open}
                      setOpen={setOpen}
                      handleGenQRCode={() => handleGenQRCode()}
                      qrCode={qrCode as string}
                      handleOk={onSubmit}
                      t={t}
                    />
                  </div>
                </div>
              </>
            )}
            {tabActive === 2 && (
              <>
                <div
                  data-v-1335f42b
                  data-v-0143353b
                  className="wrapper-tontent"
                >
                  <div
                    data-v-1335f42b
                    data-v-0143353b
                    className="wrapper-header"
                  >
                    <p data-v-1335f42b data-v-0143353b className="title">
                      {t("info")}
                    </p>
                  </div>
                  <div
                    data-v-97b4bb10
                    data-v-1335f42b
                    className="card moneyBox"
                    data-v-0143353b
                  >
                    <div data-v-1335f42b data-v-97b4bb10 className="payAmmout">
                      <div
                        data-v-1335f42b
                        className="van-cell van-field"
                        data-v-97b4bb10
                      >
                        <div className="van-cell__value van-cell__value--alone van-field__value">
                          <div className="van-field__body">
                            <input
                              type="text"
                              autoComplete="off"
                              name="payAmmout"
                              placeholder={t("enter_giftcode")}
                              className="van-field__control"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div data-v-1335f42b data-v-0143353b className="w-full gap-4">
                    <Button
                      onClick={handleSendGiftcode}
                      className="mt-8 text-sm px-10 py-5 rounded-md"
                    >
                      {t("confirm")}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeMobilePage;
