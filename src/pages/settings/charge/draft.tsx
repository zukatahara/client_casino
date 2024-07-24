// import React, { useContext, useEffect, useState } from "react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Terminal } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import authApi from "@/apis/auth.api";
// import { AppContext } from "@/contexts/app.context";
// import config from "@/constants/config";
// import { useToast } from "@/hooks/use-toast";

// const formSchema = z
//   .object({
//     money: z.string(),
//   })
//   .superRefine((data, ctx) => {
//     if (Number(data.money) < 100000) {
//       ctx.addIssue({
//         code: "custom",
//         message: "Số tiền phải lớn hơn 100.000",
//         path: ["money"],
//       });
//     }
//   });

// interface Bank {
//   id: number;
//   name_bank: string;
//   name_u_bank: string;
//   qr_code: string;
//   stk_bank: string;
//   time: string;
// }

const ChargePage = () => {
  // const { profile } = useContext(AppContext);
  // const [bankSelect, setBankSelect] = useState<Bank>();
  // const { toast } = useToast();
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     money: "",
  //   },
  // });
  // const { data } = useQuery({
  //   queryKey: ["banks-charge"],
  //   queryFn: () => authApi.getListBankCharge(),
  // });

  // const chargeMutation = useMutation({
  //   mutationFn: (money: number) => {
  //     return authApi.charge({
  //       chutk: bankSelect?.name_u_bank as string,
  //       money,
  //       namebank: bankSelect?.name_bank as string,
  //       noidung: profile?.username as string,
  //       stk: bankSelect?.stk_bank as string,
  //     });
  //   },
  //   onSuccess: (data) => {
  //     if (data.data.status) {
  //       form.reset();
  //       toast({
  //         title: "Chuyển khoản thành công",
  //       });
  //     } else {
  //       toast({
  //         title: "Chuyển khoản không thành công",
  //         description: data.data.msg,
  //         variant: "destructive",
  //       });
  //     }
  //   },
  // });
  // const onSubmit = (body: z.infer<typeof formSchema>) => {
  //   chargeMutation.mutate(Number(body.money));
  // };
  // const banks = data?.data.data || [];
  // useEffect(() => {
  //   if (data && data.data.data) {
  //     setBankSelect(data.data.data[0]);
  //   }
  // }, [data]);

  return (
    // <div>
    //   <Alert variant={"destructive"}>
    //     <Terminal className="h-4 w-4" />
    //     <AlertDescription>
    //       Mức nạp tiền tối thiểu 100.000 ₫ Tối đa 3.000.000.000 ₫
    //     </AlertDescription>
    //   </Alert>
    //   <Alert className="my-4 text-cyan-600">
    //     <Terminal className="h-4 w-4" />
    //     <AlertDescription>
    //       Chú ý nhập đúng nội dung khi chuyển khoản, phân biệt kí tự viết hoa
    //       hoặc thường, nhập sai không thể lên điểm.
    //     </AlertDescription>
    //   </Alert>
    //   <Tabs value={bankSelect?.id.toString()} className="w-full">
    //     <TabsList>
    //       {banks &&
    //         banks.length > 0 &&
    //         banks.map((bank) => (
    //           <TabsTrigger
    //             key={bank.id}
    //             onClick={() => setBankSelect(bank)}
    //             value={bank.id.toString()}
    //           >
    //             {bank.name_bank}
    //           </TabsTrigger>
    //         ))}
    //     </TabsList>
    //     {banks &&
    //       banks.length > 0 &&
    //       banks.map((bank) => (
    //         <TabsContent value={bank.id.toString()}>
    //           <div className="flex justify-start items-start">
    //             <div className="w-2/3">
    //               <h3 className="text-lg font-medium">
    //                 Vui lòng chuyển khoản vào ngân hàng sau
    //               </h3>
    //               <div className="border bg-slate-50 dark:bg-slate-500 rounded-md p-4 w-full">
    //                 <div className="space-y-4">
    //                   <div className="font-medium flex justify-start items-center">
    //                     <div className="w-2/3">
    //                       <span className="text-slate-500 dark:text-slate-200">Tên tài khoản</span>
    //                       <span className="text-base ml-4">
    //                         {bank.name_u_bank}
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="space-y-4">
    //                   <div className="font-medium flex justify-start items-center">
    //                     <div className="w-2/3">
    //                       <span className="text-slate-500 dark:text-slate-200">số tài khoản</span>
    //                       <span className="text-base ml-4">{bank.stk_bank}</span>
    //                     </div>
    //                     <Button>Sao chép</Button>
    //                   </div>
    //                 </div>
    //               </div>
    //               <h3 className="text-lg font-medium mt-6">
    //                 Thông tin nạp tiền
    //               </h3>
    //               <div className="border bg-slate-50 dark:bg-slate-500 rounded-md p-4 w-full">
    //                 <Form {...form}>
    //                   <form className="space-y-8">
    //                     <FormField
    //                       control={form.control}
    //                       name="money"
    //                       render={({ field }) => (
    //                         <FormItem>
    //                           <FormLabel>Số tiền</FormLabel>
    //                           <FormControl>
    //                             <Input
    //                               type="number"
    //                               placeholder="Nhập số tiền lớn hơn 100.000 ₫"
    //                               {...field}
    //                             />
    //                           </FormControl>
    //                           <FormMessage />
    //                         </FormItem>
    //                       )}
    //                     />
    //                     <FormItem>
    //                       <FormLabel>Nội dung</FormLabel>
    //                       <FormControl>
    //                         <Input value={profile?.username} disabled />
    //                       </FormControl>
    //                       <FormMessage />
    //                     </FormItem>
    //                   </form>
    //                 </Form>
    //               </div>
    //             </div>
    //             <div className="w-1/3">
    //               <div className="border bg-slate-50 dark:bg-slate-500 rounded-md p-4 ml-2 mt-7 flex justify-center items-center text-center flex-col">
    //                 <p className="text-slate-500 dark:text-slate-200"> Quét mã thanh toán</p>
    //                 <AspectRatio className="mt-4">
    //                   <img
    //                     src={`${config.baseUrl + bank.qr_code}`}
    //                     alt="Image"
    //                     className="rounded-md object-cover"
    //                   />
    //                 </AspectRatio>
    //                 <span className="text-slate-500 dark:text-slate-200">
    //                   Quét mã thanh toán QR, nếu có bất kỳ thắc mắc nào vui lòng
    //                   liên hệ cskh để được tư vấn và hỗ trợ!
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //         </TabsContent>
    //       ))}
    //   </Tabs>

    //   <div className="w-full flex justify-center items-center mt-8">
    //     <Button
    //       isLoading={chargeMutation.isLoading}
    //       onClick={form.handleSubmit(onSubmit)}
    //       type="button"
    //     >
    //       Xác nhận nạp tiền
    //     </Button>
    //   </div>
    // </div>
    <div></div>
  );
};

export default ChargePage;
