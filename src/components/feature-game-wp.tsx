import SectionTitle from "@/pages/home/_components/section-title";
import FeaturedGames from "@/pages/home/_components/featured-games/featured-games";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import "@/styles/home-sections.css";

const FeatureGameWp = () => {
  const { t } = useTranslation([NS["HOME"]]);

  return (
    <div className="feature-game-wp hidden md:block" style={{ width: '100%', maxWidth: '1400px', margin: '16px auto', padding: '0 16px' }}>
      <div className="section-title" style={{ display: 'none' }}>
        <SectionTitle title={t("categories.no_hu", { ns: "home" })} />
      </div>
      <div className="section-content" style={{ width: '100%' }}>
        <FeaturedGames />
      </div>
    </div>
  );
};

export default FeatureGameWp;
