import { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import LevelVip from "./level-vip";
import homeApi from "@/apis/home.api";
import { AppContext } from "@/contexts/app.context";
import VipCondition from "./condition-vip";
import FeatureVip from "./feature";
import { Vip } from "@/types/home.type";
import accountApi from "@/apis/accout.api";

const MyVip = () => {
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
    <div className="container mx-auto py-10">
      <div className="grid gap-4">
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
};

export default MyVip;
