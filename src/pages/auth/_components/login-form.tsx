import authApi from "@/apis/auth.api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AppContext } from "@/contexts/app.context";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const LoginForm = () => {
  const { t } = useTranslation([NS.ALL]);
  const formSchema = z.object({
    username: z.string().min(1, {
      message: t("tai khoan khong duoc de trong"),
    }),
    password: z.string().min(1, {
      message: t("mat khau khong duoc de trong"),
    }),
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAuthenticated, setAuth } = useContext(AppContext);

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
        navigate("/");
        form.reset();
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values);
  }

  const handleInvalidLogin = () => {
    toast({
      title: t("dang nhap khong thanh cong"),
      description: t("vui long dien day du thong tin"),
      variant: "destructive",
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, handleInvalidLogin)}
        className="van-form"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="van-cell van-field">
                  <div className="van-field__left-icon">
                    <i className="icon_account" />
                  </div>
                  <div className="van-cell__value van-cell__value--alone van-field__value">
                    <div className="van-field__body">
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder={t("nhap tai khoan")}
                        className="van-field__control"
                        {...field}
                      />
                    </div>
                  </div>
                </div>
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
              <FormControl>
                <div className="van-cell van-field">
                  <div className="van-field__left-icon">
                    <i className="icon_password" />
                  </div>
                  <div className="van-cell__value van-cell__value--alone van-field__value">
                    <div className="van-field__body">
                      <input
                        type="password"
                        autoComplete="off"
                        placeholder={t("6-12 ky tu chu va so")}
                        className="van-field__control"
                        {...field}
                      />
                      <div className="van-field__right-icon">
                        <span
                          className="icon_show"
                          style={{ display: "none" }}
                        />
                        <span className="icon_hide" />
                      </div>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="btns">
          <button
            type="submit"
            className="loginBtn van-button van-button--default van-button--normal van-button--block van-button--round"
            style={{
              color: "white",
              background:
                "linear-gradient(270deg, rgb(72, 105, 253) 0%, rgb(108, 69, 226) 100%)",
              border: 0,
            }}
          >
            <div className="van-button__content">
              <span className="van-button__text">
                {t("click de dang nhap")}
              </span>
            </div>
          </button>
          <div className="otherBtn">
            <div>
              <i className="icon_cs" />
              <span>{t("cskh")}</span>
            </div>
            <div onClick={() => navigate("/instruction-download")}>
              <i className="icon_app" />
              <span>{t("tai app")}</span>
            </div>
            <div>
              <i className="icon_game_demo" />
              <span>{t("choi thu")}</span>
            </div>
            <div>
              <i className="icon_pc_login" />
              <span>{t("may tinh")}</span>
            </div>
          </div>
        </div>
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
};

export default LoginForm;
