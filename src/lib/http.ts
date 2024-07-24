import axios, { AxiosError, type AxiosInstance } from "axios";
import HttpStatusCode from "@/constants/httpStatusCode.enum";
import { AuthResponse } from "@/types/auth.type";
import {
  clearLS,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  //   setProfileToLS,
} from "@/utils/auth";
import { URL } from "@/constants/url";
import {
  URL_LOGIN,
  URL_PROFILE,
  URL_REGISTER,
  // URL_REGISTER,
} from "@/apis/auth.api";
import toast from "react-hot-toast";
import { SuccessResponse } from "@/types/utils.type";
import Cookies from "js-cookie";
import i18n from "@/i18n";
class Http {
  instance: AxiosInstance;
  accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: URL.baseUrl,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.instance.interceptors.request.use(
      config => {
        Cookies.set("isLoading", "true", { expires: 1 });

        if (this.accessToken && config.headers) {
          config.headers["x-access-token"] = this.accessToken;
          return config;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      response => {
        const data = response.data as SuccessResponse;
        const data2 = response.data as {
          message: string;
        };
        if (data2.message === "Invalid token") {
          clearLS();
          this.accessToken = "";
          window.location.reload();
        }
        if (data.status === false && data.msg) {
          if (data.errCode) {
            const translatedErrorCode = i18n.t(`msgApi:${data.errCode}`);
            toast.error(translatedErrorCode + " " + (data?.msg2 || ""));
          } else {
            toast.error(data.msg);
          }
        }
        const { url } = response.config;
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse;
          if (data.status === true) {
            this.accessToken = data.data;
            setAccessTokenToLS(this.accessToken);
          }

          //   setProfileToLS(data.data.user);
        }
        if (url === URL_PROFILE && response.data) {
          setProfileToLS(response.data);
        }
        Cookies.set("isLoading", "false", { expires: 1 });

        return response;
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
          ].includes(error.response?.status as number)
        ) {
          Cookies.set("isLoading", "false", { expires: 1 });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          //   const data: any | undefined = error.response?.data;
          //   const message = data?.message || error.message;
        }

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401
        // if (
        //   isAxiosUnauthorizedError<
        //     ErrorResponse<{ name: string; message: string }>
        //   >(error)
        // ) {
        //   const config = error.response?.config || {};
        //   const { url } = config;
        //   // Trường hợp Token hết hạn và request đó không phải là của request refresh token
        //   // thì chúng ta mới tiến hành gọi refresh token
        //   console.log(config);
        //   if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
        //     // Hạn chế gọi 2 lần handleRefreshToken
        //     this.refreshTokenRequest = this.refreshTokenRequest
        //       ? this.refreshTokenRequest
        //       : this.handleRefreshToken().finally(() => {
        //           // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
        //           setTimeout(() => {
        //             this.refreshTokenRequest = null;
        //           }, 10000);
        //         });
        //     return this.refreshTokenRequest.then((access_token) => {
        //       // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
        //       return this.instance({
        //         ...config,
        //         headers: { ...config.headers, authorization: access_token },
        //       });
        //     });
        //   }

        // Còn những trường hợp như token không đúng
        // không truyền token,
        // token hết hạn nhưng gọi refresh token bị fail
        // thì tiến hành xóa local storage và toast message

        //   clearLS();
        //   this.accessToken = "";
        // window.location.reload()
        // }
        return Promise.reject(error);
      },
    );
  }
}
const http = new Http().instance;
export default http;
