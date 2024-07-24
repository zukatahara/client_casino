import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { OrderMegaProps } from "@/types/order.type";
import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface SelectFormProps {
  setOrder: (order: Omit<OrderMegaProps, "type">) => void;
}

const TypeNumber = ({ setOrder }: SelectFormProps) => {
  const { t } = useTranslation(NS.mega);
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const handleOrder = () => {
    if (!value) {
      toast({
        title: t("vui long nhap so"),
        variant: "destructive",
      });
      return;
    }
    setOrder({
      so: value,
      sodiem: 1000,
    });
    setValue("");
  };
  const handleCancel = () => {
    setValue("");
  };
  return (
    <div className="p-4 rounded-md bg-slate-200 dark:bg-slate-700">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></Textarea>
        <div className={classNames("playExplain", { hidden: !!value })}>
          {t("vi du")}: 01<span>,</span>02<span>,</span>03 {t("hoac")} 01 02 03{" "}
          {t("hoac")} 01
          <span>;</span>02<span>;</span>03 {t("hoac")} 01<span>|</span>02
          <span>|</span>03
        </div>
      </div>

      <div className="w-full flex justify-center space-x-4 mt-6">
        <Button onClick={() => handleCancel()} variant={"secondary"}>
          {t("huy")}
        </Button>
        <Button onClick={() => handleOrder()}>{t("dat cuoc")}</Button>
      </div>
    </div>
  );
};

export default TypeNumber;
