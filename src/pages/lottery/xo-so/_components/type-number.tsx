import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NS } from "@/constants/ns";
import { useToast } from "@/hooks/use-toast";
import { OrderProps } from "@/types/order.type";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SelectFormProps {
  setOrder: (order: Omit<OrderProps, "type">) => void;
  tiLe: number;
  soNhan: number;
  max?: number;
  cachChoi: any;
}

const TypeNumber = ({
  setOrder,
  tiLe,
  soNhan,
  max,
  cachChoi,
}: SelectFormProps) => {
  const { t } = useTranslation([NS["ALL"]]);
  const [value, setValue] = useState("");
  const { toast } = useToast();

  const handleOrder = () => {
    if (!value) {
      toast({
        title: t("vui_long_nhap_so", { ns: "all" }),
        variant: "destructive",
      });
      return;
    }
    if (
      max &&
      max > 0 &&
      (value.split(",").length > max || value.split(" ").length > max)
    ) {
      toast({
        title:
          t("vui_long_khong_chon_qua", { ns: "all" }) +
          max +
          " " +
          t("so", { ns: "all" }),
        variant: "destructive",
      });
      return;
    }

    let str = value.replace(/\s/g, ",");
    if (str.endsWith(",")) {
      str = str.slice(0, -1);
    }
    let arr = str.split(",");
    let validate = true;
    arr.forEach((item) => {
      if (isNaN(Number(item)) || item.length !== cachChoi.numberLength) {
        validate = false;
        return;
      }
    });
    if (!validate) {
      toast({
        title: t("vui_long_nhap_dung_dinh_dang", { ns: "all" }),
        variant: "destructive",
      });
      return;
    }
    setOrder({
      value: str,
      price: 1000,
      tiLe,
      soNhan,
    });
    setValue("");
  };
  const handleCancel = () => {
    setValue("");
  };
  return (
    <div className="p-4 rounded-md bg-slate-200 dark:bg-slate-700">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={cachChoi.placeholder}
      ></Textarea>
      <div className="w-full flex justify-center space-x-4 mt-6">
        <Button onClick={() => handleCancel()} variant={"secondary"}>
          {t("huy", { ns: "all" })}
        </Button>
        <Button onClick={() => handleOrder()}>
          {t("dat_cuoc", { ns: "all" })}
        </Button>
      </div>
    </div>
  );
};

export default TypeNumber;
