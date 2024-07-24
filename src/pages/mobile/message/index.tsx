import authApi from "@/apis/auth.api";
import BackButton from "@/components/back-button";
import { NS } from "@/constants/ns";
import { cn } from "@/lib/utils";
import { Message } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MessageMobile = () => {
  const { t, i18n } = useTranslation([NS["HOME"], NS["ALL"]]);
  const [tabValue, setTabValue] = useState(0);
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
        <div className="userCenter">
          <div className="bankList">
            <div className="header">
              <div className="van-nav-bar van-nav-bar--fixed">
                <div className="van-nav-bar__content">
                  <div className="van-nav-bar__left">
                    <BackButton />
                  </div>
                  <div className="van-nav-bar__title van-ellipsis">
                    {" "}
                    {t("hom_thu", { ns: "all" })}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ top: 68 }} data-v-0143353b className="scrollList">
              <div className="wrapper-tontent">
                <div className="van-tabs van-tabs--card">
                  <div className="van-tabs__wrap">
                    <div
                      role="tablist"
                      className="van-tabs__nav van-tabs__nav--card"
                      style={{
                        background: "rgb(41, 51, 86)",
                        borderRadius: 24,
                        margin: "0 auto",
                      }}
                    >
                      <div
                        role="tab"
                        style={{ color: "rgb(233, 207, 164)" }}
                        aria-selected="true"
                        className={cn(
                          "van-tab",
                          tabValue === 0 && "van-tab--active"
                        )}
                        onClick={() => {
                          setTabValue(0);
                        }}
                      >
                        <span className="van-tab__text van-tab__text--ellipsis">
                          {t("tin_nhan", { ns: "all" })}
                          {(message &&
                            message?.countUnread &&
                            message?.countUnread > 0 && (
                              <div
                                style={{
                                  top: 4,
                                }}
                                className="badge"
                              >
                                <div className="badge-text">
                                  {(message?.countUnread > 0 &&
                                    message?.countUnread) ||
                                    ""}
                                </div>
                              </div>
                            )) ||
                            ""}
                        </span>
                      </div>
                      <div
                        role="tab"
                        style={{ color: "rgb(233, 207, 164)" }}
                        aria-selected="true"
                        className={cn(
                          "van-tab",
                          tabValue === 1 && "van-tab--active"
                        )}
                        onClick={() => {
                          setTabValue(1);
                        }}
                      >
                        <span className="van-tab__text van-tab__text--ellipsis">
                          {t("thong_bao", { ns: "all" })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="van-tabs__content">
                    <div className="van-tab__pane">
                      {tabValue === 0 && (
                        <>
                          {message &&
                            message.data &&
                            message.data.length > 0 &&
                            message.data.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => handleReadMessage(item, "ms")}
                                className="van-hairline--bottom msgList"
                              >
                                <div className="listLeft">
                                  <div className="checkBox"></div>
                                  <div>
                                    <div className="listTop">
                                      <span className="listClassName">
                                        [
                                        {item?.[
                                          `title_${i18n.language}` as "title_vi-VN"
                                        ]
                                          ?.split(" ")
                                          ?.slice(0, 2)
                                          ?.join("")}{" "}
                                        ...]
                                        {item.readed === 0 && (
                                          <i className="redDot" />
                                        )}
                                      </span>
                                      <span className="listTime">
                                        {moment(item.created_at).format(
                                          "DD/MM/yyyy HH:mm"
                                        )}
                                      </span>
                                    </div>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: `${item?.[
                                          `content_${i18n.language}` as "content_vi-VN"
                                        ]
                                          ?.split(" ")
                                          .slice(0, 4)
                                          .join(" ")}...`,
                                      }}
                                      className="listBottom"
                                    ></div>
                                  </div>
                                </div>
                                <div className="listRight flex justify-end items-center h-full">
                                  <span className="text-slate-200">{">"}</span>
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                      {tabValue === 1 && (
                        <>
                          {notice &&
                            notice.data &&
                            notice.data.length > 0 &&
                            notice.data.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => handleReadMessage(item, "ms")}
                                className="van-hairline--bottom msgList"
                              >
                                <div className="listLeft">
                                  <div className="checkBox"></div>
                                  <div>
                                    <div className="listTop">
                                      <span className="listClassName">
                                        [
                                        {item?.[
                                          `title_${i18n.language}` as "title_vi-VN"
                                        ]
                                          ?.split(" ")
                                          .slice(0, 2)
                                          .join("")}{" "}
                                        ...]
                                        {item.readed === 0 && (
                                          <i className="redDot" />
                                        )}
                                      </span>
                                      <span className="listTime">
                                        {moment(item.created_at).format(
                                          "DD/MM/yyyy HH:mm"
                                        )}
                                      </span>
                                    </div>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: `${item?.[
                                          `content_${i18n.language}` as "content_vi-VN"
                                        ]
                                          ?.split(" ")
                                          .slice(0, 4)
                                          .join(" ")}...`,
                                      }}
                                      className="listBottom"
                                    ></div>
                                  </div>
                                </div>
                                <div className="listRight flex justify-end items-center h-full">
                                  <span className="text-slate-200">{">"}</span>
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/**/}
          </div>
        </div>
      )}
      {messageSelect && (
        <div className="userCenter">
          <div className="bankList">
            <div className="header">
              <div className="van-nav-bar van-nav-bar--fixed">
                <div className="van-nav-bar__content">
                  <div className="van-nav-bar__left">
                    <ArrowLeft
                      onClick={() => setMessageSelect(undefined)}
                      className="van-icon van-icon-arrow-left van-nav-bar__arrow"
                    />
                  </div>
                  <div className="van-nav-bar__title van-ellipsis">
                    {t("chi_tiet", { ns: "all" })}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ top: 68 }} data-v-0143353b className="scrollList">
              <div className="wrapper-tontent gap-8">
                <h4 className="text-base font-bold text-slate-200">
                  [
                  {
                    messageSelect.value?.[
                      `title_${i18n.language}` as "title_vi-VN"
                    ]
                  }
                  ]
                </h4>
                <span className="text-sm text-slate-300">
                  {moment(messageSelect.value.created_at).format(
                    "DD/MM/yyyy HH:mm"
                  )}
                </span>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      messageSelect.value?.[
                        `content_${i18n.language}` as "content_vi-VN"
                      ],
                  }}
                  className="text-sm text-slate-300"
                ></div>
              </div>
            </div>
            {/**/}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageMobile;
