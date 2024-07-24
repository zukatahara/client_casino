import BackButton from "@/components/back-button";

import { TableVip } from "./_components/table";
import FeatureVip from "./_components/feature";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { Vip } from "@/types/home.type";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

export default function VipPageMobile() {
  const { t } = useTranslation(NS.vip);
  const [tabActive, _] = useState<Number>(0);
  const { data: dataVips } = useQuery({
    queryKey: ["list-vip"],
    queryFn: () => homeApi.getListVip(),
  });
  const vips = dataVips?.data?.data || [];
  const [itemActive, setItemActive] = useState<Vip | undefined>(vips[0]);
  useEffect(() => {
    const infoItemSelect = vips.find((item) => item.level === tabActive);
    setItemActive(infoItemSelect);
  }, [tabActive]);
  return (
    <div className="userCenter">
      <div
        data-v-59eb43e9
        className="van-nav-bar van-nav-bar--fixed !w-[100vw]"
        style={{ zIndex: 50 }}
      >
        <div className="van-nav-bar__content">
          <div className="van-nav-bar__left">
            <BackButton />
          </div>
          <div className="van-nav-bar__title van-ellipsis">
            <p data-v-59eb43e9>{t("vip_privileges")} </p>
          </div>
        </div>
      </div>
      <div className="mt-[13.333333vw]">
        {/* <img src="/vip/banner.jpg" />
        <SliderMobile setTabActive={setTabActive} /> */}
        <FeatureVip item={itemActive} />
        <TableVip vips={vips} />
      </div>
    </div>
  );
}
