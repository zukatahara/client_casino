import homeApi from "@/apis/home.api";
import bg from "@/assets/images/app_info-aff83ead.png";
import { NS } from "@/constants/ns";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const AppInfo = () => {
  const { t } = useTranslation([NS["HOME"]]);
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const setting = data?.data.data;
  return (
    <div
      className="app-download-wp hidden md:block"
      id="appDownload"
      style={{
        background: `url(${bg}) center center no-repeat`,
      }}
    >
      <div className="app-download">
        <div className="slogan-wp uppercase">
          <div> {t("appInfo.chao_mung_den_voi_trang_web_ca")} </div>
        </div>
        <div className="short-line" />
        <div className="spec text-left">
          <div>
            {setting?.name_page} {t("appInfo.tu_hao_la_don_vi_cung_cap_trang")}
          </div>
        </div>
        {/* <div className="QR-code-wp">
          <div className="QR-code">
            <img
              src="/common/qr_app.jpeg"
              alt=""
            />
            <div className="txt"> TẢI XUỐNG IOS </div>
          </div>
          <div className="QR-code">
            <img
              src="/common/qr_app.jpeg"
              alt=""
            />
            <div className="txt">TẢI XUỐNG ANDROID</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AppInfo;
