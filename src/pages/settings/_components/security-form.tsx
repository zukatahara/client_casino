import { FC } from "react";
import ChangePasswordForm from "./change-password-form";
import ChangePasswordWithdrawForm from "./change-password-withdraw";
import { User } from "@/types/user.type";
import SetPasswordWithdrawForm from "./set-password-form";

interface SecurityFormProps {
  sdt: string | undefined;
  user: User;
  t: any;
}

const SecurityForm: FC<SecurityFormProps> = ({ sdt, user, t }) => {
  return (
    <div>
      <h3 className="text-lg font-medium">{t("security.account_security")}</h3>
      <div className="mt-4 border bg-slate-50 dark:bg-slate-500 rounded-md p-4 w-full">
        <div className="space-y-4">
          <div className="font-medium flex justify-start items-center">
            <div className="w-1/2">
              <span className="text-slate-500 dark:text-slate-200">
                {t("security.phone_number")}
              </span>
              <span className="text-base ml-4">{sdt}</span>
            </div>
          </div>
          <div className="font-medium flex justify-start items-center">
            <div className="w-1/2">
              <span className="text-slate-500 dark:text-slate-200">
                {t("security.login_password")}
              </span>
              <span className="text-base ml-4">******</span>
            </div>
            <ChangePasswordForm t={t} />
          </div>
          <div className="font-medium flex justify-start items-center">
            <div className="w-1/2">
              <span className="text-slate-500 dark:text-slate-200">
                {t("security.withdraw_password")}
              </span>
              <span className="text-base ml-4">******</span>
            </div>
            {user.isPWV2 && <ChangePasswordWithdrawForm t={t} />}
            {!user.isPWV2 && <SetPasswordWithdrawForm t={t} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityForm;
