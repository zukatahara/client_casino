import http from "@/lib/http";

const URL_LIST = "/api/user/avatar/list";
const URL_UPLOAD = "/api/user/avatar/upload";
const URL_UPDATE = "/api/user/avatar/change";

const avatarApi = {
  getListAvatar() {
    return http.get<any>(URL_LIST);
  },

  uploadAvatar(body: FormData) {
    return http.post<any>(URL_UPLOAD, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  changeAvatar(body: { avatar: string }) {
    return http.put<any>(URL_UPDATE, body);
  },
};

export default avatarApi;
