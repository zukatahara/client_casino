import homeApi from "@/apis/home.api";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { NS } from "@/constants/ns";
import { URL } from "@/constants/url";
import { AppContext } from "@/contexts/app.context";
import { formatCurrency } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { AlignJustify } from "lucide-react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const SideNavGame = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const { profile } = useContext(AppContext);
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const setting = data?.data.data;
  return (
    <Drawer>
      <DrawerTrigger>
        <AlignJustify className="iconfont rightIcon icon-icon_sidebar" />
      </DrawerTrigger>
      <DrawerContent className="w-52">
        <div className="rightMenu overflow-y-scroll">
          <div className="userInfoBox">
            <div>
              <div className="avatar-container">
                <img
                  className="avatar-img"
                  src={`${URL.baseUrl}${profile?.avatar}`}
                />
                <i className="iconfont icon-icon_edit_avatar" />
              </div>
            </div>
            <div className="money">
              {/* {formatCurrency(profile?.money as number)} <span>VND</span> */}
              {formatCurrency(profile?.money as number)} <span></span>
            </div>
            <div className="username">{profile?.username}</div>
            <div className="btnBox">
              <Link to="/mobile/withdraw">
                <button> {t("rut_tien", { ns: "all" })} </button>
              </Link>
              <Link to={"/mobile/recharge"}>
                <button> {t("nap_tien", { ns: "all" })} </button>
              </Link>
            </div>
          </div>
          <div className="menuListBox">
            <ul>
              <Link to={"/mobile/betting-record"}>
                <li className="listItem">
                  <div className="titles">
                    <i className="iconfont menuIcon icon-icon_stake" />
                    <div className="titles"> {t("lich_su", { ns: "all" })}</div>
                  </div>
                  <i className="iconfont icon-icon_more_blue_16" />
                </li>
              </Link>
              <Link to={"/mobile/result-history"}>
                <li className="listItem">
                  <div className="titles">
                    <i className="iconfont menuIcon icon-icon_draw_notice" />
                    <div className="titles">
                      {" "}
                      {t("chi_tiet", { ns: "all" })}
                    </div>
                  </div>
                  <i className="iconfont icon-icon_more_blue_16" />
                </li>
              </Link>
              <Link to={"/mobile/message"}>
                <li className="listItem">
                  <div className="titles">
                    <i className="iconfont menuIcon icon-icon_message_centre" />
                    <div className="titles"> {t("hom_thu", { ns: "all" })}</div>
                  </div>
                  <i className="iconfont icon-icon_more_blue_16" />
                </li>
              </Link>
              <Link to={`${setting?.link_cskh}`} target="_blank">
                <li className="listItem">
                  <div className="titles">
                    <i className="iconfont menuIcon icon-icon_customer_service" />
                    <div className="titles">
                      {t("cham_soc_khach_hang", { ns: "all" })}
                    </div>
                  </div>
                  <i className="iconfont icon-icon_more_blue_16" />
                </li>
              </Link>
              <Link to={"/"}>
                <li className="listItem router-link-active">
                  <div className="titles">
                    <i className="iconfont menuIcon icon-icon_nav_game_nor" />
                    <div className="titles">
                      {t("tro_ve_trang_chu", { ns: "all" })}
                    </div>
                  </div>
                  <i className="iconfont icon-icon_more_blue_16" />
                </li>
              </Link>
              <Link to={"/mobile/betting-record"}>
                <li className="listItem">
                  <div className="titles">
                    <i className="iconfont menuIcon icon-icon_stake" />
                    <div className="titles">
                      {" "}
                      {t("ket_qua_thang_thua", { ns: "all" })}
                    </div>
                  </div>
                  <i className="iconfont icon-icon_more_blue_16" />
                </li>
              </Link>
              {/* <li className="listItem">
                <div className="titles">
                  <i className="iconfont menuIcon icon-icon_close_46" />
                  <div className="titles">Thoát an toàn</div>
                </div>
                <i className="iconfont icon-icon_more_blue_16" />
              </li> */}
            </ul>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SideNavGame;
