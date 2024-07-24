import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import BankForm from "../_components/bank-form";
import { User } from "@/types/user.type";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const DrawPage = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const { t: tWallet } = useTranslation(NS.withdraw);
  const { profile } = useContext(AppContext);
  const formSchema = z
    .object({
      money: z.string(),
      password: z.string().min(2, {
        message: tWallet("password_required"),
      }),
    })
    .superRefine((data, ctx) => {
      if (Number(data.money) < 100000) {
        ctx.addIssue({
          code: "custom",
          message: tWallet("amount_minimum"),
          path: ["money"],
        });
      }
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      money: "",
      password: "",
    },
  });
  return (
    <div className="space-y-6">
      <BankForm user={profile as User} t={() => {}} />
      <h3 className="text-lg font-medium">
        {t("so_du", { ns: "all" })}:{" "}
        <span className="text-yellow-500">{profile?.coin}</span> Vnđ
      </h3>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="money"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tWallet("withdraw_amount")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={tWallet("enter_withdraw_amount")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tWallet("withdraw_password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="w-full flex justify-center items-center mt-8">
        <Button type="button">{tWallet("withdraw_now")}</Button>
      </div>
    </div>
  );
};

export default DrawPage;
