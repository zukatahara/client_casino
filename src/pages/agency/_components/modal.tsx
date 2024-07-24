import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NS } from "@/constants/ns";
import { CheckCircle2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface DialogRegisterSuccessProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegisterSuccess: React.FC<DialogRegisterSuccessProps> = ({
  open,
  setOpen,
}) => {
  const { t } = useTranslation([NS["ALL"]]);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[#a5ade0]">
            {t("dang_ky_dai_ly", { ns: "all" })}
          </DialogTitle>
        </DialogHeader>
        <CheckCircle2Icon size={80} color="#30d96c" className="mx-auto" />

        <p className="text-center text-[#adb8d4]">
          {t("quy_khach_da_dang_ky_thanh_cong", { ns: "all" })}
        </p>
        <Link
          to={`https://agency.${location.hostname.replace("www", "")}`}
          target="_blank"
        >
          <button className="w-full mt-3 rounded-lg bg-gradient-to-r from-[#7146ff] to-[#4a69ff] p-3 text-white">
            {t("xac_nhan", { ns: "all" })}
          </button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterSuccess;
