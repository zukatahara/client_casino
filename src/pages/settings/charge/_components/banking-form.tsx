import authApi from "@/apis/auth.api";
import { Card } from "@/components/ui/card";
// import config from "@/constants/config";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ModalRecharge from "./ModalRecharge";
import homeApi from "@/apis/home.api";
import { URL } from "@/constants/url";

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

const BankingForm = ({ t }: any) => {
  const [bankSelect, setBankSelect] = useState<Bank>();
  const { data } = useQuery({
    queryKey: ["banks-charge"],
    queryFn: () => authApi.getListBankCharge(),
  });

  const { data: dataSetting } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const min_deposit = dataSetting?.data?.data?.min_deposit || 0;
  const max_deposit = dataSetting?.data?.data?.max_deposit || 0;

  const banks = data?.data.data || [];
  useEffect(() => {
    if (data && data.data.data) {
      setBankSelect(data.data.data[0]);
    }
  }, [data]);

  // console.log(bankSelect);

  return (
    <div className="mt-4">
      {/* <div className="flex flex-wrap gap-4">
        {services.map((service) => (
          <Button
            onClick={() => setServiceSelected(service)}
            variant={
              serviceSelected.name === service.name ? "default" : "outline"
            }
            key={service.name}
          >
            {service.name}
          </Button>
        ))}
      </div> */}
      <div className="flex flex-wrap gap-4 p-2 max-h-[50vh] overflow-y-scroll">
        {/* {serviceSelected.banks.map((bank) => (
          <Card
            className={cn(
              "w-[96px] h-[60px] flex flex-col items-center justify-around",
              bankSelected?.name === bank.name ? "border-2 border-main" : ""
            )}
            key={bank.name}
          >
            <img src={bank.logo} className="w-[86px] h-1/2" alt="" />
            <div className="text-xs text-slate-500 dark:text-slate-200">{bank.name}</div>
          </Card>
        ))} */}

        {banks &&
          banks.length > 0 &&
          banks.map((bank) => (
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
              <div className="text-md  dark:text-slate-200">{bank.bank}</div>
            </Card>
          ))}
      </div>
      <div className="text-[#8491a5] font-[500] mt-5 text-[16px]">
        <p className="mb-1">{t("instructions")}</p>
        {/* <p className="mb-1">{t("instruction_1")}</p> */}
        <p className="mb-1">1. {t("instruction_2")}</p>
        <p className="mb-1">
          2.{" "}
          {t("instruction_3", {
            min_deposit: min_deposit.toLocaleString(),
            max_deposit: max_deposit.toLocaleString(),
          })}
        </p>
        <p className="mb-1">3. {t("instruction_4")}</p>
        <p className="mb-1">4. {t("instruction_5")}</p>
        <p className="mb-1">5. {t("instruction_6")}</p>
        <p className="mb-1">6. {t("instruction_7")}</p>
        <p className="mb-1">7. {t("instruction_8")}</p>
      </div>
      <ModalRecharge bankSelect={bankSelect as Bank} t001={t} />
    </div>
  );
};

export default BankingForm;
