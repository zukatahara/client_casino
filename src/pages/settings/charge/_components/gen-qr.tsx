import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GenQr = ({
  open,
  setOpen,
  qrCode,
  handleGenQRCode,
  handleOk,
  t,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
  qrCode: string;
  handleGenQRCode: any;
  handleOk: any;
  t: any;
}) => {
  return (
    <Dialog open={open} onOpenChange={qrCode ? setOpen : () => {}}>
      <DialogTrigger className="ml-auto">
        <Button
          onClick={handleGenQRCode}
          className="text-sm px-10 py-5 rounded-md"
        >
          {t("deposit_now")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl p-0 h-[75vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="shadow-[inset_0_-1px_0_0_rgba(144,162,220,.4)]">
            <div className="text-center font-normal text-lg p-3 text-[#8491a5]">
              {t("qr_payment")}
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-5 text-[14px] text-[#8491a5]">
          <img src={qrCode} className="block w-4/5 mx-auto" alt="" />
          <p className="text-red-500 text-[16px]">{t("open_bank_app")}</p>
          <p className="text-red-500 text-[16px]">{t("do_not_modify")}</p>
          <div className="my-5 flex justify-around w-full">
            <Button
              className="text-sm px-10 py-5 rounded-md "
              variant={"secondary"}
              onClick={() => setOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleOk}
              className="text-sm px-10 py-5 rounded-md "
            >
              {t("payment_done")}
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default GenQr;
