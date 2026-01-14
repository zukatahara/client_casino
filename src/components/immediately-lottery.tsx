import SectionTitle from "@/pages/home/_components/section-title";
import PopularBettingNewTheme from "./popular-betting-new-theme";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import "@/styles/home-sections.css";

const ImmediatelyLottery = () => {
  const { t } = useTranslation([NS["HOME"]]);

  return (
    <div className="immediatelyTheLottery-newTheme hidden md:block" style={{ width: '100%', maxWidth: '1400px', margin: '16px auto', padding: '0 16px' }}>
      <div className="section-title">
        <SectionTitle title={t("categories.tro_xo_so", { ns: "home" })} />
      </div>
      <div className="section-content" style={{ width: '100%' }}>
        <PopularBettingNewTheme />
      </div>
    </div>
  );
};

export default ImmediatelyLottery;
