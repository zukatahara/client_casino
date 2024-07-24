import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { Input } from "./ui/input";
import { formatCurrency } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { BodyLaunchGame, gameApi } from "@/apis/game.api";
import toast from "react-hot-toast";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const RecommendMoney = [
  {
    label: "50K",
    value: 50000,
  },
  {
    label: "100K",
    value: 100000,
  },
  {
    label: "200K",
    value: 200000,
  },
  {
    label: "500K",
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
];
export default function ModalLaunchGame({ open, setOpen, gameSelect }: any) {
  const { t } = useTranslation([NS["HOME"], NS["ALL"]]);
  const { theme } = useTheme();
  const { isAuthenticated, profile, setProfile } = useContext(AppContext);
  const [money, setMoney] = useState<Number>(0);
  const launchGameMutation = useMutation({
    mutationFn: (body: BodyLaunchGame) => gameApi.lauchGame(body),
    onSuccess: (data) => {
      if (
        data.data.errMsg &&
        data.data.errMsg !== "SUCCESS" &&
        data.data.type !== 0
      ) {
        toast.error(t("categories.tro_choi_dang_bao_tri", { ns: "all" }));
        return;
      }
      if (data?.data?.type === 0) {
        // @ts-ignore
        setProfile({
          ...profile,
          money: data?.data?.money as number,
        });
        toast.success(t("categories.chuyen_vi_thanh_cong", { ns: "all" }));
      }
      if (data?.data?.type === 1) {
        if (window.innerWidth < 560) {
          window.location.assign(data.data.gameUrl);
        } else window.open(data.data.gameUrl, "_blank");
        setOpen(false);
      }
    },
  });
  const handleLaunchGame = (type: number, money: number) => {
    if (!gameSelect) return;
    if (!isAuthenticated) {
      toast.error(t("categories.ban_can_dang_nhap_de_choi", { ns: "home" }));
      return;
    }
    const data = {
      type: gameSelect.type,
      providercode: gameSelect.providercode,
      html5: "0",
      typeButton: type,
      money,
    };
    launchGameMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent
        className={`w-[90vw] md:w-[900px] rounded-xl z-[99999] ${
          theme === "dark" ? "bg-[#202225]" : "bg-white"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2">
            <img src={gameSelect?.icon1} className="h-[80px] " />
            {gameSelect?.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="">
            <span> {t("so_du_vi", { ns: "all" })}: </span>
            <span className="font-semibold">
              {formatCurrency(profile?.money || 0)}
            </span>
          </div>
          <Input
            placeholder={t("nhap_so_tien_can_chuyen", { ns: "all" })}
            value={money !== 0 ? formatCurrency(Number(money)) : ""}
            onChange={(e) => {
              setMoney(parseInt(e.target.value.replace(/\D/g, "")) || 0);
            }}
            className="text-md py-4 "
          />
          <div className="grid gap-2 grid-cols-4 ">
            {RecommendMoney?.map((item) => (
              <button
                onClick={() => {
                  let value =
                    item.value >= Number(profile?.money)
                      ? profile?.money
                      : item.value;
                  setMoney(Number(value));
                }}
                className={`rounded-2xl text-sm md:text-md md:py-1 py-1 !md:px-3 !px-1 bg-white border border-blue-500 text-blue-500 hover:bg-[linear-gradient(104deg,#7146ff,#4a69ff)] hover:text-white !shadow-lg ${
                  money === item?.value &&
                  "bg-[linear-gradient(104deg,#7146ff,#4a69ff)] text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setMoney(Number(profile?.money));
            }}
            className={`rounded-2xl text-sm md:text-md  py-1.5 !md:px-3 !px-1 bg-white border border-blue-500 text-blue-500 hover:bg-[linear-gradient(104deg,#7146ff,#4a69ff)] hover:text-white !shadow-lg`}
          >
            {t("chuyen_tat_ca", { ns: "all" })}
          </button>
        </div>
        <DialogFooter className="flex flex-row !justify-center gap-5 mt-3">
          <Button
            isLoading={launchGameMutation.isLoading}
            onClick={() => handleLaunchGame(0, Number(money))}
            type="button"
            className={`!py-4 shadow-lg  text-white `}
          >
            {t("chuyen_vi", { ns: "all" })}
          </Button>
          <Button
            isLoading={launchGameMutation.isLoading}
            onClick={() => handleLaunchGame(1, 0)}
            type="button"
            className={`bg-[linear-gradient(104deg,#4BC55B,#4BC590)] !py-4 hover:bg-green-400 shadow-lg ${
              theme === "dark" ? "shodow-none" : "shadow-gray-300"
            } text-white`}
          >
            {t("choi_ngay", { ns: "all" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
