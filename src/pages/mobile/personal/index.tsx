import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import BackButton from "@/components/back-button";
import AddBankForm from "../withdraw/_components/add-bank-form";
import {
  //  tinhKhoangThoiGian,
  useTinhKhoangThoiGian,
} from "@/utils/utils";
import avatar from "@/assets/images/default-avatar.png";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
const PersonalPage = () => {
  const { t, i18n } = useTranslation(NS.profile);
  const { tinhKhoangThoiGian001 } = useTinhKhoangThoiGian();
  const { profile } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div data-v-12d09028 className="userCenter">
      <div data-v-6eb36ed3 data-v-12d09028 className="personalInfo">
        <div
          style={{ width: "100%" }}
          data-v-2d9c7ad7
          data-v-6eb36ed3
          className="header"
        >
          <div
            data-v-2d9c7ad7
            className="van-nav-bar van-nav-bar--fixed"
            style={{
              zIndex: 1,
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <div className="van-nav-bar__content">
              <div className="van-nav-bar__left">
                <BackButton />
              </div>
              <div className="van-nav-bar__title van-ellipsis">
                {t("mobile.personal_page")}
              </div>
            </div>
          </div>
        </div>
        <div data-v-6eb36ed3 className="personal">
          <div data-v-6eb36ed3 className="userInfo">
            <div data-v-6eb36ed3 className="avatar-container">
              <div data-v-3e1e0e34 data-v-6eb36ed3 className="avatar-container">
                <img
                  data-v-3e1e0e34
                  className="avatar-img"
                  data-src={avatar}
                  src={avatar}
                  // data-src="https://xoso66.me/server/static/default_avatar/29.png?v=20231030"
                  // src="https://xoso66.me/server/static/default_avatar/29.png?v=20231030"
                />
                <i data-v-3e1e0e34 className="iconfont icon-icon_edit_avatar" />
              </div>
            </div>
            <div data-v-6eb36ed3 className="user">
              <p data-v-6eb36ed3 className="userName">
                <span data-v-6eb36ed3 className="hi" />
                {profile?.username}
              </p>
              <p data-v-6eb36ed3 className="joinDay">
                {t("mobile.join_date")}{" "}
                {tinhKhoangThoiGian001(
                  profile?.created_at || new Date(),
                  i18n.language
                )}
              </p>
            </div>
          </div>
        </div>
        <div data-v-0143353b data-v-6eb36ed3 className="scrollList">
          <div data-v-6eb36ed3 data-v-0143353b className="wrapper-tontent">
            <div data-v-6eb36ed3 data-v-0143353b className="personalBody">
              <div
                data-v-ffab85c0
                data-v-6eb36ed3
                className="list bottomBorder"
                data-v-0143353b
              >
                <div
                  data-v-ffab85c0
                  className="listLeft"
                  style={{ flex: "1 1 0%" }}
                >
                  {/**/} {t("mobile.full_name")}{" "}
                </div>
                <div
                  data-v-ffab85c0
                  className="listRight"
                  style={{ flex: "2 1 0%" }}
                >
                  {" "}
                  <span data-v-6eb36ed3 data-v-ffab85c0 className="bound">
                    {profile?.fullname}
                  </span>
                  {/**/}
                </div>
              </div>
              <div
                data-v-ffab85c0
                data-v-6eb36ed3
                className="list bottomBorder"
                data-v-0143353b
              >
                <div
                  data-v-ffab85c0
                  className="listLeft"
                  style={{ flex: "1 1 0%" }}
                >
                  {/**/} {t("mobile.phone_number")}{" "}
                </div>
                <div
                  data-v-ffab85c0
                  className="listRight"
                  style={{ flex: "2 1 0%" }}
                >
                  {" "}
                  <span data-v-6eb36ed3 data-v-ffab85c0 className="unbound">
                    {profile?.phone}
                  </span>
                  <span
                    data-v-ffab85c0
                    className="iconfont icon-icon_more_blue_16"
                  />
                </div>
              </div>
              <div
                data-v-ffab85c0
                data-v-6eb36ed3
                className="list bottomBorder"
                data-v-0143353b
                onClick={() => {
                  if (profile?.bank_name) {
                    navigate("/mobile/bank-detail");
                  } else {
                    setOpen(true);
                  }
                }}
              >
                <div
                  data-v-ffab85c0
                  className="listLeft"
                  style={{ flex: "1 1 0%" }}
                >
                  {/**/} {t("mobile.bank_account")}{" "}
                </div>
                <div
                  data-v-ffab85c0
                  className="listRight"
                  style={{ flex: "2 1 0%" }}
                >
                  {" "}
                  <span data-v-6eb36ed3 data-v-ffab85c0 className="bound">
                    {t("mobile.account_count")} {profile?.bank_name ? 1 : 0}/1
                  </span>
                  <span
                    data-v-ffab85c0
                    className="iconfont icon-icon_more_blue_16"
                  />
                </div>
              </div>
              <Link to={"/mobile/change-password"}>
                <div
                  data-v-ffab85c0
                  data-v-6eb36ed3
                  className="list bottomBorder"
                  data-v-0143353b
                >
                  <div
                    data-v-ffab85c0
                    className="listLeft"
                    style={{ flex: "1 1 0%" }}
                  >
                    {/**/} {t("mobile.change_password")}{" "}
                  </div>
                  <div
                    data-v-ffab85c0
                    className="listRight"
                    style={{ flex: "2 1 0%" }}
                  >
                    {" "}
                    <span data-v-6eb36ed3 data-v-ffab85c0 className="bound">
                      {t("mobile.password_and_withdraw_password")}
                    </span>
                    <span
                      data-v-ffab85c0
                      className="iconfont icon-icon_more_blue_16"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div
            data-v-0143353b
            className="custom-horizontal-scrollbar"
            style={{ display: "none" }}
          >
            <div data-v-0143353b className="custom-horizontal-indicator" />
          </div>
        </div>
        <div data-v-48dd146e data-v-6eb36ed3 className="avatar_list">
          {/**/}
        </div>
      </div>
      <AddBankForm open={open} t={() => {}} />
    </div>
  );
};

export default PersonalPage;
