import accountApi from "@/apis/accout.api";
import authApi from "@/apis/auth.api";
import { AppContext } from "@/contexts/app.context";
import { formatCurrency } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, FileClock, Info } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionModal from "./_component/modalQuestion";
import toast from "react-hot-toast";
import RefreshMoney from "@/components/refresh-money";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const WalletPage = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const { t: tWallet } = useTranslation(NS.myPurse);
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);
  const [moneyPending, setMoneyPending] = useState(0);

  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["balance"],
    queryFn: () => accountApi.getBalance({ username: profile?.username }),
  });
  const balance = data?.data?.data;
  const getMoneyPending = async () => {
    try {
      const res = await accountApi.getMoneyPending();
      if (res?.data?.status) {
        setMoneyPending(res?.data?.totalMoneyPending || 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getProfile = async () => {
  //     try {
  //         const { data } = await authApi.getProfile()
  //         if (data) {
  //             setProfile(data);
  //         }
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  useEffect(() => {
    getMoneyPending();
  }, []);

  const refresh = async () => {
    try {
      const { data } = await authApi.refresh();
      if (data) {
        toast.success(t("complete", { ns: "all" }));
        getMoneyPending();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <QuestionModal open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between px-4  py-3 border-b-[1px] border-b-[#505e8e] ">
        <ChevronLeft
          className="text-[#fff] cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h3 className="text-[#fff] font-[600] text-[18px]  text-center">
          {t("vi_tien_cua_toi")}
        </h3>

        <FileClock color="white" className="mr-3" />
      </div>

      <div className="grid grid-cols-1 gap-2 mr-3 mt-2 px-4">
        <div className="py-1 px-3 mt-4 bg-[#35416d] rounded-lg shadow-[0_0.053rem_0.107rem_0_rgba(0,0,0,.2)] grid grid-cols-2">
          <div className="grid grid-cols-1 gap-1 border-r-[1px] border-r-[#505e8e] pr-2">
            <div className="grid">
              <span className="text-[#21e06b] text-[13px]">
                {formatCurrency(profile?.money || 0)}
              </span>
              <span className="text-[#e9cfa4] text-[12px]">
                {t("tong_so_du", { ns: "all" })}:&nbsp; 
              </span>
            </div>
            <div className="grid">
              <span className="text-[#21e06b] text-[13px]">
                {formatCurrency(profile?.money || 0)}
              </span>
              <div className="text-[#e9cfa4] text-[12px] flex justify-between">
                {tWallet("wallet_balance")}&nbsp; 
                <RefreshMoney />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1 ml-2">
            <div className="flex justify-end mt-2">
              <Info size={16} color="#e9cfa4" onClick={() => setOpen(!open)} />
            </div>
            <div className="grid">
              <span className="text-[#21e06b] text-[13px]">
                {formatCurrency(moneyPending || 0)}
              </span>
              <div className="text-[#e9cfa4] text-[11px] flex justify-between items-end">
                {t("so_du_cho_xu_li")}&nbsp; 
                <RefreshMoney onClick={getMoneyPending} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-[#5164ff] text-white py-1 px-2 rounded-[50px] text-[12px] flex gap-1 items-center justify-center"
            onClick={refresh}
          >
            <img
              src="/icon-chuyen-tien-ve-sanh.png"
              alt=""
              className="w-[20px]"
            />
            <span className="mt-1"> {t("an_de_chuyen_ve", { ns: "all" })}</span>
          </button>
        </div>
        {balance?.map((item: any) => {
          return (
            <div
              key={item.providercode}
              className="p-2 bg-[#35416d] shadow-[0_0_0.053rem_0_rgba(0,0,0,.1)] rounded-md flex justify-between"
            >
              <div className="flex items-center gap-1">
                <div className="bg-[#292b31] w-10 h-10 rounded-full flex justify-center items-center">
                  <img
                    src={item.icon_logo}
                    className="w-full object-cover"
                    alt=""
                  />
                </div>

                <div className="">
                  <p className="text-[#fff] text-[14px] ">{item.title}</p>
                  <span className="text-[#e9cfa4] text-[13px]">
                    {item.balance}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#a7bcff]  cursor-pointer">
                <span className=" text-[13px]">{tWallet("game")}</span>
                <ChevronRight onClick={() => {}} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletPage;
