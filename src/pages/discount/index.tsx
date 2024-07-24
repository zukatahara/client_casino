import { useQuery } from "@tanstack/react-query";
import DiscountItem from "./_components/discount-item";
import homeApi from "@/apis/home.api";
import banner from "@/assets/images/white.631fe061.png";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import { languages } from "@/i18n";
const DiscountPage = () => {
  const { t, i18n } = useTranslation([NS["ALL"]]);
  const newBanner =
    i18n.language === "vi-VN" ? banner : "/th-images/banner vip.png";
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  const { data } = useQuery({
    queryKey: ["discount"],
    queryFn: () => homeApi.getPromotion({ language: currentLanguage?.code }),
  });

  const discount = data?.data.data;

  return (
    <>
      <img
        className="mt-14 w-full bg-contain"
        src={newBanner}
        // src="https://www.xoso66.me/home/static/img/white.631fe061.png"
        alt=""
      />
      <div className="flex justify-center pt-10 w-full">
        <div className="mr-10 ml-5 w-52 text-base menu">
          <div className="title">{t("khuyen_mai", { ns: "all" })}</div>
          <div className="menu-list">
            <div className="menu-item actived">
              <i className="gift" /> {t("khuyen_mai", { ns: "all" })}
            </div>
          </div>
        </div>
        <div className="max-w-6xl grid grid-cols-3 w-full gap-4">
          {discount &&
            discount.length > 0 &&
            discount.map((item, index) => (
              <DiscountItem discount={item} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default DiscountPage;
