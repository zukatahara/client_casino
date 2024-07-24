//@ts-ignore
import { Link } from "react-router-dom";

import { Vip } from "@/types/home.type";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
export default function LevelVip({ vips, vipSelect, setVipSelect }: any) {
  const { t } = useTranslation(NS.vip);
  return (
    <div className="max-w-[100vw] overflow-scroll">
      <div className="flex justify-between">
        <div className="flex justify-between w-full">
          <h3 className="title text-lg font-bold text-white">
            {t("vip_level")}
          </h3>
          <Link to={"/mobile/vip"} className="text-orange-300 text-sm">
            {t("vip_privileges")}
          </Link>
        </div>
        {/* <Link
          to={"/settings/vip-history/history"}
          className="flex items-center gap-1 text-blue-400 underline-offset-3"
        >
          Lịch sử thưởng VIP <FaAngleDoubleRight />
        </Link> */}
      </div>
      <Link to={"/vip"}>
        <div className="grid grid-cols-3 items-center"></div>
      </Link>
      <div className="flex overflow-y-scroll w-full box-border gap-3 py-2">
        {vips?.map((item: Vip) => (
          <div
            className={`${
              vipSelect === item.level ? "opacity-100" : "opacity-50"
            } h-[17vw] min-w-[17vw] w-[17vw] overflow-hidden`}
            onClick={() => setVipSelect(item.level)}
          >
            <img
              src={`/level-vip/level-vip-${item.level}.png`}
              className="h-[100%] w-[100%] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
