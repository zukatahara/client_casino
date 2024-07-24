import authApi from "@/apis/auth.api";
import { Card } from "@/components/ui/card";
import { NS } from "@/constants/ns";
import { formatCurrency } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useTranslation } from "react-i18next";

const TradeHistory = () => {
  const { data } = useQuery({
    queryKey: ["trades"],
    queryFn: () => authApi.getListTransaction(),
  });
  const history = data?.data.data || [];
  const { t } = useTranslation([NS.charge, NS.ALL]);
  return (
    <Card className="w-1/4 p-4">
      <div className="text-base text-slate-600 dark:text-slate-200 flex justify-center p-2 rounded-md bg-slate-50 dark:bg-slate-500">
        {t("tradeHistory", { ns: "charge" })}
        {/* <span className="text-xs text-slate-500 dark:text-slate-200">Khác</span> */}
      </div>
      <div className="mt-4">
        {history &&
          history.map((item, index) => {
            if (item.type === "admin") return;
            return (
              <>
                {" "}
                <div
                  key={index}
                  className="w-full mt-2 rounded-md bg-slate-50 dark:bg-slate-500 p-2"
                >
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-900">
                      {moment(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                    <span className="text-green-600">
                      <span className="text-yellow-500 mr-3">
                        {formatCurrency(item.amount)}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-slate-500 dark:text-slate-200">
                      {item.status === 0 ? (
                        <span className="text-yellow-500">
                          {" "}
                          {t("pending", { ns: "charge" })}
                        </span>
                      ) : item.status === 1 ? (
                        <span className="text-green-500">
                          {t("success", { ns: "charge" })}
                        </span>
                      ) : (
                        <span className="text-red-500">
                          {t("failed", { ns: "charge" })}
                        </span>
                      )}
                    </span>
                    <span className="text-slate-500 dark:text-slate-200 mr-3">
                      {t(item.type)}
                    </span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-200 text-sm">
                    {t(item.description)}
                  </span>
                </div>
              </>
            );
          })}
      </div>
      {!history ||
        (history.length === 0 && (
          <div className="w-full h-full flex justify-start items-center text-center flex-col mt-24">
            <img
              src="data:image/png;base64,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"
              alt=""
            ></img>
            <p className="text-sm text-slate-500 dark:text-slate-200">
              {t("khong_co_lich_su", { ns: "all" })}
            </p>
          </div>
        ))}
    </Card>
  );
};

export default TradeHistory;
