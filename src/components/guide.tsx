import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const Guide = ({
  content,
}: {
  content: {
    title: string;
    c: string;
    value?: string;
  };
}) => {
  const { id } = useParams();
  const { t } = useTranslation(NS.ui);

  const renderTemplateWithBreaks = (myTemplateString: string) => {
    // Chia chuỗi thành mảng các dòng
    const lines = myTemplateString.split("\n");

    // Sử dụng map để tạo một mảng JSX với thẻ <br> ở giữa mỗi dòng
    const jsxWithBreaks = lines.map((line, index) => (
      <>
        {line}
        {index < lines.length - 1 && <br />}{" "}
        {/* Thêm <br> trừ sau dòng cuối cùng */}
      </>
    ));

    return jsxWithBreaks;
  };
  useEffect(() => {
    if (id?.includes("xsmn") || id?.includes("xsmt")) {
      switch (content.value) {
        case "lo2":
          content.c = content.c.replace(/27/g, "18");
          break;
        case "lo2so1k":
          content.c = content.c.replace(/27/g, "18");
          break;
        case "lo3so":
          content.c = content.c.replace(/23/g, "17");
          break;
        case "lo4so":
          content.c = content.c.replace(/20/g, "16");
          break;
        default:
          break;
      }
    }
  }, [content]);

  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <div data-v-70226fc4 className="playRuleBtnBox">
          <i
            data-v-70226fc4
            id="info_rule"
            className="iconfont icon-icon_remind mr-2"
          />
          <label
            data-v-70226fc4
            htmlFor="info_rule"
            style={{ cursor: "pointer" }}
          >
            {t("cach choi")}
          </label>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-xl p-0">
        <DialogHeader>
          <DialogTitle className="shadow-[inset_0_-1px_0_0_rgba(144,162,220,.4)]">
            <div className="text-center font-normal text-lg p-3 text-[#292b31]">
              {t("cach choi")}
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="h-[60vh] overflow-y-auto px-5 text-[14px] text-[#8491a5]">
          <p className="block mb-4">{t(content.title)}</p>
          <span>{renderTemplateWithBreaks(content.c)}</span>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Guide;
