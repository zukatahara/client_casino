import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import VI from "@/locales/vi";
import TH from "@/locales/th";
import LanguageDetector from "i18next-browser-languagedetector";
import { NS } from "@/constants/ns";

export const languages = [
  {
    name: "แบบไทย",
    code: "th-TH",
    icon: "/language/th.png",
  },
  {
    name: "Tiếng việt",
    code: "vi-VN",
    icon: "/language/vi.caa12196.svg",
  },
];

const resources = {
  "th-TH": TH,
  "vi-VN": VI,
};

const userLanguage = i18n.language || navigator.language;
let languageDefault = "th-TH";
if (userLanguage.startsWith("vi") || userLanguage.startsWith("km")) {
  languageDefault = "vi-VN";
}
const instance = i18n.createInstance();
instance
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    ns: Object.values(NS),
    defaultNS: NS.COMMON,
    fallbackLng: languageDefault, // Ngôn ngữ mặc định là Tiếng Thái
    detection: {
      // Cấu hình các tùy chọn cho LanguageDetector
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default instance;
