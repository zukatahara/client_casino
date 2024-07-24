import authApi from "@/apis/auth.api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NS } from "@/constants/ns";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

const ChangePasswordWithdrawForm = () => {
  const { t } = useTranslation(NS.profile);
  const formSchema = z
    .object({
      passwordOld: z.string().min(6, {
        message: t("change_password.password_required"),
      }),
      newPassword: z.string().min(6, {
        message: t("change_password.password_required"),
      }),
      re_password: z.string().min(6, {
        message: t("change_password.password_confirm_required"),
      }),
    })
    .superRefine(({ newPassword, re_password }, ctx) => {
      if (newPassword !== re_password) {
        ctx.addIssue({
          code: "custom",
          message: t("change_password.password_mismatch"),
          path: ["re_password"],
        });
      }
    });
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordOld: "",
      newPassword: "",
      re_password: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (body: {
      newPassword: string;
      password_user: string | undefined;
      type: boolean;
    }) => authApi.changePasswordWithdraw(body),
    onSuccess: (data) => {
      if (data.data.status) {
        toast({
          title: t("change_password.change_password_success"),
        });
        form.reset();
      }
      if (!data.data.status) {
        toast({
          title: t("change_password.change_password_fail"),
          description: data.data.msg,
          variant: "destructive",
        });
      }
    },
  });
  function onSubmit(values: {
    newPassword: string;
    re_password: string;
    passwordOld: string;
  }) {
    changePasswordMutation.mutate({
      newPassword: values.newPassword,
      password_user: values.passwordOld,
      type: true,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="passwordOld"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("change_password.current_password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("change_password.password_placeholder")}
                  {...field}
                  className="text-slate-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("change_password.new_password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("change_password.new_password_placeholder")}
                  {...field}
                  className="text-slate-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="re_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("change_password.confirm_new_password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t(
                    "change_password.confirm_password_placeholder"
                  )}
                  {...field}
                  className="text-slate-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{t("change_password.submit")}</Button>
      </form>
    </Form>
  );
};

export default ChangePasswordWithdrawForm;
