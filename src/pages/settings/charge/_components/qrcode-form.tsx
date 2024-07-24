import authApi from "@/apis/auth.api";
import { Card } from "@/components/ui/card";
// import config from "@/constants/config";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import toast from "react-hot-toast";
import GenQr from "./gen-qr";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/utils";
import homeApi from "@/apis/home.api";
//@ts-ignore
import * as RadioGroup from "@radix-ui/react-radio-group";
import "../style.css";
import { useSearchParams } from "react-router-dom";
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
  logo?: string;
}

const moneyList = [
  {
    label: "50k",
    value: 50000,
  },
  {
    label: "100k",
    value: 100000,
  },
  {
    label: "500k",
    value: 500000,
  },
  {
    label: "1M",
    value: 1000000,
  },
  {
    label: "5M",
    value: 5000000,
  },
  {
    label: "10M",
    value: 10000000,
  },
  {
    label: "50M",
    value: 50000000,
  },
  {
    label: "100M",
    value: 100000000,
  },
];

const QrCodeForm = ({ t001 }: any) => {
  const { t } = useTranslation([NS["ALL"]]);

  const { profile } = useContext(AppContext);
  const [searchParams, _] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [money, setMoney] = useState<number>(50000);
  const [qrCode, setQrCode] = useState<string>();
  const [bankSelect, setBankSelect] = useState<Bank>();
  //@ts-ignore
  const [discountSelect, setDiscountSelect] = useState<string>(
    searchParams.get("km") || ""
  );
  const { data } = useQuery({
    queryKey: ["banks-charge"],
    queryFn: () => authApi.getListBankCharge(),
  });

  const banks = data?.data.data || [];
  const { data: dataSetting } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const { data: dataDiscount } = useQuery({
    queryKey: ["discount"],
    queryFn: () => homeApi.getPromotion({}),
  });
  const min_deposit = dataSetting?.data?.data?.min_deposit || 0;
  const max_deposit = dataSetting?.data?.data?.max_deposit || 0;

  const discount = dataDiscount?.data.data;
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
        toast.success(t("yeu_cau_nap_diem_thanh_cong", { ns: "all" }));
        setOpen(false);
      }
    },
  });
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
        `${t001("depositAmountError")} ${formatCurrency(min_deposit || 0)}`
      );
    }
    if (money > max_deposit) {
      return toast.error(
        `${t001("depositAmountMaxError")} ${formatCurrency(max_deposit || 0)}`
      );
    }
    const checkKM = discount?.find(
      (item) => item.id === parseInt(discountSelect)
    );

    if (checkKM && Number(money) < checkKM.money_min_get) {
      return toast.error(t001("depositAmountPromoError"));
    }
    genQrCodeMutation.mutate();
  };
  const onSubmit = () => {
    if (!money || money < min_deposit) {
      return toast.error(
        `${t001("depositAmountError")} ${formatCurrency(min_deposit || 0)}`
      );
    }
    if (money > max_deposit) {
      return toast.error(
        `${t001("depositAmountMaxError")} ${formatCurrency(max_deposit || 0)}`
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
      return toast.error(t001("depositAmountPromoError"));
    }
    chargeMutation.mutate({ money: Number(money), km: validDiscount });
  };
  useEffect(() => {
    if (data && data.data.data) {
      setBankSelect(data.data.data[0]);
    }
  }, [data]);

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4 p-2 max-h-[50vh] overflow-y-scroll">
        {banks &&
          banks.length > 0 &&
          banks.map((bank) => {
            if (bank.bank === "Momo" || bank.bank === "VNPAY") return null;
            return (
              <Card
                onClick={() => {
                  setBankSelect(bank);
                }}
                className={cn(
                  "w-[200px] h-[100px] flex flex-col items-center justify-around cursor-pointer",
                  bankSelect?.id === bank.id
                    ? "outline-1 outline-main outline"
                    : ""
                )}
                key={bank.id}
              >
                <img
                  src={`${URL.baseUrl}${bank?.logo}` || ""}
                  className="w-[90%]"
                  alt=""
                />
                <div className="text-xs  dark:text-slate-200">{bank.bank}</div>
              </Card>
            );
          })}
      </div>
      <div className="mt-4">
        <p className="my-5 text-[16px] ">{t001("deposit_information")}</p>
        <div className="w-full flex justify-start">
          <div className="w-[80%] flex justify-center gap-10 items-center">
            <Label htmlFor="email" className="text-md text-[#90a2dc]">
              {t001("deposit_amount")}
            </Label>
            <Input
              value={formatCurrency(Number(money))}
              onChange={(e) => {
                setMoney(Number(e.target.value.replace(/\D/g, "")));
              }}
              placeholder="50,000 - 300,000,000"
              className="w-[70%] placeholder:text-slate-400"
              min={50000}
              max={300000000}
            />
          </div>
        </div>
        <p className="text-sm mt-3 "> {t001("quick_select")}</p>
        <div className="flex flex-wrap justify-start gap-4 mt-4">
          {moneyList.map((item) => (
            <Button
              onClick={() => setMoney(item.value)}
              variant={"outline"}
              key={item.value}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      {/* {discount?.length !== 0 && (
        <div className="mt-2 grid gap-2">
          <p>Khuyến mãi</p>
          <RadioGroup.Root
            className="RadioGroupRoot"
            value={discountSelect}
            onValueChange={(value) => setDiscountSelect(value)}
          >
            {discount?.map((item) => (
              <div key={item.id}>
                <div className="flex items-center">
                  <RadioGroup.Item
                    // disabled={money < item.money_min_get}
                    className="RadioGroupItem !cursor-pointer"
                    value={item.id.toString()}
                    id={item.id.toString()}
                  >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                  </RadioGroup.Item>

                  <label
                    className="Label dark:text-white"
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
      <div className="text-[#8491a5] font-[500] mt-5 text-[16px]">
        <p className="mb-1">{t001("instructions")}</p>
        {/* <p className="mb-1">{t001("instruction_1")}</p> */}
        <p className="mb-1">1. {t001("instruction_2")}</p>
        <p className="mb-1">
          2.{" "}
          {t001("instruction_3", {
            min_deposit: formatCurrency(min_deposit || 0),
            max_deposit: formatCurrency(max_deposit || 0),
          })}
        </p>
        <p className="mb-1">3. {t001("instruction_4")}</p>
        <p className="mb-1">4. {t001("instruction_5")}</p>
        <p className="mb-1">5. {t001("instruction_6")}</p>
        <p className="mb-1">6. {t001("instruction_7")}</p>
        <p className="mb-1">7. {t001("instruction_8")}</p>
      </div>
      <div className="mt-4">
        <GenQr
          open={open}
          setOpen={setOpen}
          handleGenQRCode={() => handleGenQRCode()}
          qrCode={qrCode as string}
          handleOk={onSubmit}
          t={t001}
        />
      </div>
    </div>
  );
};

export default QrCodeForm;
