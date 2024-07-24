import {
  Dialog,
  DialogContent2,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NS } from "@/constants/ns";
import { useTranslation } from "react-i18next";

interface DialogRegisterSuccessProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionModal: React.FC<DialogRegisterSuccessProps> = ({
  open,
  setOpen,
}) => {
  const { t } = useTranslation([NS["ALL"]]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent2 className="m-0 p-0 max-w-[320px]  rounded-[10px]">
        <DialogHeader>
          <DialogTitle className="text-center font-normal py-2 border-b-[1px] border-gray-300 text-[16px]">
            {t("so_du_chua_xu_ly_la_gi", { ns: "all" })}
          </DialogTitle>
        </DialogHeader>
        <div className="px-5">
          <p className="text-[15px] mb-1">
            {t("so_du_chua_xu_ly_bao_gom_nhung", { ns: "all" })}
          </p>

          <p className="text-[15px] mb-1">
            {t("1_tai_khoan_co_don_cuoc_chua", { ns: "all" })}
          </p>
          <p className="text-[15px] mb-1">
            {t("2_tai_khoan_co_don_rut_tien_chua", { ns: "all" })}
          </p>
          <p className="text-[15px]">
            {t("3_tai_khoan_dang_tien_hanh_chuyen", { ns: "all" })}
          </p>
        </div>
        <div className="flex justify-center mb-3">
          <button
            className="py-2 w-[80%] rounded-md bg-[#4a69ff] text-white"
            onClick={() => setOpen(false)}
          >
            {t("xac_nhan", { ns: "all" })}
          </button>
        </div>
      </DialogContent2>
    </Dialog>
  );
};

export default QuestionModal;
