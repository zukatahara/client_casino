import { useState } from "react";
import "./style.css";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const HelpPage = () => {
  const { t } = useTranslation([NS["ALL"]]);
  const HelpMenu = [
    {
      title: t("dang_ky", { ns: "all" }),
      value: 0,
    },
    {
      title: t("van_de_thuong_gap", { ns: "all" }),
      value: 1,
    },
    {
      title: t("ve_chung_toi", { ns: "all" }),
      value: 2,
    },
    {
      title: t("lien_he_chung_toi", { ns: "all" }),
      value: 3,
    },
    {
      title: t("dieu_khoan", { ns: "all" }),
      value: 4,
    },
  ];
  const [menuSelected, setMenuSelected] = useState(HelpMenu[0].value);
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const setting = data?.data.data;
  return (
    <div data-v-146a2d11 data-v-4a2a784e className="help routerView">
      <div data-v-146a2d11 className="container mt-12 pb-12">
        <ul data-v-146a2d11 role="menubar" className="ELmenu el-menu">
          {/**/}
          <li
            data-v-146a2d11
            role="menuitem"
            aria-haspopup="true"
            aria-expanded="true"
            className="el-submenu is-active is-opened"
          >
            <div className="el-submenu__title" style={{ paddingLeft: 20 }}>
              {/**/}
              <span data-v-146a2d11>
                {" "}
                {t("huong_dan_nguoi_moi", { ns: "all" })}
              </span>
              <i className="el-submenu__icon-arrow el-icon-arrow-down" />
            </div>
            <ul role="menu" className="el-menu el-menu--inline">
              {HelpMenu.map((item, index) => {
                const isActive = menuSelected === item.value;
                if (index === 0) {
                  return (
                    <li
                      data-v-146a2d11
                      role="menuitem"
                      className={cn("el-menu-item", {
                        "is-active": isActive,
                      })}
                      style={{ paddingLeft: 40 }}
                      key={index}
                      onClick={() => {
                        setMenuSelected(item.value);
                      }}
                    >
                      <div data-v-146a2d11> {t("dang_ky", { ns: "all" })}</div>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
          {HelpMenu.map((item, index) => {
            if (index !== 0) {
              return (
                <li
                  data-v-146a2d11
                  role="menuitem"
                  tabIndex={-1}
                  className={cn("el-menu-item", {
                    "is-active": menuSelected === item.value,
                  })}
                  style={{ paddingLeft: 20 }}
                  key={index}
                  onClick={() => {
                    setMenuSelected(item.value);
                  }}
                >
                  <div data-v-146a2d11>{item.title}</div>
                </li>
              );
            }
          })}

          {/**/}
        </ul>
        {menuSelected === 0 && (
          <div data-v-146a2d11 className="right">
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong> {t("lam_sao_de_dang_ky_tai", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("vui_long_chon_muc_dang_ky_o", { ns: "all" })}
              &nbsp;
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("ten_tai_khoan_gom_6_15_to_hop", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("truoc_khi_dang_ky_hay_chac_chan_ban", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {" "}
                {t("quen_tai_khoan_phai_giai_quyet_nhu", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("ban_lien_he_ngay_trung_tam_cskh", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {" "}
                {t("quen_mat_khau_phai_giai_quyet_nhu", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("vui_long_bam_vao_quen_mat_khau_tren", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {" "}
                {t("lam_the_nao_de_thay_doi_thong", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("sau_khi_dang_nhap_vui_long_bam_vao", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {" "}
                {t("toi_co_duoc_phep_cuoc_tai_nha", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("truoc_khi_dang_nhap_va_trai_nghiem_xin", { ns: "all" })}
            </p>
            <p>
              <br />
            </p>
          </div>
        )}
        {menuSelected === 1 && (
          <div data-v-146a2d11 className="right">
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("choi_tai_nha_cai_co_an_toan_khong", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("he_thong_cua_cong_ty_an_toan_tuyet_doi", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {" "}
                {t("co_bac_truc_tuyen_co_hop_phap_khong", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("luat_phap_o_mot_so_quoc_gia_hoac_khu_vuc", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {" "}
                {t("nha_cai_co_gioi_han_do_tuoi_dat_cuoc", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("do_tuoi_hop_phap_duoc_phep_dat_cuoc_phai", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>{t("toi_co_nen_dien_ho_ten_that", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("vi_ly_do_bao_mat_phong_tai_vu_se_xem", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {" "}
                {t("neu_quen_mat_khau_thi_phai_lam", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("quy_khach_co_the_bam_vao_chuc_nang", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>{t("lam_the_nao_de_nap_tien_vao", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("cong_ty_hien_cung_cap_nhieu_phuong_thuc", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("tai_sao_tien_nap_khong_duoc_them", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("do_he_thong_thanh_toan_truc_tuyen_can_trai", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("neu_toi_cuoc_thang_tien_thi_lam", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("xin_kinh_chao_quy_khach_vui_long_nhap", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>{t("lam_sao_de_biet_ket_qua_tro", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("quy_khach_co_the_kiem_chung_ket_qua_xo", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("toi_co_the_choi_thu_truoc_khong", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("chung_toi_rat_hoan_nghenh_quy_khach", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>{t("toi_co_the_tim_quy_tac_tro", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("sau_khi_dang_nhap_quy_khach_co_the", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("co_yeu_cau_gi_ve_cau_hinh_khi", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("xin_chao_quy_khach_trang_web_chung_toi", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("tai_sao_he_thong_dang_xuat_tai", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("day_la_mot_trong_nhung_chuong_trinh", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>{t("tai_sao_lai_phai_xoa_bo_nho", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("neu_quy_khach_khong_the_mo_trang", { ns: "all" })}
            </p>
            <p>
              <br />
            </p>
          </div>
        )}
        {menuSelected === 2 && (
          <div data-v-146a2d11 className="right">
            <p>
              <br />
            </p>
            <p>
              {t("gioi_thieu_ve_mg88", { ns: "all", name: setting?.name_page })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("mg88_duoc_thanh_lap_vao_nam_2012", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("mg88_da_tien_hanh_hop_tac_ky_thuat", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("nguyen_tac_rut_tien_khong_gioi_han", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("mg88_da_tuan_thu_nguyen_tac_cua", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("tro_choi_xo_so", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("mg88_la_mot_trong_nhung_nha_cai", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("video_truc_tiep", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("mg88_co_nen_tang_video_truc_tiep_hang", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("tro_choi_dien_tu", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("co_nhieu_khu_tro_choi_dac_biet", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("ca_cuoc_the_thao", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("mg88_cung_cap_ty_le_cuoc_va", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("an_toan_va_bao_mat", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("chung_toi_su_dung_cong_nghe_ma", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("dich_vu_khach_hang", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <br />
            </p>
            <p>
              {t("trong_thi_truong_game_canh_tranh_khoc_liet", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
          </div>
        )}
        {menuSelected === 3 && (
          <div data-v-146a2d11 className="right">
            <p>
              <span
                style={{ color: "rgb(0, 176, 240)", fontSize: 18 }}
                className="uppercase"
              >
                <strong>{t("lien_he_chung_toi", { ns: "all" })}</strong>
              </span>
            </p>
            <p>
              <span style={{ color: "rgb(0, 176, 240)" }}>
                <strong>
                  <br />
                </strong>
              </span>
            </p>
            <p>
              {t("ve_bat_ky_hoat_dong_mg88_nao", {
                ns: "all",
                name: setting?.name_page,
              })}
            </p>
            <p>
              <br />
            </p>
            <p>
              <span style={{ fontSize: 18, color: "rgb(255, 0, 0)" }}>
                {t("lien_he_email", { ns: "all", name: setting?.name_page })}
              </span>
              <span style={{ color: "rgb(255, 0, 0)" }}>
                <span style={{ fontSize: 18 }}>&nbsp;</span>
                <span style={{ color: "rgb(255, 0, 0)", fontSize: 20 }}>
                  {setting?.email}
                </span>
              </span>
            </p>
            <p>
              <span
                style={{
                  WebkitTapHighlightColor: "transparent",
                  color: "rgba(0, 0, 0, 0.87)",
                  fontFamily:
                    "Roboto, RobotoDraft, Helvetica, Arial, sans-serif",
                  fontSize: "medium",
                  textAlign: "center",
                  backgroundColor: "#000",
                }}
              />
            </p>
            <p>
              <br />
              <span style={{ fontSize: 18 }} />
            </p>
            <p>
              <span style={{ color: "rgb(255, 0, 0)", fontSize: 18 }}>
                {t("lien_he_telegram", { ns: "all", name: setting?.name_page })}
                {": "}
                <span style={{ color: "rgb(255, 0, 0)", fontSize: 18 }}>
                  <span style={{ fontSize: 18, color: "rgb(255, 0, 0)" }}>
                    {setting?.link_telegram}
                    <span style={{ color: "rgb(255, 0, 0)", fontSize: 16 }} />
                    <br />
                  </span>
                  {t("link_tai_telegram", {
                    ns: "all",
                    name: setting?.name_page,
                  })}{" "}
                  https://telegram.org
                </span>
              </span>
            </p>
          </div>
        )}
        {menuSelected === 4 && (
          <div data-v-146a2d11 className="right">
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("tuan_thu_cac_quy_dinh_hoi_vien_va", {
                  ns: "all",
                })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("sau_khi_quy_khach_dang_ky_tai_khoan", {
                ns: "all",
              })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>{t("2_ve_chung_toi", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("cong_ty_chung_toi_dua_tren_nen_tang", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("nghia_vu_dang_ky_thong_tin_xac_thuc", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("doi_voi_cac_hang_muc_dich_vu_ma", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("thay_doi_va_ngung_cung_cap_dich_vu", { ns: "all" })}
              </strong>
            </p>
            <ol className=" list-paddingleft-2">
              <li>
                <p
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    lineHeight: "1.5em",
                  }}
                >
                  {t("1_du_lieu_dang_nhap_cua_hoi_vien", { ns: "all" })}
                </p>
              </li>
            </ol>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("2_su_dung_thong_tin_cua_nguoi", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("3_vi_pham_quy_dinh_ve_tinh_cong", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("4_tham_gia_cac_loai_tro_choi_hoac", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("5_cong_ty_chung_toi_khong_cho_phep", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("6_hoi_vien_dang_ky_nhieu_tai_khoan", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {t("tam_ngung_hoac_gian_doan_dich_vu", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("neu_phat_sinh_mot_trong_cac_tinh", { ns: "all" })}
            </p>
            <ol className=" list-paddingleft-2">
              <li>
                <p
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                    lineHeight: "1.5em",
                  }}
                >
                  {t("1_trong_truong_hop_dang_tien_hanh", { ns: "all" })}
                </p>
              </li>
            </ol>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("2_bi_mat_mang_internet_nhung_khong", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("3_do_cac_yeu_to_dac_biet_bat_kha", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("2_neu_cong_ty_chung_toi_tien_hanh", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong> {t("nghia_vu_bao_mat", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("quy_hoi_vien_phai_tu_bao_mat", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>{t("dong_y_voi_cac_quy_tac_cua", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("nham_tranh_tinh_trang_tranh_cai", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong>
                {" "}
                {t("sua_doi_bo_sung_cac_quy_pham", { ns: "all" })}
              </strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("neu_dieu_khoan_dich_vu_co_sua", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong> {t("quyen_rieng_tu", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("chung_toi_cam_ket_bao_ve_su", { ns: "all" })}
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              <strong> {t("tu_choi", { ns: "all" })}</strong>
            </p>
            <p style={{ marginTop: 10, marginBottom: 5, lineHeight: "1.5em" }}>
              {t("mot_so_khu_vuc_quoc_gia_co", { ns: "all" })}
            </p>
            <p>
              <br />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;
