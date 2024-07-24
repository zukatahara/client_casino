import authApi from "@/apis/auth.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppContext } from "@/contexts/app.context";
import { Message } from "@/types/user.type";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
const NoticeModal = () => {
  const { setIsOpenModal, isOpenModal } =
    useContext(AppContext);
  // if (!isAuthenticated) return <></>;
  // const { data: dataNotice } = useQuery({
  //   queryKey: ["notice"],
  //   queryFn: () => authApi.getListNotice(),
  // });

  const [data, setData] = useState<any>(null);

  const getData = () => {
    authApi.getListNotice().then((res) => {
      if (res?.data?.status) {
        setData(res.data.data);
        setIsOpenModal(true)
      }
    });
  }
  const [messageSelect, setMessageSelect] = useState<Message>();

  useEffect(() => {
    getData()
  }, [])

  const isMobile = window.innerWidth <= 768;

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      {
        !isMobile ? <DialogContent className="notice-md max-w-5xl">
          <DialogHeader>
            <DialogTitle>Thông báo mới nhất</DialogTitle>
          </DialogHeader>
          <div className="announcement">
            <div className="tab-wp w-[100px]">
              <span className="tab active"> Thông báo mới nhất</span>
            </div>
            {!messageSelect && (
              <div className="announceContent">
                {data &&
                  data.data &&
                  data.data.length > 0 &&
                  data.data.map((item: any) => {
                    return (
                      <div
                        onClick={() => setMessageSelect(item)}
                        key={item.id}
                        className="tab-content-wp"
                      >
                        <div className="content-wp">
                          <div className="content-title-wp">
                            <div className="title line-clamp-1">{item.title}</div>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                            className="content"
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {messageSelect && (
              <div className="announceDetail">
                <div className="head">
                  <span onClick={() => setMessageSelect(undefined)}>
                    <ArrowLeft className="el-icon-back" />
                  </span>
                  <div
                    style={{
                      width: 1,
                      height: 20,
                      background: "rgb(255, 255, 255)",
                    }}
                  />
                  <span className="title">{messageSelect.title}</span>
                </div>
                <p className="time" style={{ marginLeft: 20, marginTop: 20 }}>
                  {moment(messageSelect.created_at).format("DD/MM/YYYY HH:mm:ss")}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: messageSelect.content }}
                  className="body"
                ></div>
                <div className="el-loading-mask" style={{ display: "none" }}>
                  <div className="el-loading-spinner">
                    <svg viewBox="25 25 50 50" className="circular">
                      <circle
                        cx={50}
                        cy={50}
                        r={20}
                        fill="none"
                        className="path"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

          </div>
        </DialogContent> :
          <DialogContent className="w-[95vw] h-[450px] bg-[#1b233d] p-2 rounded-2xl">
            <div className="w-[93vw]">
              <h2 className="text-center  text-white text-xl">Thông báo mới nhất</h2>
              <div className="flex text-white mt-3">
                <div className="w-[30%] h-full border-r-[1px] border-r-[#1b233d]">
                  <div className=" h-[40px] bg-[#293356] border-l-[1px] border-l-[#e9cfa4] overflow-hidden flex items-center">
                    <span className="text-[13px] text-[#e9cfa4] mx-2 truncate ">
                      Thông báo mới nhất
                    </span>
                  </div>
                </div>
                <div className="w-[full] bg-[#293356] overflow-y-scroll h-[398px] ">
                  {
                    !messageSelect && data && data.data && data.data.length > 0 && data.data.map((item: any) => {
                      return (
                        <div
                          onClick={() => setMessageSelect(item)}
                          key={item.id}
                          className="h-auto max-h-[112px] p-1 border-b-[1px] border-b-[linear-gradient(180deg,transparent 40%,#90a2dc)] flex flex-col items-center w-full"
                        >
                          <span className="text-[12px] m-2 line-clamp-1">
                            {item.title}
                          </span>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content.replace(/<img.*?>/g, '[Hình ảnh]') }}
                            className="text-[12px] m-2 overflow-hidden notice-content-mobile"
                          ></div>
                        </div>
                      );
                    })
                  }

                  {
                    messageSelect && (
                      <div
                        onClick={() => setMessageSelect(undefined)}
                        className=" p-1 flex flex-col w-full"
                      >
                        <div className="flex items-center">
                          <span onClick={() => setMessageSelect(undefined)}>
                            <ArrowLeft style={{ fontSize: '13px', padding: '1px', }} />
                          </span>
                          <span className="text-[12px] mx-2">
                            {messageSelect.title}
                          </span>
                        </div>
                        <p className="text-[12px] text-gray-500 my-1" >
                          {moment(messageSelect.created_at).format("DD/MM/YYYY HH:mm:ss")}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{ __html: messageSelect.content }}
                          className="text-[12px]"
                        ></div>
                      </div>
                    )
                  }
                </div>
              </div>

            </div>
          </DialogContent>
      }


    </Dialog>
  );
};

export default NoticeModal;
