import accountApi from "@/apis/accout.api";
import authApi from "@/apis/auth.api";
import RefreshMoney from "@/components/refresh-money";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppContext } from "@/contexts/app.context";
import { formatCurrency } from "@/utils/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { RefreshCcw } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const MyPursePage = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const { profile, setProfile } = useContext(AppContext);
  const [moneyPending, setMoneyPending] = useState(0);
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
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["balance"],
    queryFn: () => accountApi.getBalance({ username: profile?.username }),
  });
  const balance = data?.data?.data;
  const refreshMutation = useMutation({
    mutationFn: () => authApi.refresh(),
    onSuccess: (data) => {
      if (!profile) return;
      setProfile({
        ...profile,
        money: data?.data?.money as number,
      });
      refetch();
      getMoneyPending();
    },
  });

  useEffect(() => {
    getMoneyPending();
  }, []);

  const refresh = async () => {
    try {
      const { data } = await authApi.refresh();
      if (data) {
        toast.success(t("complete", { ns: "all" }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-fit">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {" "}
          {t("vi_tien_cua_toi", { ns: "all" })}
        </h3>
        <p className="text-base text-slate-500 dark:text-slate-200">
          {t("tong_tai_san", { ns: "all" })}
          <span className="text-yellow-500">
            {formatCurrency(profile?.money || 0)}
          </span>
        </p>
      </div>
      <Card className="mt-8 w-full h-52 p-6 border-slate-200 dark:border-slate-700">
        <p> {t("so_du_cua_toi", { ns: "all" })}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="w-full p-6 flex justify-between items-center border border-slate-200 dark:border-slate-700 rounded-md mt-12 mb-12">
            <div className="h-full w-1/2 border-r border-slate-300 relative">
              <p className="text-slate-500 dark:text-slate-200">
                {" "}
                {t("so_du", { ns: "all" })}
              </p>
              <p className="text-yellow-500">
                {formatCurrency(profile?.money || 0)}
                <RefreshMoney className="ml-2" />
              </p>
              <Button
                onClick={() => refreshMutation.mutate()}
                className="bg-[linear-gradient(105deg,#ffe16b,#ffaf13)] hover:bg-yellow-400 absolute top-1 right-2 btn_submit_new"
              >
                {t("an_de_chuyen_ve", { ns: "all" })}
              </Button>
            </div>
            <div className="h-full w-1/2 relative pl-2">
              <p className="text-slate-500 dark:text-slate-200">
                {t("so_du_cho_xu_li", { ns: "all" })}
              </p>
              <p className="text-yellow-500 flex items-center gap-2">
                {formatCurrency(moneyPending || 0)}
                <RefreshMoney onClick={refresh} className="ml-2" />
              </p>
            </div>
          </div>
          {/* <div className="w-1/3 py-2 px-6 flex justify-around border border-slate-200 rounded-md">
            <div className="w-20 h-20 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
              <span className="w-10 h-10 bg-main flex justify-center items-center text-center rounded-full text-white">
                <i
                  style={{ fontSize: "22px" }}
                  className="iconfont icon-icon_vote_record"
                ></i>
              </span>
              <span className="text-xs">Thắng thua</span>
            </div>
            <div className="w-20 h-20 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
              <span className="w-10 h-10 bg-main flex justify-center items-center text-center rounded-full text-white">
                <i
                  style={{ fontSize: "22px" }}
                  className="iconfont icon-icon_top_up_record"
                ></i>
              </span>
              <span className="text-xs">Quỹ tiền</span>
            </div>
          </div> */}
        </div>
      </Card>
      <Card className="mt-8 w-full h-auto p-6 border-slate-200 dark:border-slate-700">
        <p> {t("so_du_thuoc_ben_thu_3", { ns: "all" })}</p>
        <div className="w-full grid grid-cols-4 mt-4 gap-4">
          {isLoading && (
            <>
              <Skeleton className="h-[75px] w-[260px]" />
              <Skeleton className="h-[75px] w-[260px]" />
              <Skeleton className="h-[75px] w-[260px]" />
              <Skeleton className="h-[75px] w-[260px]" />
              <Skeleton className="h-[75px] w-[260px]" />
              <Skeleton className="h-[75px] w-[260px]" />
              <Skeleton className="h-[75px] w-[260px]" />
              <Skeleton className="h-[75px] w-[260px]" />
            </>
          )}

          {balance &&
            balance.length > 0 &&
            balance.map((item, index) => (
              <div key={index} className="third-game-list-item">
                <section className="item-u">
                  <div className="logo-wp">
                    <img src={item?.icon_logo || ""} className="logo" />
                  </div>
                  <div className="name-wp">
                    <div className="name33">{item?.title}</div>
                    <div className="money">
                      {formatCurrency(item?.balance || 0)}
                    </div>
                  </div>
                </section>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default MyPursePage;
