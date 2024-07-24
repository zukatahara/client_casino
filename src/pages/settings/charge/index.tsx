import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BankingForm from "./_components/banking-form";
import QRCodeForm from "./_components/qrcode-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Giftcode from "./_components/giftcode";
import { NS } from "@/constants/ns";
import { useTranslation } from "react-i18next";

const ChargePage = () => {
  const { t } = useTranslation(NS.charge);
  const [tabActive, setTabActive] = useState("bank");
  return (
    <div>
      <h3 className="text-xl">{t("deposit")}</h3>
      <Tabs
        onValueChange={(value) => setTabActive(value)}
        value={tabActive}
        className="w-full mt-4"
      >
        <TabsList className="grid w-full grid-cols-3 p-0 bg-white border-b border-slate-200">
          <TabsTrigger
            className={cn(
              "text-sm bg-none m-0 h-full rounded-none",
              tabActive === "bank" ? "border-b-2 border-[#4a69ff]" : ""
            )}
            value="bank"
          >
            <span className={cn(tabActive === "bank" ? "text-[#4a69ff]" : "")}>
              {t("bank_transfer")}
            </span>
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              "text-sm bg-none m-0 h-full rounded-none",
              tabActive === "qr" ? "border-b-2 border-[#4a69ff]" : ""
            )}
            value="qr"
          >
            <span className={cn(tabActive === "qr" ? "text-[#4a69ff]" : "")}>
              {t("qr_code")}
            </span>
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              "text-sm bg-none m-0 h-full rounded-none",
              tabActive === "code" ? "border-b-2 border-[#4a69ff]" : ""
            )}
            value="code"
          >
            <span className={cn(tabActive === "code" ? "text-[#4a69ff]" : "")}>
              {t("gift_code")}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bank">
          <BankingForm t={t} />
        </TabsContent>
        <TabsContent value="qr">
          <QRCodeForm t001={t} />
        </TabsContent>
        <TabsContent value="code">
          <Giftcode t001={t} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChargePage;
