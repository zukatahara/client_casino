import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useContext } from "react";
import BankForm from "../_components/bank-form";
import { AppContext } from "@/contexts/app.context";
import { User } from "@/types/user.type";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import RefreshMoney from "@/components/refresh-money";
import {
  convertCurrencyToString,
  formatCurrency,
  formatNumber,
} from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authApi from "@/apis/auth.api";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import homeApi from "@/apis/home.api";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const DrawPage = () => {
  const { t } = useTranslation(NS.withdraw);
  const { profile } = useContext(AppContext);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: dataSetting } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const min_withdraw = dataSetting?.data?.data?.min_withdraw || 0;
  const max_withdraw = dataSetting?.data?.data?.max_withdraw || 0;

  const formSchema = z.object({
    money: z.coerce.string().min(7, {
      message: `${t("withdraw_range_message")} (${formatCurrency(
        min_withdraw
      )} ~ ${formatCurrency(max_withdraw)})`,
    }),
    password: z.string().min(1, {
      message: t("please_enter_password"),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      money: "",
      password: "",
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: (body: { money: string; password: string }) => {
      const tempData: any = { ...body };
      tempData.money = convertCurrencyToString(body.money);

      return authApi.withdraw(tempData);
    },
    onSuccess: (data) => {
      if (data.data.status) {
        toast({
          title: t("withdraw_success_message"),
        });
        queryClient.invalidateQueries(["profile"]);
        form.reset();
      }
    },
  });
  const handleFormatNumber = (value: any) => {
    const input_val = value === "" ? "" : formatNumber(value);
    console.log("input_val:", input_val);
    form.setValue("money", input_val);
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    withdrawMutation.mutate(values);
  }
  const refreshMutation = useMutation({
    mutationFn: () => authApi.refresh(),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast({
        title: t("success_message"),
      });
    },
  });
  return (
    <div className="h-[800px]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t("my_wallet")}</h3>
        <p className="text-base text-slate-500 dark:text-slate-200">
          {t("total_assets")}{" "}
          <span className="text-yellow-500">
            {formatCurrency(profile?.money || 0)}
          </span>
        </p>
      </div>
      <Card className="mt-8 w-full h-52 p-6 border-slate-200 dark:border-slate-700">
        <p>{t("my_balance")}</p>
        <div className="w-full p-4 flex justify-between items-center border border-slate-200 dark:border-slate-700 rounded-md mt-12 mb-12">
          <div className="h-full w-1/2 border-r border-slate-300 relative">
            <p className="text-slate-500 dark:text-slate-200">{t("balance")}</p>
            <p className="text-yellow-500">
              {formatCurrency(profile?.money || 0)}
              <RefreshMoney className="ml-2" />
            </p>
            <Button
              onClick={() => refreshMutation.mutate()}
              className="bg-[linear-gradient(105deg,#ffe16b,#ffaf13)] hover:bg-yellow-400 absolute top-1 right-2"
            >
              {t("press_to_convert_back")}
            </Button>
          </div>
          <div className="h-full w-1/2 relative pl-2">
            <p className="text-slate-500 dark:text-slate-200">
              {t("pending_balance")}
            </p>
            <p className="text-yellow-500">
              0<RefreshMoney className="ml-2" />
            </p>
          </div>
        </div>
        <BankForm user={profile as User} t={t} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="money"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>{t("withdraw_amount")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("enter_withdraw_amount")}
                      // pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                      onChange={(e) => handleFormatNumber(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("withdraw_range_message")} (
                    {formatCurrency(min_withdraw)} ~{" "}
                    {formatCurrency(max_withdraw)})
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("withdraw_password")}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t("withdraw_password")}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("withdraw_range_message")} (
                    {formatCurrency(min_withdraw)} ~{" "}
                    {formatCurrency(max_withdraw)})
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">{t("withdraw_now")}</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default DrawPage;
