import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import homeApi from "@/apis/home.api";
import { URL } from "@/constants/url";
const ModalLoading = () => {
  const [isLoading, setIsLoading] = useState(
    Cookies.get("isLoading") === "true"
  );
  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: () => homeApi.getSetting(),
  });
  const setting = data?.data.data;

  const checkCookieChange = () => {
    if (isLoading !== (Cookies.get("isLoading") === "true")) {
      // Cookie đã thay đổi, cập nhật giá trị state
      setIsLoading(Cookies.get("isLoading") === "true");
    }
  };

  useEffect(() => {
    // Đăng ký kiểm tra sự thay đổi của cookie
    const intervalId = setInterval(checkCookieChange, 500); // Kiểm tra mỗi giây

    return () => {
      // Hủy đăng ký kiểm tra khi component unmount
      clearInterval(intervalId);
    };
  }, [isLoading]);
  if (!isLoading) return <></>;
  const isMobile = window.innerWidth <= 768;
  if (isMobile) return <></>;
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex flex-col text-center justify-center items-center bg-slate-900 z-50 opacity-80">
      <img
        className="w-48"
        src={`${URL.baseUrl}${setting?.logo_image}`}
        alt=""
      />
      <Loader2 className="h-12 w-12 animate-spin text-main" />
    </div>
  );
};

export default ModalLoading;
