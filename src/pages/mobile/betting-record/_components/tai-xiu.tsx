import { ScrollArea } from "@/components/ui/scroll-area";
import Config from "@/constants/config";
import { URL } from "@/constants/url";
import { AppContext } from "@/contexts/app.context";
import { formatCurrency } from "@/utils/utils";
import { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

interface HistoryUserProps {
  id: number;
  phien: number;
  UID: string;
  cuadat: string;
  money: number;
  win: string;
  ref: null;
  thanhtoan: number;
  date: Date;
  cuaDat: string;
}

const TaiXiuHistory = () => {
  const config = Config();
  const [historyUser, setHistoryUser] = useState<HistoryUserProps[]>([]);
  const { sendJsonMessage, lastMessage } = useWebSocket(URL.webSocketUrl);
  const { auth } = useContext(AppContext);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const taixiuData = data.taixiu || {};
      const noticeData = data.notice || {};

      if (noticeData.msg === "Đăng nhập thành công") {
        handleGetHistoryByUser();
      }

      if (taixiuData.finish) {
        setTimeout(() => {
          handleGetHistoryByUser();
        }, 13000);
      }

      if (taixiuData.history) {
        if (taixiuData.history.status === true) {
          const historyUserNew = taixiuData.history.data.map(
            (item: { cuadat: keyof typeof config.infoCuoc }) => {
              return { ...item, cuaDat: config.infoCuoc[item.cuadat] };
            }
          );

          setHistoryUser(historyUserNew);
        }
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    const handleLogin = () => {
      sendJsonMessage({
        auth: { token: auth },
      });
    };

    if (auth) {
      handleLogin();
    }
  }, [auth, sendJsonMessage]);

  const handleGetHistoryByUser = () => {
    sendJsonMessage({
      taixiu: {
        history: {
          limit: 50,
          trang: 1,
          totalPage: 0,
        },
      },
    });
  };
  return (
    <ScrollArea className="w-full h-[500px]">
      {historyUser && historyUser.length === 0 && (
        <div className="w-full mt-2 text-center text-slate-200">
          Không có dữ liệu
        </div>
      )}
      {historyUser &&
        historyUser.map((item, index) => (
          <>
            <div
              key={index}
              className="w-full mt-2 rounded-md bg-slate-50 dark:bg-slate-500 p-2"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-900">{item.id}</span>
                <span className="text-green-600">
                  <span className="text-yellow-500 mr-3">
                    +{item.win ? formatCurrency(Number(item.win)) : 0}
                  </span>
                  {item.thanhtoan === 0 && (
                    <span className="text-yellow-500">Chờ mở giải</span>
                  )}
                  {item.thanhtoan !== 0 && (
                    <>
                      {item.win ? (
                        <span className="text-green-600">Thắng</span>
                      ) : (
                        <span className="text-red-600">Thua</span>
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-slate-500 dark:text-slate-200">
                  {item.cuadat}
                </span>
                <span className="text-slate-900">
                  {formatCurrency(item.money)}
                </span>
              </div>
            </div>
          </>
        ))}
    </ScrollArea>
  );
};

export default TaiXiuHistory;
