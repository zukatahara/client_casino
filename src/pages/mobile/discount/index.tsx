import homeApi from "@/apis/home.api";
import BackButton from "@/components/back-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
//@ts-ignore
import click from "@/assets/images/click_here.png";
import { Link } from "react-router-dom";
import { URL } from "@/constants/url";
import { NS } from "@/constants/ns";
import { languages } from "@/i18n";
import { useTranslation } from "react-i18next";
const DiscountMobilePage = () => {
  const { t, i18n } = useTranslation([NS["ALL"]]);
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  const { data } = useQuery({
    queryKey: ["discount"],
    queryFn: () => homeApi.getPromotion({ language: currentLanguage?.code }),
  });

  const discount = data?.data.data;
  console.log("discount:", discount);
  const { data: settings } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const setting = settings?.data.data;
  return (
    <div>
      <div className="van-nav-bar van-nav-bar--fixed" id="lottery_nav">
        <div className="van-nav-bar__content">
          <div className="van-nav-bar__left">
            <BackButton />
          </div>
          <div className="van-nav-bar__title van-ellipsis">
            <div className="selectAllLottery">
              <span className="allGameSelect">
                {" "}
                {t("uu_dai", { ns: "all" })}
              </span>
            </div>
          </div>
          <div className="van-nav-bar__right"></div>
        </div>
      </div>
      <ScrollArea className="w-full mt-12 pt-4 container">
        {!discount ||
          (discount.length === 0 && (
            <div className="w-full mt-2 text-center text-slate-200">
              {t("khong_co_du_lieu", { ns: "all" })}
            </div>
          ))}
        {discount &&
          discount.length > 0 &&
          discount.map((item, index) => {
            return (
              <div>
                <Dialog key={index}>
                  <DialogTrigger>
                    <img
                      className="w-full h-auto"
                      src={`${URL.baseUrl}/${item.image}`}
                    />
                  </DialogTrigger>
                  <DialogContent className="z-[200] w-[90vw]">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        <ScrollArea className="w-full h-[300px]">
                          {/* <img
                          className="w-full"
                          src={`${config.baseUrl}/${item.noidung}`}
                          alt=""
                        /> */}
                          <div
                            dangerouslySetInnerHTML={{ __html: item.noidung }}
                          />
                          <div className="flex flex-col items-center mt-[-5px]">
                            {/* <img
                            src={`${config.baseUrl}/${setting?.logo_image}`}
                            alt=""
                            className="w-[150px]"
                          /> */}
                            {/* <div className="flex justify-center gap-5 mt-2">
                            <Link
                              target="_blank"
                              to={setting?.link_telegram as string}
                            >
                              <img src={click} alt="" className="w-[150px]" />
                            </Link>
                            <Link target="_blank" to={`${setting?.link_cskh}`}>
                              <img src={click} alt="" className="w-[150px]" />
                            </Link>
                            <button onClick={() => window.location.reload()}>
                              <img src={click} alt="" className="w-[150px]" />
                            </button>
                          </div> */}
                          </div>
                        </ScrollArea>
                      </DialogDescription>
                      <DialogFooter>
                        <div className="flex items-end justify-center">
                          <Link to={`${setting?.link_cskh}`} target="_blank">
                            <button className="button p-2 text-white bg-red-500 border rounded-sm h-fit w-fit">
                              {t("dang_ky_ngay", { ns: "all" })}
                            </button>
                          </Link>
                        </div>
                      </DialogFooter>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            );
          })}
      </ScrollArea>
    </div>
  );
};

export default DiscountMobilePage;
