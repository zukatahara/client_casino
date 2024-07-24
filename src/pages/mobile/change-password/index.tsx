import { Link } from "react-router-dom";
import "./style.css";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePasswordForm from "./_components/change-password-form";
import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import ChangePasswordWithdrawForm from "./_components/change-password-withdraw";
import SetPasswordWithdrawForm from "./_components/set-password-form";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const ChangePasswordMobilePage = () => {
  const { t } = useTranslation(NS.profile);
  const { profile } = useContext(AppContext);
  return (
    <div data-v-12d09028 className="userCenter">
      <div data-v-4061f822 data-v-12d09028 className="changePassword">
        <div data-v-2d9c7ad7 data-v-4061f822 className="header">
          <div data-v-2d9c7ad7 className="van-nav-bar van-nav-bar--fixed">
            <div className="van-nav-bar__content">
              <div className="van-nav-bar__left">
                <Link to={"/mobile/personal"}>
                  <ArrowLeft className="van-icon van-icon-arrow-left van-nav-bar__arrow" />
                </Link>
              </div>
              <div className="van-nav-bar__title van-ellipsis">
                {t("change_password.change_login_password")}
              </div>
            </div>
          </div>
        </div>
        <div data-v-0143353b data-v-4061f822 className="scrollList">
          <div data-v-4061f822 data-v-0143353b className="wrapper-tontent">
            <Tabs defaultValue="account" className="w-full mt-4">
              <TabsList className="w-full grid grid-cols-2 bg-transparent border border-main p-0">
                <TabsTrigger
                  className="data-[state=active]:bg-main"
                  value="account"
                >
                  {t("change_password.password")}
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-main"
                  value="password"
                >
                  {t("change_password.withdraw_password")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <ChangePasswordForm />
              </TabsContent>
              <TabsContent value="password">
                {profile?.isPWV2 && <ChangePasswordWithdrawForm />}
                {!profile?.isPWV2 && <SetPasswordWithdrawForm />}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordMobilePage;
