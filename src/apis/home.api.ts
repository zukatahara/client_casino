import http from "@/lib/http";
import { Banner } from "@/types/banner.type";
import { Discount } from "@/types/discount";
import { Logo, NoticeHome, Vip } from "@/types/home.type";

const BANNER_URL = "/api/user/getBannerPC";
const LOGO_URL = "/api/user/getLogo";
const URL_GET_BANNER = "/api/user/getBanner";
const URL_GET_VIP = "/api/user/vip/list";
const URL_GET_NOTICE = "/api/user/notification/home";

const homeApi = {
  getBanners(params: any) {
    return http.get<{
      status: boolean;
      data: Banner[];
    }>(BANNER_URL, { params });
  },
  getNoticeMobile() {
    return http.get<{
      status: boolean;
      data: NoticeHome;
    }>(URL_GET_NOTICE);
  },
  getBannersMobile(params: any) {
    return http.get<{
      status: boolean;
      data: Banner[];
    }>(URL_GET_BANNER, { params });
  },
  getListVip() {
    return http.get<{
      status: boolean;
      data: Vip[];
    }>(URL_GET_VIP);
  },
  getLogo() {
    return http.get<{
      status: boolean;
      data: Logo[];
    }>(LOGO_URL);
  },
  getPromotion(params: any) {
    return http.get<{
      data: Discount[];
    }>("/api/user/getPromotion", { params });
  },
  getSetting() {
    return http.get<{
      data: {
        id: number;
        logo_image: string;
        logo_mobile: string;
        logo_form_mobile: string;
        favicon: string;
        file_adnroid: any;
        file_ios: any;
        popup_home_page: string;
        name_page: string;
        title: string;
        description_page: string;
        copyright: string;
        link_telegram: string;
        link_youtube: string;
        link_facebook: string;
        id_livechat: string;
        link_zalo: string;
        link_ins: string;
        phone_number: string;
        email: string;
        notification: string;
        link_video_1: string;
        link_video_2: string;
        link_video_3: string;
        link_video_4: string;
        rules: string;
        policy: string;
        script_page: string;
        min_deposit: number;
        max_deposit: number;
        min_withdraw: number;
        max_withdraw: number;
        fee: number;
        hot_matches: string;
        time_hot_matches: string;
        data_hot_matches: string;
        text_footer: string;
        link_cskh: string;
      };
    }>("/api/user/setting");
  },
};

export default homeApi;
