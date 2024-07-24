import authApi from "@/apis/auth.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppContext } from "@/contexts/app.context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
// import config from "@/constants/config";
import { formatCurrency } from "@/utils/utils";
import homeApi from "@/apis/home.api";
import { useSearchParams } from "react-router-dom";
//@ts-ignore
import * as RadioGroup from "@radix-ui/react-radio-group";
import "../style.css";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
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

const ModalRecharge = ({
  bankSelect,
  t001,
}: {
  bankSelect: Bank;
  t001: any;
}) => {
  const { t } = useTranslation([NS["ALL"]]);
  const POINT = 1;
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, _] = useSearchParams();
  const { profile } = useContext(AppContext);
  const [money, setMoney] = useState<number>(50000);
  //@ts-ignore
  const [discountSelect, setDiscountSelect] = useState<string>(
    searchParams.get("km") || ""
  );
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
      }
    },
  });
  const { data: dataSetting } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const { data } = useQuery({
    queryKey: ["discount"],
    queryFn: () => homeApi.getPromotion(""),
  });
  const min_deposit = dataSetting?.data?.data?.min_deposit || 0;
  const max_deposit = dataSetting?.data?.data?.max_deposit || 0;
  const discount = data?.data.data;
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

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
    toast.success(t001("copied"));
  };

  if (!bankSelect) return <></>;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="ml-auto">
        <div className="mt-4">
          <Button className="text-sm px-20 py-5 rounded-md">
            {t001("deposit_now")}
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-xl p-0 h-[75vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="shadow-[inset_0_-1px_0_0_rgba(144,162,220,.4)]">
            <div className="text-center font-normal text-lg p-3 text-[#8491a5]">
              {t001("transaction_details")}
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-5 text-[14px] text-[#8491a5]">
          <p className="text-[16px]"> {t001("please_transfer_to_account")}</p>

          <div className="flex justify-center flex-col items-center">
            <div className="flex justify-center items-center gap-10">
              <Card
                className={cn(
                  "w-[200px] h-[100px] p-2 flex flex-col items-center justify-around cursor-pointer mt-5 outline-1 outline-main outline"
                )}
              >
                <img
                  src={`${URL.baseUrl}${bankSelect?.logo}` || ""}
                  className="w-[90%]"
                  alt=""
                />
                <div className="text-md ">{bankSelect?.bank}</div>
              </Card>
              <img
                className="w-32 block mx-auto mt-2"
                src={`${URL.baseUrl}${bankSelect?.qr_code}`}
                alt=""
              />
            </div>

            <div className="w-[80%] mt-5 grid gap-3">
              <div className="flex justify-between">
                <div className="flex w-[70%]">
                  <p className="text-[#90a2dc]  flex-1">{t001("account")}</p>
                  <p className=" flex-1">{bankSelect?.bank_number}</p>
                </div>
                <button
                  className="text-orange-300"
                  onClick={() => copyToClipboard(bankSelect?.bank_number)}
                >
                  {t001("copy")}
                </button>
              </div>
              <div className="flex justify-between">
                <div className="flex  w-[70%]">
                  <p className="text-[#90a2dc]  flex-1">
                    {t001("recipient_name")}
                  </p>
                  <p className=" flex-1">{bankSelect?.bank_account}</p>
                </div>
                <button
                  className="text-orange-300"
                  onClick={() => copyToClipboard(bankSelect?.bank_account)}
                >
                  {t001("copy")}
                </button>
              </div>
              <div className="flex justify-between">
                <div className="flex  w-[70%]">
                  <p className="text-[#90a2dc] flex-1">
                    {t001("transaction_content")}
                  </p>
                  <p className=" flex-1">{profile?.username}</p>
                </div>
                <button
                  className="text-orange-300"
                  onClick={() => copyToClipboard(profile?.username)}
                >
                  {t001("copy")}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="my-5 text-[16px] ">{t001("deposit_information")}</p>
            <div className="w-full flex justify-center">
              <div className="w-[80%] flex justify-center gap-10 items-baseline ">
                <Label htmlFor="email" className="text-md text-[#90a2dc]">
                  {t001("deposit_amount")}
                </Label>
                <div className="flex-1">
                  <Input
                    value={formatCurrency(Number(money))}
                    onChange={(e) => {
                      setMoney(Number(e.target.value.replace(/\D/g, "")));
                    }}
                    // type="number"
                    placeholder="50,000 - 300,000,000"
                    className="w-[100%] placeholder:text-slate-400"
                    min={50000}
                  />
                  <p className="mt-1">
                    {t("tuong_ung", { ns: "all" })}:{" "}
                    <b>{formatCurrency(+money * POINT)}</b>{" "}
                    {t("diem", { ns: "all" })}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm mt-3 ">{t001("quick_select")}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {moneyList.map((item) => (
                <Button
                  onClick={() => setMoney(Number(item.value))}
                  variant={"outline"}
                  key={item.value}
                >
                  {item.label}
                </Button>
              ))}
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
          </div>

          <p className="text-red-500 text-center mt-3 text-[16px]">
            {t001("note")}
          </p>
          <div className="my-5 grid grid-cols-2 gap-2">
            <Button
              className="text-sm px-10 py-5 rounded-md"
              onClick={() => setIsOpen(false)}
              variant={"secondary"}
            >
              {t001("cancel")}
            </Button>

            <Button
              onClick={onSubmit}
              className="text-sm px-10 py-5 rounded-md"
            >
              {t001("deposit_now")}
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ModalRecharge;
