//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import "./lucky-mobile.css";

import { LuckyDrawHistory } from "./dataLuckyHistory";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import axios from "axios";
import Lucky from "./spiner.js";
import { LuckyWheel } from "@lucky-canvas/react";
import ModalDetail from "./ModalDetail.js";
import ModalDetailMobile from "./ModalDetailMobile.js";
import prizeApi from "@/apis/prize.api.js";
import toast from "react-hot-toast";
import moment from "moment";
import Config from "@/constants/config.js";
import { URL } from "@/constants/url.js";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns.js";

type Props = {};
const LIST_BACKGROUND = ["#e9e8fe", "#b8c5f2", "#75BCB8"];
const CONFIG_IMAGE = {
  "vi-VN": {
    icon_menu: "/lucky/dzp.png",
    header_detail: "/lucky/di_1_v.png",
    header_history: "/lucky/di_2_v.png",
    title: "/lucky/title.png",
    detail: "/lucky/zpsm.png",
    header_circle: "/lucky/ztlight.gif",
    header_circle_loading: "/lucky/ztlight2.gif",
  },
  "th-TH": {
    icon_menu: "/lucky/dzp_th.png",
    header_detail: "/lucky/di_1_v_th.png",
    header_history: "/lucky/di_2_v_th.png",
    title: "/lucky/title_th.png",
    detail: "/lucky/zpsm_th.png",
    header_circle: "/lucky/ztlight_th.gif",
    header_circle_loading: "/lucky/ztlight2_th.gif",
  },
};
export default function SpinnerLuckyMobile({}: Props) {
  const { t, i18n } = useTranslation([NS["ALL"]]);
  const config = Config();
  const IMAGE_BY_LANGUAGE = CONFIG_IMAGE[i18n.language];
  const myLucky = useRef();
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(true);
  const [detailPrize, setDetailPrize] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openMiniIcon, setOpenMiniIcon] = useState(true);
  const [countPrize, setCountPrize] = useState(0);
  const [history, setHistory] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [detail, setDetail] = useState(true);
  const [page, setPage] = useState(1);
  const getData = async () => {
    const data = await prizeApi.getPrizeList();

    const handleListPrize = data?.data?.data?.map((item, index) => ({
      id: item?.id,
      background: LIST_BACKGROUND[index % 3],
      fonts: [{ text: item?.prizeName, top: 60, fontSize: 10 }],
      imgs: [
        {
          src: `${URL.baseUrl}${item?.prizeIcon}`,
          width: 50,
          height: 40,
          top: 10,
        },
      ],
    }));
    setPrizes(handleListPrize);
  };
  const dataLuckyHistory = LuckyDrawHistory();

  function handleDiLeftClick() {
    setDetail(true); // Gọi hàm setDetail với đối số true
  }

  function handleDiRightClick() {
    setDetail(false); // Gọi hàm setDetail với đối số false
  }
  const handlePlay = async () => {
    if (loading || openModal) return;
    if (countPrize === 0)
      return toast.error(t("khong_con_du_luot", { ns: "all" }));
    setLoading(true);
    const result = await prizeApi.getPrize();
    const { status, index, message } = result?.data;
    if (!status) {
      return toast.error(message || t("co_loi", { ns: "all" }));
    }
    myLucky.current.play();
    const findIndex = prizes?.findIndex((item) => item?.id === index);
    setTimeout(() => {
      getCountPrize();
      myLucky.current.stop(findIndex);
      getHistoryPrize();
    }, 2500);
  };
  const [blocks] = useState([
    {
      padding: "10px",
      background: "#869cfa",
    },
  ]);
  const getCountPrize = async () => {
    const data = await prizeApi.countPrize();
    if (data?.data?.status) setCountPrize(data?.data?.count);
  };
  const [prizes, setPrizes] = useState([]);
  const getHistoryPrize = async () => {
    const data = await prizeApi.historyPrize(page, 5);
    if (data?.data?.status) {
      setHistory(data?.data?.data);
      setTotalPage(data?.data?.total || 0);
    }
  };
  const [buttons] = useState([
    {
      radius: "30%",
      pointer: true,
      fonts: [{ text: "", top: "-10px" }],
      imgs: [{ src: "/lucky/center.png", top: -50, height: 100 }],
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
    <div className={`mobile !min-h-0`}>
      {!open && (
        <div
          className="dzp"
          style={{ display: openMiniIcon ? "block" : "none" }}
        >
          <img
            src="https://staticvnd07.fhcdn.cc/images/bonus_bagClose.png"
            className="closeBag"
            onClick={() => setOpenMiniIcon(false)}
          />
          <img
            className="barrage_name"
            src={IMAGE_BY_LANGUAGE.icon_menu}
            onClick={() => setOpen(true)}
            border="0"
            width="80"
            height="80"
          />
        </div>
      )}
      <div className="turnplate" style={{ display: open ? "block" : "none" }}>
        <div id="initTrunplate"></div>
        {/* <p className="integrals">
          Điểm còn lại:<span>0</span>
        </p> */}
        <div className="w-[100vw] di-mobile" />

        {/* <img src="/lucky/di_1_v.png" className="di_1" /> */}
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
          className=""
          bis_skin_checked="1"
          style={{ display: detail ? "block" : "none" }}
        >
          <span className="count_prize">
            {t("so_luot_con_lai", { ns: "all" })}: {countPrize}
          </span>
          <img className="di_text" alt="" src={IMAGE_BY_LANGUAGE?.detail} />

          <ul className="rules" style={{ overflowY: "scroll" }}>
            <li className="ng-binding">
              <img alt="" className="inline-block" src="/lucky/xin.png" />{" "}
              {t("chu_y", { ns: "all" })}:
            </li>
            <li className="ng-binding">
              <img alt="" className="inline-block" src="/lucky/xin.png" />
              {t("sau_khi_trung_giai_thuong_vui_long", { ns: "all" })}
            </li>
            <li className="ng-binding">
              <img alt="" className="inline-block" src="/lucky/xin.png" />
              {t("doi_voi_giai_diem_thuong_chi_can", { ns: "all" })}
            </li>
            <li className="ng-binding">
              <img alt="" className="inline-block" src="/lucky/xin.png" />
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
                {moment(item?.created_at).format("HH:mm DD/MM/YYYY")}
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
          <div class="content"></div>
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
              ? IMAGE_BY_LANGUAGE.header_circle_loading
              : IMAGE_BY_LANGUAGE.header_circle
          }
          alt="img"
          className="ztlightTitle"
        />

        <img
          className="c163_close"
          src="/lucky/close.png"
          onClick={() => setOpen(false)}
        />
        <div className="zjbj">
          <img src="/lucky/win2.png" className="zjts" />
          <img src="/lucky/win.png" className="zjts" />
          <div className="zjpointer animg">
            <img src="/lucky/zjbg.png" className="zjxz" />
            <span></span>
          </div>
          <span className="zjtext"></span>
        </div>
        <div className="sddh">
          <img src="/lucky/sddhbj.png" alt="img" />
        </div>

        <div className="banner">
          <div className="content">
            <div>
              <LuckyWheel
                ref={myLucky}
                width="356px"
                height="356px"
                blocks={blocks}
                prizes={prizes}
                buttons={buttons}
                onStart={() => handlePlay()}
                onEnd={(prize) => {
                  setLoading(false);
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
      <ModalDetailMobile
        isOpenModal={openModal}
        setIsOpenModal={setOpenModal}
        data={detailPrize}
      />
    </div>
  );
}
