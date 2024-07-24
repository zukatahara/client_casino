import SidebarAgency from "./_components/sidebar";
import { useState } from "react";
import SectionAgency from "./_components/sectionAgency";
import SectionRegister from "./_components/sectionRegister";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const AgencyPage = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const [tab, setTab] = useState(0);
  const itemsSidebar = [
    {
      label: t("dai_ly", { ns: "all" }),
      value: 0,
    },
    {
      label: t("dang_nhap_dai_ly", { ns: "all" }),
      value: 1,
    },
    {
      label: t("dang_ky_dai_ly", { ns: "all" }),
      value: 2,
    },
  ];

  return (
    <div className="mt-[5%] flex justify-center min-h-[80vh]">
      <div className="w-[1400px] flex gap-10">
        <div className="w-[20%] ">
          <SidebarAgency items={itemsSidebar} tab={tab} setTab={setTab} />
        </div>
        <div className="w-[80%] ">
          {tab === 0 && <SectionAgency />}
          {tab === 2 && <SectionRegister />}
        </div>
      </div>
    </div>
  );
};

export default AgencyPage;
