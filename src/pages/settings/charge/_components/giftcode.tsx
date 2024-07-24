import accountApi from "@/apis/accout.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NS } from "@/constants/ns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Giftcode = ({ t001 }: any) => {
  const { t } = useTranslation([NS["ALL"]]);
  const [code, setCode] = useState("");
  const queryClient = useQueryClient();
  const sendGiftcodeMutaion = useMutation({
    mutationFn: () => accountApi.giftCode(code),
    onSuccess: (data) => {
      if (data.data.status) {
        toast.success(data.data.msg);
        setCode("");
        queryClient.invalidateQueries(["profile"]);
        queryClient.invalidateQueries(["trades"]);
      }
    },
  });
  const handleSendGiftcode = () => {
    if (!code) return toast.error(t("vui_long_nhap_giftcode", { ns: "all" }));
    sendGiftcodeMutaion.mutate();
  };
  return (
    <div className="mt-4">
      <p className="my-5 text-[16px] ">{t001("giftcode")}</p>
      <div className="w-full flex justify-start">
        <div className="w-[80%] flex justify-center gap-10 items-center">
          <Label htmlFor="email" className="text-md text-[#90a2dc]">
            {t001("giftcode")}
          </Label>
          <Input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            placeholder={t001("enter_giftcode")}
            className="w-[70%] placeholder:text-slate-400"
          />
        </div>
      </div>
      <Button
        onClick={handleSendGiftcode}
        className="mt-8 text-sm px-10 py-5 rounded-md"
      >
        {t001("confirm")}
      </Button>
    </div>
  );
};

export default Giftcode;
