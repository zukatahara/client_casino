import authApi from "@/apis/auth.api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NS } from "@/constants/ns";
import { cn } from "@/lib/utils";
import { Message } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MessagePage = () => {
  const { t, i18n } = useTranslation([NS["ALL"]]);
  const queryClient = useQueryClient();
  const { data: dataMessgae } = useQuery({
    queryKey: ["message"],
    queryFn: () => authApi.getListMessage(),
  });
  const { data: dataNotice } = useQuery({
    queryKey: ["notice"],
    queryFn: () => authApi.getListNotice(),
  });
  const [messageSelect, setMessageSelect] = useState<{
    type: "ms" | "nt";
    value: Message;
  }>();
  const handleReadMessage = (value: Message, type: "ms" | "nt") => {
    setMessageSelect({
      type,
      value,
    });
    if (type === "ms") {
      readMessageMutation.mutate(value.id);
    }
  };
  const readMessageMutation = useMutation({
    mutationFn: (id: number) => authApi.readMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["message"]);
    },
  });
  const message = dataMessgae?.data.data;
  const notice = dataNotice?.data.data;
  return (
    <>
      {!messageSelect && (
        <Tabs defaultValue="account" className="w-full messageCenter h-[600px]">
          <TabsList>
            <TabsTrigger className="relative" value="account">
              {t("tin_nhan")}
              {(message && message?.countUnread && message?.countUnread > 0 && (
                <div className="badge">
                  <div className="badge-text">
                    {(message?.countUnread > 0 && message?.countUnread) || ""}
                  </div>
                </div>
              )) ||
                ""}
            </TabsTrigger>
            <TabsTrigger value="password">
              {" "}
              {t("thong_bao", { ns: "all" })}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            {message?.data?.map((item, index) => (
              <div
                onClick={() => handleReadMessage(item, "ms")}
                key={index}
                className={cn(
                  "msgBox cursor-pointer",
                  item.readed === 1 ? "grey" : ""
                )}
              >
                <div className="msgTitle flexB">
                  <div className="flex">
                    <span> {t("tin_nhan_moi_nhat", { ns: "all" })}</span>
                    <div>
                      {item?.[`title_${i18n.language}` as "title_vi-VN"]}
                    </div>
                  </div>
                  <p>{moment(item.created_at).format("DD/MM/yyyy h:mm:ss")}</p>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.[`content_${i18n.language}` as "title_vi-VN"],
                  }}
                  className="msgContent"
                ></div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="password">
            {notice?.data?.map((item, index) => (
              <div
                onClick={() => handleReadMessage(item, "ms")}
                key={index}
                className={cn(
                  "msgBox cursor-pointer",
                  item.readed === 1 ? "grey" : ""
                )}
              >
                <div className="msgTitle flexB">
                  <div className="flex">
                    <span> {t("thong_bao_moi_nhat", { ns: "all" })} </span>
                    <div>
                      {item?.[`title_${i18n.language}` as "title_vi-VN"]}
                    </div>
                  </div>
                  <p>{moment(item.created_at).format("DD/MM/yyyy h:mm:ss")}</p>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      item?.[`content_${i18n.language}` as "content_vi-VN"],
                  }}
                  className="msgContent"
                ></div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      )}
      {messageSelect && (
        <div className="w-full h-[600px]">
          <div
            onClick={() => setMessageSelect(undefined)}
            className="cardTitle cursor-pointer border-b border-b-slate-300 dark:bg-transparent dark:text-slate-200 dark:border-b-slate-500"
          >
            <div className="slotTitle flex">
              <ArrowLeft className="dark:text-slate-400" />
              <span className="titleText dark:text-slate-400">
                {t("chi_tiet", { ns: "all" })}{" "}
              </span>
            </div>
          </div>
          <div className="detailPage">
            <div>
              <div className="top">
                <p>
                  {" "}
                  {
                    messageSelect.value?.[
                      `title_${i18n.language}` as "title_vi-VN"
                    ]
                  }{" "}
                </p>
                <div className="timeBox">
                  <span>
                    {moment(messageSelect.value.created_at).format(
                      "DD/MM/yyyy h:mm:ss"
                    )}
                  </span>
                </div>
              </div>
              <div className="main">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      messageSelect.value?.[
                        `content_${i18n.language}` as "title_vi-VN"
                      ],
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagePage;
