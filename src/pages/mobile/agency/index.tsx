import SidebarAgency from "./_components/sidebar";
import { useState } from "react";
import SectionAgency from "./_components/sectionAgency";
import SectionRegister from "./_components/sectionRegister";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const AgencyMobilePage = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const [tab, setTab] = useState(null);
  const itemsSidebar = [
    {
      label: t("dai_ly", { ns: "all" }),
      value: 1,
    },
    {
      label: t("dang_nhap_dai_ly", { ns: "all" }),
      value: 2,
    },
    {
      label: t("dang_ky_dai_ly", { ns: "all" }),
      value: 3,
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex items-center px-4 py-3 shadow-[inset_0_-0.5px_0_0_rgba(255,255,255,.29)]">
        <ChevronLeft
          className="text-[#fff] cursor-pointer"
          onClick={() => {
            if (tab) {
              setTab(null);
            } else {
              navigate(-1);
            }
          }}
        />
        <div className="mx-auto">
          <h3 className="text-[#fff] font-[600] text-[20px] ml-2 text-center">
            {t("dai_ly", { ns: "all" })}
          </h3>
        </div>
      </div>
      {!tab && <SidebarAgency items={itemsSidebar} setTab={setTab} />}
      {tab === 1 && <SectionAgency />}
      {tab === 3 && <SectionRegister />}
    </div>
  );
};

export default AgencyMobilePage;
