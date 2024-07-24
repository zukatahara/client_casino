import agencyApi from "@/apis/agency.api";
import { NS } from "@/constants/ns";
import { URL } from "@/constants/url";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const SectionAgency = () => {
  const { t } = useTranslation([NS["ALL"]]);

  const { data } = useQuery({
    queryKey: ["agency"],
    queryFn: () => agencyApi.getAgency(),
  });
  // @ts-ignore
  const image = data?.data?.data?.image || "";
  return (
    <div className="px-3 mt-3">
      <img
        src={`${URL.baseUrl}${image}`}
        alt={t("chuong_trinh_dai_ly", { ns: "all" })}
        className="rounded-t-[15px]"
      />
    </div>
  );
};

export default SectionAgency;
