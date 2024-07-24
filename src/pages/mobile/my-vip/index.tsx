import accountApi from "@/apis/accout.api";
import homeApi from "@/apis/home.api";
import BackButton from "@/components/back-button";
import { AppContext } from "@/contexts/app.context";
import { Vip } from "@/types/home.type";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import LevelVip from "./level-vip";
import VipCondition from "./condition-vip";
import FeatureVip from "./feature";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

export default function MyVipMobile() {
  const { t } = useTranslation(NS.vip);
  const { profile } = useContext(AppContext);
  const [vipSelect, setVipSelect] = useState<number | undefined>(
    parseInt(profile?.level || "0")
  );
  const [infoVipSelect, setInfoVipSelect] = useState<Vip>();

  const { data: dataVips } = useQuery({
    queryKey: ["list-vip"],
    queryFn: () => homeApi.getListVip(),
  });
  const { data: totalDeposit } = useQuery({
    queryKey: ["total-deposit"],
    queryFn: () => accountApi.totalDeposit(),
  });
  const total = totalDeposit?.data?.data || 0;
  const totalBet = totalDeposit?.data?.totalBet || 0;
  const vips = dataVips?.data?.data || [];
  useEffect(() => {
    const infoItemSelect = vips.find((item) => item.level === vipSelect);
    setInfoVipSelect(infoItemSelect);
  }, [vipSelect, vips]);
  return (
    <div className="userCenter ">
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
            <p data-v-59eb43e9> {t("vip_level")} </p>
          </div>
          <Link to={"/mobile/vip-award"} className="van-nav-bar__right">
            <span
              data-v-59eb43e9
              className="rightText iconfont icon-icon_history"
            />
          </Link>
        </div>
      </div>
      <div className="grid gap-4 p-2 max-w-[100vw] mt-16">
        <LevelVip
          vips={vips}
          vipSelect={vipSelect}
          setVipSelect={setVipSelect}
        />
        <VipCondition
          profile={profile}
          infoVipSelect={infoVipSelect}
          total={total}
          totalBet={totalBet}
        />
        <FeatureVip infoVipSelect={infoVipSelect} />
      </div>
    </div>
  );
}
