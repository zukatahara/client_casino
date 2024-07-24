// import { Logo } from "./logo"
// import { SidebarRoutes } from "./sidebar-routes"

import homeApi from "@/apis/home.api";
import { useQuery } from "@tanstack/react-query";
import { SidebarRoutes } from "./sidebar-routes";
import { URL } from "@/constants/url";

export const Sidebar = () => {
  const { data: logoData } = useQuery({
    queryKey: ["logo"],
    queryFn: () => homeApi.getLogo(),
  });
  const logo = (logoData?.data.status && logoData.data.data[0]) || null;
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-slate-500 shadow-sm">
      <div className="p-6">
        <img
          src={`${URL.baseUrl}${logo?.logo_image}`}
          className="w-40"
          alt=""
        />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
