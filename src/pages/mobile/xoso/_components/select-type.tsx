// @ts-nocheck

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrderProps } from "@/types/order.type";
import { minCuocProps, tiLeProps } from "..";
import Config from "@/constants/config";

interface SelectTypeProps {
  open: Boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: OrderProps;
  setOrder: React.Dispatch<React.SetStateAction<OrderProps>>;
  listTheLoaiNew: any;
  setListTheLoaiNew: React.Dispatch<React.SetStateAction<any>>;
  contentCachChoi: any;
  setContentCachChoi: React.Dispatch<React.SetStateAction<any>>;
  listType: any;
  setListType: React.Dispatch<React.SetStateAction<any>>;
  setListTypeNhap: React.Dispatch<React.SetStateAction<any>>;
  setTypeNhap: React.Dispatch<React.SetStateAction<any>>;
  theLoai: string;
}

const SelectType = ({
  open,
  setOpen,
  order,
  setOrder,
  listTheLoaiNew,
  setListTheLoaiNew,
  contentCachChoi,
  setContentCachChoi,
  listType,
  setListType,
  setListTypeNhap,
  setTypeNhap,
  theLoai,
}: SelectTypeProps) => {
  const config = Config();
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className="bg-[#2f395f] rounded-xl ">
        <div className="grid gap-2 max-h-[400px] overflow-scroll mb-5">
          {listTheLoaiNew.map((item, index) => {
            if (
              (theLoai.includes("xsmn") || theLoai.includes("xsmt")) &&
              item.value === "dacsac"
            )
              return null;
            return (
              <div className="grid gap-1" key={item.value}>
                <p className="text-white">{item.title}</p>
                <div className="grid grid-cols-3 gap-4">
                  {item.listType.map((type, index) => {
                    return (
                      <button
                        key={type.value}
                        className={`p-1 inline-flex items-center justify-center rounded-xl text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                          type.value === contentCachChoi.value
                            ? "bg-[linear-gradient(104deg,#7146ff,#4a69ff)] text-primary-foreground hover:bg-primary/90"
                            : "bg-[#384369] text-[#6b99dc] hover:bg-accent hover:text-accent-foreground "
                        }`}
                        onClick={() => {
                          setListType(item);
                          setContentCachChoi(type);
                          setOrder({
                            value: "",
                            price: 0,
                            tiLe: 0,
                            soNhan: 0,
                            type: "",
                          });
                          setListTypeNhap(config.typeEnter[item.value]);
                          setTypeNhap(config.typeEnter[item.value][0].value);
                          setOpen(!open);
                        }}
                      >
                        {type.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectType;
