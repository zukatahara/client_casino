import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NS } from "@/constants/ns";
import { useToast } from "@/hooks/use-toast";
import { OrderMegaProps } from "@/types/order.type";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
    <div>
      <Textarea
        className="text-slate-200 bg-[#1e2646] border-0 mt-4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("vi du") + ":10,20,30"}
      ></Textarea>
      <div className="w-full flex justify-center space-x-4 mt-6">
        <Button onClick={() => handleCancel()} variant={"secondary"}>
          {t("huy", { ns: "all" })}
        </Button>
        <Button onClick={() => handleOrder()}>{t("dat cuoc")}</Button>
      </div>
    </div>
  );
};

export default TypeNumber;
