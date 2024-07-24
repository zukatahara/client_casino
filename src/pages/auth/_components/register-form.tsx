import authApi from "@/apis/auth.api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AppContext } from "@/contexts/app.context";
// import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { Turnstile } from "@marsidev/react-turnstile";
import toast from "react-hot-toast";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { URL } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const RegisterForm = () => {
  const { t } = useTranslation([NS.ALL]);
  const usernameSchema = z
    .string()
    .min(6, {
      message: t("tai khoan bat buoc co 6 - 12 ky tu"),
    }) // 6 chars min
    .max(12, {
      message: t("tai khoan bat buoc co 6 - 12 ky tu"),
    }) // 12 chars max
    .regex(/^[a-z0-9]+$/i, { message: t("chi chua chu thuong va so") })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message: t("phai chua it nhat 1 chu va 1 so"),
    });
  const passwordSchema = z
    .string()
    .min(6, {
      message: t("mat khau bat buoc co 6 - 12 ky tu"),
    }) // 6 chars min
    .max(12, {
      message: t("mat khau bat buoc co 6 - 12 ky tu"),
    }) // 12 chars max
    .regex(/^[a-z0-9]+$/i, { message: t("chi chua chu thuong va so") })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message: t("phai chua it nhat 1 chu va 1 so"),
    });
  const formSchema = z
    .object({
      username: usernameSchema,
      password: passwordSchema,
      re_password: z.string().min(6, {
        message: t("mat khau xac nhan bat buoc co 6 - 12 ky tu"),
      }),
      fullname: z.string().min(2, {
        message: t("ho ten khong duoc de trong"),
      }),
      sdt: z.string().min(10, {
        message: t("so dien thoai khong hop le"),
      }),
    })
    .superRefine(({ password, re_password }, ctx) => {
      if (password !== re_password) {
        ctx.addIssue({
          code: "custom",
          message: t("mat khau xac nhan chua chinh xac"),
          path: ["re_password"],
        });
      }
    });
  const [status, setStatus] = useState("");
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  // const { toast } = useToast();
  const { setIsAuthenticated, setAuth } = useContext(AppContext);
  const refTurnstile = useRef<TurnstileInstance>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      re_password: "",
      fullname: "",
      sdt: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (body: z.infer<typeof formSchema>) =>
      authApi.registerAccount({ ...body, key }),
    onSuccess: (data) => {
      if (data.data.status) {
        setIsAuthenticated(true);
        setAuth(data.data.data);
        navigate("/");
        form.reset();
      } else {
        refTurnstile.current?.reset();
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (status !== "solved") {
      return toast.error(t("thao tac khong hop le"));
    }
    loginMutation.mutate(values);
  }

  // const handleInvalidLogin = () => {
  //   toast({
  //     title: "Đăng nhập không thành công",
  //     description: "Vui lòng điền đầy đủ thông tin",
  //     variant: "destructive",
  //   });
  // };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="van-form">
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
              <FormMessage className="text-sm" />
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
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="re_password"
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
                        placeholder={t("nhap lai mat khau")}
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
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sdt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="van-cell van-field">
                  <div className="van-field__left-icon">
                    <i className="icon_handphone" />
                  </div>
                  <div className="van-cell__value van-cell__value--alone van-field__value">
                    <div className="van-field__body">
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder={t("nhap so dien thoai")}
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
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="van-cell van-field">
                  <div className="van-field__left-icon">
                    <i className="icon_personal_data" />
                  </div>
                  <div className="van-cell__value van-cell__value--alone van-field__value">
                    <div className="van-field__body">
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder={t("ho ten trung voi tai khoan rut tien")}
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
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <div className="btns">
          <Turnstile
            onError={() => setStatus("error")}
            onExpire={() => setStatus("expired")}
            onSuccess={(data) => {
              setKey(data);
              setStatus("solved");
            }}
            className="block mx-auto mb-4"
            siteKey={URL.siteKey}
            ref={refTurnstile}
          />
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
              <span className="van-button__text">{t("click de dang ky")}</span>
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

export default RegisterForm;
