import authApi from "@/apis/auth.api";
import BackButton from "@/components/back-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NS } from "@/constants/ns";
import { formatCurrency } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useTranslation } from "react-i18next";

const TransactionPage = () => {
  const { t } = useTranslation(NS.charge);
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => authApi.getListTransaction(),
  });
  const history = data?.data.data || [];

  return (
    <div>
      <div className="van-nav-bar van-nav-bar--fixed" id="lottery_nav">
        <div className="van-nav-bar__content">
          <div className="van-nav-bar__left">
            <BackButton />
          </div>
          <div className="van-nav-bar__title van-ellipsis">
            <div className="selectAllLottery">
              <span className="allGameSelect">{t("tradeHistory")}</span>
            </div>
          </div>
          <div className="van-nav-bar__right"></div>
        </div>
      </div>
      <ScrollArea className="w-full mt-12 pt-4 container">
        {!history ||
          (history.length === 0 && (
            <div className="w-full mt-2 text-center text-slate-200">
              {t("noData")}
            </div>
          ))}
        {history &&
          history.map((item, index) => {
            if (item.type === "admin") return <></>;
            return (
              <>
                <div
                  key={index}
                  className="w-full mt-2 rounded-md bg-slate-300 p-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-900">
                      {moment(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                    <span className="text-green-600">
                      <span className="text-yellow-500 mr-3">
                        {formatCurrency(item.amount)}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-2">
                    <span className="text-slate-500 dark:text-blue-700">
                      {t(item.description)}
                    </span>
                    <span>
                      {item.status === 0 ? (
                        <span className="text-yellow-600">{t("pending")}</span>
                      ) : item.status === 1 ? (
                        <span className="text-green-600">{t("success")}</span>
                      ) : (
                        <span className="text-red-600">{t("failed")}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-2">
                    <span className="text-slate-500 dark:text-slate-800">
                      {t(item.type)}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
      </ScrollArea>
    </div>
  );
};

export default TransactionPage;
