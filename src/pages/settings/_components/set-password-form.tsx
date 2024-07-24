import authApi from "@/apis/auth.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SetPasswordWithdrawForm = ({ t }: any) => {
  const queryClient = useQueryClient();
  const formSchema = z
    .object({
      newPassword: z.string().min(6, {
        message: t("password_length_error"),
      }),
      re_password: z.string().min(6, {
        message: t("confirm_password_length_error"),
      }),
    })
    .superRefine(({ newPassword, re_password }, ctx) => {
      if (newPassword !== re_password) {
        ctx.addIssue({
          code: "custom",
          message: t("confirm_password_mismatch"),
          path: ["re_password"],
        });
      }
    });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
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
          title: t("change_password.set_change_password_success"),
        });
        queryClient.invalidateQueries(["profile"]);
        setOpen(false);
        form.reset();
      }
      if (!data.data.status) {
        toast({
          title: t("change_password.set_change_password_fail"),
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
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button className="btn_submit_new">
          {t("change_password.set_change")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("change_password.change_password")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("change_password.new_password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t(
                        "change_password.new_password_placeholder"
                      )}
                      {...field}
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
                  <FormLabel>
                    {t("change_password.confirm_new_password")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t(
                        "change_password.confirm_password_placeholder"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            isLoading={changePasswordMutation.isLoading}
            onClick={form.handleSubmit(onSubmit)}
            type="button"
            className="btn_submit_new"
          >
            {t("change_password.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetPasswordWithdrawForm;
