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
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ChangePasswordForm = ({ t }: any) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    passwordOld: z.string().min(6, {
      message: t("change_password.password_required"),
    }),
    newPassword: z.string().min(6, {
      message: t("change_password.password_required"),
    }),
    re_password: z.string().min(6, {
      message: t("change_password.password_confirm_required"),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordOld: "",
      newPassword: "",
      re_password: "",
    },
  });
  const changePasswordMutation = useMutation({
    mutationFn: (body: z.infer<typeof formSchema>) =>
      authApi.changePassword(body),
    onSuccess: (data) => {
      if (data.data.status) {
        toast({
          title: t("change_password.change_password_success"),
        });
        setOpen(false);
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    changePasswordMutation.mutate(values);
  }
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button className="btn_submit_new">
          {t("change_password.change")}
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
              name="passwordOld"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("change_password.current_password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("change_password.password_placeholder")}
                      {...field}
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

export default ChangePasswordForm;
