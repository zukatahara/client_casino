//@ts-nocheck
import "./lucky-mobile.css";
const ModalDetailMobile = ({ isOpenModal, setIsOpenModal, data }) => {
  return (
    <div
      class={`layui-layer layer-anim layui-layer-dialog demo-class ${
        !isOpenModal && "hidden"
      }`}
      id="layui-layer1"
      type="dialog"
    >
      <div className="layui-layer-title text-center">
        Thông báo trúng thưởng
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
          OK
        </a>
      </div>
    </div>
  );
};

export default ModalDetailMobile;
