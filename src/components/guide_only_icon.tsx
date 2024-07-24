import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const GuideOnlyIcon = ({
  content,
}: {
  content: {
    title: string;
    c: string;
  };
}) => {
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

  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <div data-v-70226fc4 className="playRuleBtnBox">
          {/* <i
            data-v-70226fc4
            id="info_rule"
            className="iconfont icon-icon_remind mr-2"
          /> */}
          <label
            data-v-70226fc4
            htmlFor="info_rule"
            style={{ cursor: "pointer" }}
          >
            <div className="i-signal"></div>
          </label>
          {/* <label
            data-v-70226fc4
            htmlFor="info_rule"
            style={{ cursor: "pointer" }}
          >
            Cách chơi
          </label> */}
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
          <p className="block mb-4">{content.title}</p>
          <span>{renderTemplateWithBreaks(content.c)}</span>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default GuideOnlyIcon;
