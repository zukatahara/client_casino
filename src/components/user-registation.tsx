import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Turnstile } from "@marsidev/react-turnstile";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import authApi from "@/apis/auth.api";
import { useToast } from "@/hooks/use-toast";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { UserPlus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
// import config from "@/constants/config";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import { URL } from "@/constants/url";

const UserRegistation = () => {
  const { t } = useTranslation([NS["HOME"]]);

  const [status, setStatus] = useState("");
  const [key, setKey] = useState("");
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get("ref") || "";

  const refTurnstile = useRef<TurnstileInstance>(null);

  const { setIsAuthenticated, setAuth, setIsOpenModal } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const usernameSchema = z
    .string()
    .min(6, {
      message: t("header.register.tai_khoan_bat_buoc_co_6_12_ky_tu"),
    }) // 6 chars min
    .max(12, {
      message: t("header.register.tai_khoan_bat_buoc_co_6_12_ky_tu"),
    }) // 12 chars max
    .regex(/^[a-z0-9]+$/i, { message: t("chi chua chu thuong va so") })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message: t("header.register.phai_chua_it_nhat_1_chu_hoac_1_so"),
    });
  const passwordSchema = z
    .string()
    .min(6, {
      message: t("header.register.mat_khau_bat_buoc_co_6_12_ky_tu"),
    }) // 6 chars min
    .max(12, {
      message: t("header.register.mat_khau_bat_buoc_co_6_12_ky_tu"),
    }) // 12 chars max
    .regex(/^[a-z0-9]+$/i, {
      message: t("header.register.chi_chua_chu_thuong_va_so"),
    })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message: t("header.register.phai_chua_it_nhat_1_chu_hoac_1_so"),
    });

  const formSchema = z
    .object({
      username: usernameSchema,
      password: passwordSchema,
      re_password: z.string().min(6, {
        message: t("header.register.mat_khau_xac_nhan_bat_buoc_co_6_12_ky_tu"),
      }),
      fullname: z.string().min(2, {
        message: t("header.register.ho_ten_khong_duoc_de_trong"),
      }),
      sdt: z.string().min(10, {
        message: t("header.register.so_dien_thoai_khong_hop_le"),
      }),
    })
    .superRefine(({ password, re_password }, ctx) => {
      if (password !== re_password) {
        ctx.addIssue({
          code: "custom",
          message: t("header.register.mat_khau_xac_nhan_khong_chinh_xac"),
          path: ["re_password"],
        });
      }
    });

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
  const registerMutation = useMutation({
    mutationFn: (body: z.infer<typeof formSchema>) =>
      authApi.registerAccount({
        ...body,
        key,
        invite: inviteCode,
      }),
    onSuccess: (data) => {
      if (data.data.status) {
        toast({
          title: t("header.register.dang_ky_thanh_cong"),
        });
        setIsAuthenticated(true);
        setAuth(data.data.data);
        setOpen(false);
        setIsOpenModal(true);
        form.reset();
      } else {
        refTurnstile.current?.reset();
      }
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (status !== "solved") {
      return toast({
        description: t("header.register.thao_tac_khong_hop_le"),
        variant: "destructive",
      });
    }
    registerMutation.mutate(values);
  }

  useEffect(() => {
    if (inviteCode) {
      setOpen(true);
    }
  }, [inviteCode]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-3xl btn-main relative dark:text-slate-200 h-[35px] flex gap-2 text-[14px]"
        >
          {/* <Icons.userPlus className="text-main w-5 h-5" /> */}
          <UserPlus strokeWidth={1.5} className="w-5 h-5 text-main" />
          {t("header.dangky")}
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{
          borderRadius: 24,
        }}
        className="sm:max-w-[440px] p-0"
      >
        <DialogHeader className="el-dialog__header">
          <span className="el-dialog__title">
            {t("header.register.dang_ky")}
          </span>
        </DialogHeader>
        <div className="el-dialog__body">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="el-form-item el-form-item--feedback">
                        <div className="el-form-item__content">
                          <span style={{ float: "left" }}>
                            {t("header.register.tai_khoan")}
                          </span>
                          <div className="el-input el-input--prefix">
                            <input
                              type="text"
                              autoComplete="off"
                              placeholder={t("header.register.tai_khoan")}
                              className="el-input__inner"
                              {...field}
                            />
                            <span className="el-input__prefix">
                              <i className="icon icon-account" />
                            </span>
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
                      <div className="el-form-item el-form-item--feedback">
                        <div className="el-form-item__content">
                          <span style={{ float: "left" }}>
                            {t("header.register.mat_khau")}
                          </span>
                          <div className="el-input el-input--prefix">
                            <input
                              type="password"
                              autoComplete="off"
                              placeholder={t(
                                "header.register.6_15_ky_tu_chu_va_so"
                              )}
                              className="el-input__inner"
                              {...field}
                            />
                            <span className="el-input__prefix">
                              <i className="icon icon-keywords" />
                            </span>
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
                      <div className="el-form-item el-form-item--feedback">
                        <div className="el-form-item__content">
                          <span style={{ float: "left" }}>
                            {t("header.register.xac_nhan_mat_khau")}
                          </span>
                          <div className="el-input el-input--prefix">
                            <input
                              type="password"
                              autoComplete="off"
                              placeholder={t(
                                "header.register.xac_nhan_them_lan_nua"
                              )}
                              className="el-input__inner"
                              {...field}
                            />
                            <span className="el-input__prefix">
                              <i className="icon icon-keywords" />
                            </span>
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
                      <div className="el-form-item el-form-item--feedback">
                        <div className="el-form-item__content">
                          <span style={{ float: "left" }}>
                            {t("header.register.ho_ten")}
                          </span>
                          <div className="el-input el-input--prefix">
                            <input
                              type="text"
                              autoComplete="off"
                              placeholder={t(
                                "header.register.ho_ten_can_khop_voi_ten_chu_the_de_rut_tien"
                              )}
                              className="el-input__inner"
                              {...field}
                            />
                            <span className="el-input__prefix">
                              <i className="icon icon-rname" />
                            </span>
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
                      <div className="el-form-item el-form-item--feedback">
                        <div className="el-form-item__content">
                          <span style={{ float: "left" }}>
                            {t("header.register.so_dien_thoai")}{" "}
                          </span>
                          <div className="phoneInput el-input el-input--prefix">
                            <input
                              type="text"
                              autoComplete="off"
                              placeholder={t(
                                "header.register.10_chu_so_vi_du_0988888888"
                              )}
                              className="el-input__inner"
                              {...field}
                            />
                            <span className="el-input__prefix">
                              <i className="icon icon-number" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="p-5 pt-0 grid grid-cols-1">
          <Turnstile
            onError={() => setStatus("error")}
            onExpire={() => setStatus("expired")}
            onSuccess={(data) => {
              setKey(data);
              setStatus("solved");
            }}
            className="block mx-auto"
            siteKey={URL.siteKey}
            ref={refTurnstile}
          />
          <Button
            isLoading={registerMutation.isLoading}
            onClick={form.handleSubmit(onSubmit)}
            type="button"
            className="w-full rounded-3xl text-lg h-12 mt-4"
          >
            {t("header.register.dang_ky")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistation;
