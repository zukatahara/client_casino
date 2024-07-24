import ProfileForm from "./_components/profile-form";
import { useContext } from "react";
import { AppContext } from "@/contexts/app.context";
import SecurityForm from "./_components/security-form";
import BankForm from "./_components/bank-form";
import { User } from "@/types/user.type";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const SettingPage = () => {
  const { profile } = useContext(AppContext);
  const { t } = useTranslation(NS.profile);
  return (
    <div className="space-y-6">
      <ProfileForm
        username={profile?.username}
        fullname={profile?.fullname}
        t={t}
      />
      <SecurityForm sdt={profile?.phone} user={profile as User} t={t} />
      <BankForm user={profile as User} t={t} />
    </div>
  );
};

export default SettingPage;
