import homeApi from "@/apis/home.api";
import { Button } from "@/components/ui/button";
// import { NS } from "@/constants/ns";
import { useQuery } from "@tanstack/react-query";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ProfileFormProps {
  username: string | undefined;
  fullname: string | undefined;
  t: any;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ username, fullname, t }) => {
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const setting = data?.data.data;
  return (
    <div>
      <h3 className="text-lg font-medium">{t("personal_info")}</h3>
      <div className="mt-4 border bg-slate-50 dark:bg-slate-500 rounded-md p-4 w-full flex justify-start items-end flex-1">
        <div className="w-1/2">
          <div className="font-medium">
            <span className="text-slate-500 dark:text-slate-200">
              {t("account")}
            </span>
            <span className="text-base ml-4">{username}</span>
          </div>
          <div className="font-medium mt-4">
            <span className="text-slate-500 dark:text-slate-200">
              {t("fullname")}
            </span>
            <span className="text-base ml-4">{fullname}</span>
          </div>
        </div>
        <div className="w-1/2">
          <Link target="_blank" to={setting?.link_telegram || ""}>
            <Button className="btn_submit_new">{t("contact_support")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
