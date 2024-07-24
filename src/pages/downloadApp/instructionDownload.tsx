import React from "react";
import "./downloadApp.css";
// import {
//   b1,
//   b2,
//   b3,
//   b4,
//   b5,
//   b6,
//   back_btn,
//   title_hdios,
// } from "../../assets/images/Landing_App_Vt188";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const InstructionDownload: React.FC = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const navigate = useNavigate();
  const listStep = [
    t("tai_app_b1"),
    t("tai_app_b2"),
    t("tai_app_b3"),
    t("tai_app_b4"),
    t("tai_app_b5"),
    t("tai_app_b6"),
  ];
  return (
    <div className="instruction-Download-bg pt-[120px]">
      <div className="w-full h-[120px] fixed top-0 left-0  z-50 bg-inherit">
        <img
          src={t("tai_app_title")}
          className="w-full mx-auto mt-4 max-w-[340px] md:max-w-[600px]"
        />
        <img
          src={t("tai_app_back")}
          onClick={() => navigate("/")}
          className="mx-auto w-[130px] mt-6 cursor-pointer"
        />
      </div>
      <div className="w-full max-w-[1400px] mx-auto grid md:grid-cols-3 grid-cols-2 relative z-0">
        {listStep.map((item, index) => {
          return (
            <div key={index} className="w-full mx-auto md:p-12 p-4">
              <img src={item} className="w-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstructionDownload;
