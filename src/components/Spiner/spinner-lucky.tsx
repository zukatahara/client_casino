//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { LuckyDrawHistory } from "./dataLuckyHistory";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

import "./lucky.css";
import axios from "axios";
import Lucky from "./spiner.js";
import { LuckyWheel } from "@lucky-canvas/react";
import ModalDetail from "./ModalDetail.js";
import prizeApi from "@/apis/prize.api.js";
import toast from "react-hot-toast";
import { da, de } from "date-fns/locale";
import moment from "moment";
import Config from "@/constants/config.js";
import { URL } from "@/constants/url.js";
import { NS } from "@/constants/ns.js";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n/index.js";
type Props = {};
const LIST_BACKGROUND = ["#e9e8fe", "#b8c5f2", "#75BCB8"];
const CONFIG_IMAGE = {
  "vi-VN": {
    icon_menu: "/lucky/dzp.png",
    btn_start: "/lucky/btnstart.png",
    btn_start_loading: "/lucky/btnstartloading.png",
    header_detail: "/lucky/di_1_v.png",
    header_history: "/lucky/di_2_v.png",
    title: "/lucky/title.png",
    detail: "/lucky/zpsm.png",
    header_circle: "/lucky/ztlight.gif",
    header_circle_loading: "/lucky/ztlight2.gif",
  },
  "th-TH": {
    icon_menu: "/lucky/dzp_th.png",
    btn_start: "/lucky/btnstart_th.png",
    btn_start_loading: "/lucky/btnstartloading_th.png",
    header_detail: "/lucky/di_1_v_th.png",
    header_history: "/lucky/di_2_v_th.png",
    title: "/lucky/title_th.png",
    detail: "/lucky/zpsm_th.png",
    header_circle: "/lucky/ztlight_th.gif",
    header_circle_loading: "/lucky/ztlight2_th.gif",
  },
};
export default function SpinnerLucky({}: Props) {
  const { t, i18n } = useTranslation([NS["ALL"]]);
  const config = Config();
  const IMAGE_BY_LANGUAGE = CONFIG_IMAGE[i18n.language];
  const myLucky = useRef();
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(true);
  const [detailPrize, setDetailPrize] = useState();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [countPrize, setCountPrize] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [openMiniIcon, setOpenMiniIcon] = useState(true);
  const dataLuckyHistory = LuckyDrawHistory();
  const getData = async () => {
    const data = await prizeApi.getPrizeList();

    const handleListPrize = data?.data?.data?.map((item, index) => ({
      id: item?.id,
      background: LIST_BACKGROUND[index % 3],
      fonts: [{ text: item?.prizeName, top: 90, fontSize: 13 }],
      imgs: [
        {
          src: `${URL.baseUrl}${item?.prizeIcon}`,
          width: 60,
          height: 60,
          top: 20,
        },
      ],
    }));
    setPrizes(handleListPrize);
  };
  function handleDiLeftClick() {
    setDetail(true); // Gọi hàm setDetail với đối số true
  }

  function handleDiRightClick() {
    setDetail(false); // Gọi hàm setDetail với đối số false
  }
  const handleData = () => {};
  const handlePlay = async () => {
    if (loading || openModal) return;
    if (countPrize === 0)
      return toast.error(t("khong_con_du_luot", { ns: "all" }));
    const result = await prizeApi.getPrize();

    const { status, index, message } = result?.data;
    if (!status) {
      return toast.error(message || t("co_loi", { ns: "all" }));
    }
    const findIndex = prizes?.findIndex((item) => item?.id === index);
    myLucky.current.play();
    setLoading(true);
    setTimeout(() => {
      myLucky.current.stop(findIndex);
      getCountPrize();
      getHistoryPrize();
    }, 2500);
  };

  const getHistoryPrize = async () => {
    const data = await prizeApi.historyPrize(page, 7);
    if (data?.data?.status) {
      setHistory(data?.data?.data);
      setTotalPage(data?.data?.total || 0);
    }
  };
  const getCountPrize = async () => {
    const data = await prizeApi.countPrize();
    if (data?.data?.status) setCountPrize(data?.data?.count);
  };
  const [blocks] = useState([
    {
      padding: "10px",
      background: "#869cfa",
    },
  ]);

  const [prizes, setPrizes] = useState([]);
  const [buttons] = useState([
    {
      radius: "30%",

      pointer: true,
      fonts: [{ text: "", top: "-10px" }],
      imgs: [{ src: "/lucky/center.png", top: -100 }],
    },
  ]);
  useEffect(() => {
    getCountPrize();
    getData();
  }, []);
  useEffect(() => {
    getHistoryPrize();
  }, [page]);
  return (
    <div className="pc">
      {!open && (
        <div
          className="dzp"
          style={{ display: openMiniIcon ? "block" : "none" }}
        >
          <img
            src="/lucky/bonus_bagClose.png"
            className="closeBag"
            onClick={() => setOpenMiniIcon(false)}
          />
          <img
            className="barrage_name"
            src={IMAGE_BY_LANGUAGE?.icon_menu}
            border="0"
            width="80"
            height="80"
            onClick={() => setOpen(true)}
          />
        </div>
      )}
      <div className="turnplate" style={{ display: open ? "block" : "none" }}>
        <img className="mv" src="/lucky/mv.png" border="0" />
        <div id="initTrunplate"></div>
        <p className="integrals">
          {t("so_luot_con_lai", { ns: "all" })}:<span>{countPrize}</span>
        </p>
        <img src="/lucky/di.png" className="di" />
        <img src={IMAGE_BY_LANGUAGE?.title} alt="img" className="rigTitle" />

        <img
          src={IMAGE_BY_LANGUAGE?.header_detail}
          class="di_1"
          style={{ display: detail ? "block" : "none" }}
        />
        <img
          src={IMAGE_BY_LANGUAGE?.header_history}
          class="di_2"
          style={{ display: detail ? "none" : "block" }}
        />
        <span class="di_left" onClick={handleDiLeftClick}></span>
        <span class="di_right" onClick={handleDiRightClick}></span>
        <div
          ng-show="changeTuran"
          class="xxk"
          style={{ display: detail ? "block" : "none" }}
        >
          <img
            className="di_text"
            src={IMAGE_BY_LANGUAGE?.detail}
            alt=""
            style={{ marginTop: "-12.5%" }}
          />
          <ul
            className="rules"
            style={{
              overscrollBehavior: "contain",
            }}
          >
            <li ng-repeat="(i,value) in turnRules">
              <img src="/lucky/xin.png" className="inline-block" />
              {t("chu_y", { ns: "all" })}:{" "}
            </li>
            <li ng-repeat="(i,value) in turnRules" className="inline-block	">
              <img src="/lucky/xin.png" alt="" className="inline-block	" />
              {t("sau_khi_trung_giai_thuong_vui_long", { ns: "all" })}
            </li>
            <li ng-repeat="(i,value) in turnRules">
              <img src="/lucky/xin.png" alt="" className="inline-block	" />
              {t("doi_voi_giai_diem_thuong_chi_can", { ns: "all" })}
            </li>
            <li ng-repeat="(i,value) in turnRules">
              <img src="/lucky/xin.png" alt="" className="inline-block	" />
              {t("moi_lan_nap_1_000_000_diem_se_duoc_mot_luot_quay", {
                ns: "all",
              })}
            </li>
          </ul>
        </div>

        <div
          id="di_text"
          class="xxk"
          style={{ display: detail ? "none" : "block" }}
        >
          <p class="title">
            <span style={{ width: "50%" }}>
              {t("giai_thuong", { ns: "all" })}
            </span>
            <span style={{ width: "50%" }}>
              {t("thoi_gian", { ns: "all" })}
            </span>
          </p>
          {history?.map((item, index) => (
            <p class="title" key={`prize_history_${index}`}>
              <span style={{ width: "50%" }}>{item.prizeName}</span>
              <span style={{ width: "50%" }}>
                {moment(item.created_at).format("HH:mm DD/MM/YYYY")}
              </span>
            </p>
          ))}
          <div className="flex justify-end pr-[25px] items-center">
            <GrCaretPrevious
              size={20}
              onClick={() => setPage(page - 1)}
              className={`${page > 1 ? "" : "invisible"}`}
            />

            <span className="text-[15px] px-2 text-[#b911ff] bg-gradient-to-tr from-slate-300 via-slate-50 to-slate-200 rounded shadow mx-4">
              {page}
            </span>

            <GrCaretNext
              size={20}
              onClick={() => setPage(page + 1)}
              className={`${page < totalPage ? "" : "invisible"}`}
            />
          </div>
        </div>
        <span
          className="numberFree"
          style={{
            position: "absolute",
            zIndex: 999,
            left: "151%",
            width: "100%",
            bottom: "0%",
            color: "#fff",
          }}
        ></span>

        <img
          src={
            loading
              ? IMAGE_BY_LANGUAGE?.header_circle_loading
              : IMAGE_BY_LANGUAGE?.header_circle
          }
          alt="img"
          className="ztlightTitle"
        />
        <div
          className="bg_1"
          id="turnplate_bg"
          style={{
            backgroundImage: `url(
                "https://staticvnd07.fhcdn.cc/upload/v012/customise/images/170062686171prizeIconNew.jpg"
              )`,
          }}
        ></div>
        <img
          className="c163_close"
          src="/lucky/close.png"
          onClick={() => setOpen(false)}
        />
        <div class="zjbj">
          <img src="/lucky/win2.png" class="zjts" />
          <img src="/lucky/win.png" class="zjts" />
          <div class="zjpointer animg">
            <img src="/lucky/zjbg.png" class="zjxz" />
            <span></span>
          </div>
          <span className="zjtext"></span>
        </div>
        <div className="sddh">
          <img src="/lucky/sddhbj.png" alt="img" />
        </div>
        <div className="btnrow">
          <div className="btnstart" onClick={() => handlePlay()}>
            <img
              src={
                loading || openModal || countPrize === 0
                  ? IMAGE_BY_LANGUAGE?.btn_start_loading
                  : IMAGE_BY_LANGUAGE?.btn_start
              }
              className="btnstartimg"
            />
          </div>
        </div>
        <div className="banner">
          <div className="content">
            <div>
              <LuckyWheel
                ref={myLucky}
                width="500px"
                height="500px"
                blocks={blocks}
                prizes={prizes}
                buttons={buttons}
                onStart={() => handlePlay()}
                onEnd={(prize) => {
                  setLoading(false);
                  setOpenModal(true);
                  setOpenModal(true);
                  setDetailPrize(prize);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="mobile2-mask"
        style={{
          overflow: "hidden",
          zIndex: 999,
          display: open ? "block" : "none",
        }}
      ></div>
      <ModalDetail
        isOpenModal={openModal}
        setIsOpenModal={setOpenModal}
        data={detailPrize}
      />
    </div>
  );
}
