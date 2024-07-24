import { useTranslation } from "react-i18next";
interface DateItem {
  label: string;
  value: number;
}
const useDateList = (): DateItem[] => {
  const { t } = useTranslation("common");

  const dateList: DateItem[] = [
    { label: t("days.monday"), value: 1 },
    { label: t("days.tuesday"), value: 2 },
    { label: t("days.wednesday"), value: 3 },
    { label: t("days.thursday"), value: 4 },
    { label: t("days.friday"), value: 5 },
    { label: t("days.saturday"), value: 6 },
    { label: t("days.sunday"), value: 0 },
  ];

  return dateList;
};
export default useDateList;
