import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import authApi from "@/apis/auth.api";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import UserRegistation from "./user-registation";
// import { Icons } from "./icons";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const UserAuthForm = () => {
  const { t } = useTranslation([NS["HOME"]]);
  const formSchema = z.object({
    username: z.string().min(1, {
      message: t("header.login.username_required"),
    }),
    password: z.string().min(1, {
      message: t("header.login.password_required"),
    }),
  });
  const { toast } = useToast();
  const { setIsAuthenticated, setAuth } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (body: z.infer<typeof formSchema>) => authApi.login(body),
    onSuccess: (data) => {
      if (data.data.status) {
        setIsAuthenticated(true);
        setAuth(data.data.data);
        // setIsOpenModal(true);
        form.reset();
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values);
  }

  const handleInvalidLogin = () => {
    toast({
      title: t("header.login.error.title"),
      description: t("header.login.error.desc"),
      variant: "destructive",
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, handleInvalidLogin)}
        className="space-y-8"
        autoComplete="off"
      >
        <div className="flex w-full items-center space-x-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <Input
                      className="rounded-3xl dark:bg-[#1e222c] bg-[#f0f0f0] text-[#999] w-[220px] h-[35px]"
                      placeholder={t("header.login.taikhoanPlaceHolder")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="rounded-3xl bg-[#f0f0f0] dark:bg-[#1e222c] text-[#999] w-[220px] h-[35px]"
                        type={show ? "text" : "password"}
                        placeholder={t("header.login.matkhauPlaceHolder")}
                        {...field}
                      />
                      <div className="absolute top-[17%] right-[3%] text-[#c0ccdc]">
                        {show ? (
                          <Eye
                            onClick={() => setShow(!show)}
                            className="cursor-pointer w-5"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setShow(!show)}
                            className="cursor-pointer w-5"
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              </>
            )}
          />
          <Button
            isLoading={loginMutation.isLoading}
            variant={"ghost"}
            type="submit"
            className="rounded-3xl w-30 btn-main relative dark:text-slate-200 h-[35px] flex gap-3 text-[14px]"
          >
            {/* <Icons.user className="text-main w-4 h-4" /> */}
            <i
              data-v-26a8675a=""
              className="iconfont icon-icon_account text-blue-500"
            ></i>
            {t("header.dangnhap")}
          </Button>
          <UserRegistation />
          {/* <Button variant={"outline"} type="button">
            Chơi thử
          </Button> */}
        </div>
      </form>
    </Form>
  );
};

export default UserAuthForm;
