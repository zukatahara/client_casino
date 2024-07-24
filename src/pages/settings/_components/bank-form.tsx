import { cn } from "@/lib/utils";
import AddBankForm from "./add-bank-form";
import { User } from "@/types/user.type";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const BankForm = ({
  user,
}: // t: translate = () => {},
{
  user: User;
  t: any;
}) => {
  const { t } = useTranslation(NS.withdraw);
  return (
    <div>
      <h3 className="text-lg font-medium">{t("bank_title")}</h3>
      <div className="mt-4 border bg-slate-50 dark:bg-slate-500 rounded-md p-4 w-full">
        <div className="font-medium flex items-center justify-between">
          {t("bank_title_label")}
          {!user.bank_name && !user.bank_number && !user.bank_user && (
            <AddBankForm t={t} />
          )}
        </div>
        {!user.bank_name && !user.bank_number && !user.bank_user && (
          <p
            className={cn(
              "text-base mt-2",
              "text-slate-500 dark:text-slate-200 italic"
            )}
          >
            {t("no_bank_info")}
          </p>
        )}
        {user.bank_name && user.bank_number && user.bank_user && (
          <>
            <Card className="w-[190px] h-28 mt-4 card-banking p-4 relative">
              <p className="text-slate-600">{user.bank_name}</p>
              <div className="text-slate-500 dark:text-slate-200 text-xs mt-6">
                <p>*** ****</p>
                <p>{user.bank_number}</p>
              </div>

              <Button
                size={"sm"}
                className="absolute bottom-2 right-2 btn_submit_new "
              >
                {t("default_button")}
              </Button>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default BankForm;
