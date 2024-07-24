//@ts-nocheck
import { Vip } from "@/types/home.type";
import "./styles.css";
export default function FeatureVip({ item }: { item: Vip | undefined }) {
  return (
    <div className="mt-4 px-2">
      {/* <span className="w-full flex justify-center">Đặc quyền VIP</span> */}

      <div className="info-wrapper">
        {/* <div className="info-card flex items-center h-[130px] bg-slate-50">
          <img src="/vip/vip-privileg_upgrade.png" className="h-[40%]" />
          <span className="text-sm text-black">Tiền thưởng thăng cấp</span>
          <span className="text-sm text-[#4a69ff]">
            {item?.up_level_reward || 0}
          </span>
        </div>
        <div className="info-card flex items-center h-[130px] bg-slate-50">
          <img src="/vip/vip-privileg_envelope.png" className="h-[40%]" />
          <span className="text-sm text-black">Tiền thưởng mỗi tháng</span>
          <span className="text-sm text-[#4a69ff]">
            {item?.month_reward || 0}
          </span>
        </div>
        <div className="info-card flex items-center h-[130px] bg-slate-50">
          <img src="/vip/vip-privileg_envelope.png" className="h-[40%]" />
          <span className="text-sm text-black">Tiền thưởng mỗi tuần</span>
          <span className="text-sm text-[#4a69ff]">
            {item?.week_reward || 0}
          </span>
        </div>
        <div className="info-card flex items-center h-[130px] bg-slate-50">
          <img src="/vip/vip-privileg_envelope.png" className="h-[40%]" />
          <span className="text-sm text-black">Tiền thưởng sinh nhật</span>
          <span className="text-sm text-[#4a69ff]">
            {item?.birth_day_reward || 0}
          </span>
        </div> */}
        {/* <div className="info-card flex items-center h-[130px] bg-slate-50">
          <img src="/vip/vip-privileg_relief_fund.png" className="h-[40%]" />
          <span className="text-sm text-black">Tỉ lệ cứu trợ</span>
          <span className="text-sm text-[#4a69ff]">
            {INFO_VIP[tabActive].moneyEnvelope === 0
              ? "_"
              : INFO_VIP[tabActive].moneyEnvelope}
          </span>
        </div> */}
      </div>
    </div>
  );
}
