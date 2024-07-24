//@ts-nocheck

import { NS } from "@/constants/ns";
import { useTranslation } from "react-i18next";

const ModalDetail = ({ isOpenModal, setIsOpenModal, data }) => {
  const { t, i18n } = useTranslation([NS["ALL"]]);

  return (
    <div
      class={`layui-layer layer-anim layui-layer-dialog demo-class ${
        !isOpenModal && "hidden"
      }`}
      id="layui-layer1"
      type="dialog"
      style={{
        zIndex: 19891016,
        width: 360,
        top: 321,
        left: "50%",
        position: "fixed",
        transform: "translate(-50%, 0)",
      }}
    >
      <div className="layui-layer-title">
        {t("thong_bao_trung_thuong", { ns: "all" })}
      </div>
      <div
        id=""
        className="layui-layer-content text-black grid justify-center items-center justify-items-center"
      >
        <span className="text-center text-xl">{data?.fonts?.[0]?.text}</span>
        <img
          src={data?.imgs?.[0]?.src}
          width={100}
          height={100}
          className="h-[100px] w-[100px]"
        />
      </div>
      <span className="layui-layer-setwin">
        <div
          className="layui-layer-ico layui-layer-close layui-layer-close1"
          onClick={() => setIsOpenModal(false)}
        ></div>
      </span>
      <div className="layui-layer-btn">
        <a className="layui-layer-btn0" onClick={() => setIsOpenModal(false)}>
          {t("ok", { ns: "all" })}
        </a>
      </div>
    </div>
  );
};

export default ModalDetail;
