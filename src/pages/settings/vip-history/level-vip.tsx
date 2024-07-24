//@ts-ignore
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Vip } from "@/types/home.type";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
export default function LevelVip({ vips, vipSelect, setVipSelect }: any) {
  const { t } = useTranslation(NS.vip);
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h3 className="title text-lg font-bold">{t("vip_level")}</h3>
        <Link
          to={"/settings/vip-history/history"}
          className="flex items-center gap-1 text-blue-400 underline-offset-3"
        >
          {t("vip_history")} <FaAngleDoubleRight />
        </Link>
      </div>
      <Link to={"/vip"}>
        <div className="grid grid-cols-3 items-center">
          {/* <div className="col-span-1 py-[10px] rounded-sm">
            <img src="/vip/vip0.png" height={100} />
          </div> */}

          {/* <div className="span-1 grid items-center justify-center">
            <img src="/vip/benefit.png" height={122} width={122} />
            <span className="text-center">Đặc quyền VIP</span>
          </div> */}
        </div>
      </Link>
      <div className="flex flex-wrap gap-2 mt-3">
        {vips?.map((item: Vip) => (
          <div
            className={vipSelect === item.level ? "opacity-100" : "opacity-50"}
            onClick={() => setVipSelect(item.level)}
          >
            <img
              src={`/level-vip/level-vip-${item.level}.png`}
              className="object-contain"
              height={46}
              width={46}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
