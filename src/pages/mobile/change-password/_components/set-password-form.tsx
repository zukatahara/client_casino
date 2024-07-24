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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

const SetPasswordWithdrawForm = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const formSchema = z
    .object({
      newPassword: z.string().min(6, {
        message: t("mat_khau_bat_buoc_co_6_12_ky_tu", { ns: "all" }),
      }),
      re_password: z.string().min(6, {
        message: t("mat_khau_xac_nhan_bat_buoc_co_6_12_ky_tu", { ns: "all" }),
      }),
    })
    .superRefine(({ newPassword, re_password }, ctx) => {
      if (newPassword !== re_password) {
        ctx.addIssue({
          code: "custom",
          message: t("mat_khau_xac_nhan_khong_chinh_xac", { ns: "all" }),
          path: ["re_password"],
        });
      }
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      re_password: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (body: { newPassword: string; type: boolean }) =>
      authApi.changePasswordWithdraw(body),
    onSuccess: (data) => {
      if (data.data.status) {
        toast({
          title: t("dat_mat_khau_thanh_cong", { ns: "all" }),
        });
        queryClient.invalidateQueries(["profile"]);
        form.reset();
      }
      if (!data.data.status) {
        toast({
          title: t("dat_mat_khau_khong_thanh_cong", { ns: "all" }),
          description: data.data.msg,
          variant: "destructive",
        });
      }
    },
  });
  function onSubmit(values: { newPassword: string; re_password: string }) {
    changePasswordMutation.mutate({
      newPassword: values.newPassword,
      type: false,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("mat_khau_moi", { ns: "all" })}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("su_dung_6_16_ky_tu_bao_gom", { ns: "all" })}
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
              <FormLabel>{t("xac_nhan_mat_khau_moi", { ns: "all" })}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("xac_nhan_mat_khau", { ns: "all" })}
                  className="text-slate-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{t("doi", { ns: "all" })}</Button>
      </form>
    </Form>
  );
};

export default SetPasswordWithdrawForm;
