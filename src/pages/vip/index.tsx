import { useQuery } from "@tanstack/react-query";

import { TableVip } from "./_components/table";
import homeApi from "@/apis/home.api";

const VipPage = () => {
  const { data: dataVips } = useQuery({
    queryKey: ["list-vip"],
    queryFn: () => homeApi.getListVip(),
  });
  const vips = dataVips?.data?.data || [];
  return (
    <div className="mt-2">
      {/* <div className="container flex justify-center">
        <img src="/vip/banner.jpg" width={1200} height={412} />
      </div> */}
      {/* <Slider /> */}
      <TableVip vips={vips} />
    </div>
  );
};
export default VipPage;
