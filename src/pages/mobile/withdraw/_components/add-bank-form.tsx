import authApi from "@/apis/auth.api";
import { Button } from "@/components/ui/button";
// import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const AddBankForm = ({
  open,
}: // t: translate = () => {},
{
  open: boolean;
  t: any;
}) => {
  const { t } = useTranslation(NS.withdraw);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile } = useContext(AppContext);
  const formSchema = z.object({
    nameuser: z.string().min(2, {
      message: t("name_user_required"),
    }),
    nameBank: z.string().min(2, {
      message: t("bank_required"),
    }),
    stk: z.string().min(2, {
      message: t("account_required"),
    }),
  });
  // const { data: bankData } = useQuery({
  //   queryKey: ["banks"],
  //   queryFn: authApi.getBankList,
  // });
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameuser: profile?.fullname,
      nameBank: "",
      stk: "",
    },
  });

  const addBankMutation = useMutation({
    mutationFn: (body: z.infer<typeof formSchema>) => authApi.addBank(body),
    onSuccess: (data) => {
      if (data.data.status) {
        toast({
          title: t("bank_success_message"),
        });
        queryClient.invalidateQueries(["profile"]);
        form.reset();
      }
      if (!data.data.status) {
        toast({
          title: t("bank_failure_message"),
          description: data.data.msg,
          variant: "destructive",
        });
      }
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    addBankMutation.mutate({ ...values });
  }

  // const banks = bankData?.data.data || [];
  // const banksData = banks.map((item) => ({
  //   label: item.title,
  //   value: item.title,
  // }));
  return (
    <Dialog onOpenChange={() => navigate(-1)} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("add_bank_label")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="nameuser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("full_name_label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("enter_full_name_label")}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameBank"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("bank_title_label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("select_bank")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("bank_title")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("account_number_label")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            isLoading={addBankMutation.isLoading}
            onClick={form.handleSubmit(onSubmit)}
            type="button"
          >
            {t("add_bank_button")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBankForm;
