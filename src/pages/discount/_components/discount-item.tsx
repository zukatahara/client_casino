import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
// import Config from "@/constants/config";
import { Discount } from "@/types/discount";
//@ts-ignore
import click from "@/assets/images/click_here.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
interface DiscountItemProps {
  discount: Discount;
}

const DiscountItem = ({ discount }: DiscountItemProps) => {
  const { t } = useTranslation([NS["ALL"]]);
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const setting = data?.data.data;
  return (
    <Dialog>
      <DialogTrigger>
        <div className="activity-item">
          <div className="item-banner">
            <div className="el-image">
              <img
                src={`${URL.baseUrl}/${discount.image}`}
                className="el-image__inner"
                width={300}
              />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {discount.title}
          </DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-3 gap-4">
              {/* <div>
                <div className="grid h-full">
                  <img
                    src={`${URL.baseUrl}/${discount?.image}`}
                    alt=""
                    width={300}
                  />
                  <div className="flex items-end justify-center">
                    <Link to={`${setting?.link_cskh}`} target="_blank">
                      <button className="button p-2 text-white bg-red-500 border rounded-sm h-fit w-fit">
                        {t("dang_ky_ngay", { ns: "all" })}
                      </button>
                    </Link>
                  </div>
                </div>
              </div> */}
              <div className="col-span-3">
                <ScrollArea className="w-full h-[600px]">
                  <div dangerouslySetInnerHTML={{ __html: discount.noidung }} />
                  <div className="flex items-center justify-center">
                    <img
                      src={`${URL.baseUrl}/${setting?.logo_image}`}
                      alt=""
                      width={300}
                    />
                    <div className="flex items-end justify-center ml-4 mt-3">
                      <Link to={`${setting?.link_cskh}`} target="_blank">
                        <button className="button p-2 text-white bg-red-500 border-white text-2xl font-semibold border rounded-sm h-fit w-fit">
                          {t("dang_ky_ngay", { ns: "all" })}
                        </button>
                      </Link>
                    </div>
                    {/* <div className="flex justify-center gap-20 mt-2">
                      <Link
                        target="_blank"
                        to={setting?.link_telegram as string}
                      >
                        <img src={click} alt="" className="w-[200px]" />
                      </Link>
                      <Link target="_blank" to={`${setting?.link_cskh}`}>
                        <img src={click} alt="" className="w-[200px]" />
                      </Link>
                      <button onClick={() => window.location.reload()}>
                        <img src={click} alt="" className="w-[200px]" />
                      </button>
                    </div> */}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountItem;
