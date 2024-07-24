import { useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ReactSelect from "react-select";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    menu_id: number;
    menu_name: string;
    isFilter?: boolean;
    list: {
      id: number;
      name: string;
      code: string;
      series_id: number;
      week_days: number[];
    }[];
  }[];
}

const SidebarGameNav = ({ items }: SidebarNavProps) => {
  const { t } = useTranslation(NS.sideNavGame);

  const dateList = [
    {
      label: t("Thứ 2"),
      value: 1,
    },
    {
      label: t("Thứ 3"),
      value: 2,
    },
    {
      label: t("Thứ 4"),
      value: 3,
    },
    {
      label: t("Thứ 5"),
      value: 4,
    },
    {
      label: t("Thứ 6"),
      value: 5,
    },
    {
      label: t("Thứ 7"),
      value: 6,
    },
    {
      label: t("Chủ nhật"),
      value: 0,
    },
  ];
  const location = useLocation();
  const pathname = location.pathname;
  const d = new Date().getDay();
  const navigate = useNavigate();
  const [dateXsmn, setDateXsmn] = useState(
    dateList.find((e) => e.value === new Date().getDay())
  );
  const [dateXsmt, setDateXsmt] = useState(
    dateList.find((e) => e.value === new Date().getDay())
  );
  return (
    <Accordion
      className="menu el-menu rounded-md shadow-[0_0_2px_2px_rgba(0,0,0,.1)]"
      type="single"
      collapsible
    >
      {items.map((item) => {
        return (
          <AccordionItem value={item.menu_name} key={item.menu_name}>
            <AccordionTrigger className="pr-2 hover:no-underline">
              <li
                data-v-1c1e7685
                role="menuitem"
                aria-haspopup="true"
                className="el-submenu"
              >
                <div className="el-submenu__title" style={{ paddingLeft: 20 }}>
                  <span data-v-1c1e7685> {t(item.menu_name)}</span>
                </div>
              </li>
            </AccordionTrigger>
            <AccordionContent className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              <ul
                role="menubar"
                className="el-menu"
                style={{
                  backgroundColor: "#f3f5f9",
                }}
              >
                {item.isFilter && (
                  <li role="menuitem" tabIndex={-1}>
                    {item?.menu_id === 1 && (
                      <ReactSelect
                        maxMenuHeight={150}
                        menuShouldScrollIntoView={true}
                        className="basic-single w-full dark:text-slate-700"
                        classNamePrefix="select"
                        name="color"
                        value={dateXsmn}
                        options={dateList}
                        onChange={(value) => {
                          if (setDateXsmn) {
                            setDateXsmn({
                              value: value?.value || 0,
                              label: value?.label || "",
                            });
                          }
                        }}
                      />
                    )}
                    {item?.menu_id === 3 && (
                      <ReactSelect
                        maxMenuHeight={100}
                        menuShouldScrollIntoView={true}
                        className="basic-single w-full dark:text-slate-700"
                        classNamePrefix="select"
                        name="color"
                        value={dateXsmt}
                        options={dateList}
                        onChange={(value) => {
                          if (setDateXsmt) {
                            setDateXsmt({
                              value: value?.value || 0,
                              label: value?.label || "",
                            });
                          }
                        }}
                      />
                    )}
                  </li>
                )}
                {item.list.map((item2) => {
                  if (
                    item.menu_id !== 1 &&
                    item.menu_id !== 3 &&
                    item2.week_days.includes(d)
                  ) {
                    return (
                      <li
                        role="menuitem"
                        tabIndex={-1}
                        onClick={() => navigate(item2.code)}
                        className={cn(
                          "el-menu-item menuItem",
                          pathname === item2.code ? "active" : ""
                        )}
                        style={{ paddingLeft: 20 }}
                      >
                        {pathname === item2.code && (
                          <span className="themeActiveBar" />
                        )}
                        <span>{t(item2.name)}</span>
                      </li>
                    );
                  }
                })}
                {item.list.map((item2) => {
                  if (
                    item.menu_id === 1 &&
                    item2.week_days.includes(dateXsmn?.value as number)
                  ) {
                    return (
                      <li
                        role="menuitem"
                        tabIndex={-1}
                        className={cn(
                          "el-menu-item menuItem",
                          pathname === item2.code ? "active" : ""
                        )}
                        style={{ paddingLeft: 20 }}
                        onClick={() => navigate(item2.code)}
                      >
                        {pathname === item2.code && (
                          <span className="themeActiveBar" />
                        )}
                        <span>{t(item2.name)}</span>
                      </li>
                    );
                  }
                })}
                {item.list.map((item2) => {
                  if (
                    item.menu_id === 3 &&
                    item2.week_days.includes(dateXsmt?.value as number)
                  ) {
                    return (
                      <li
                        onClick={() => navigate(item2.code)}
                        role="menuitem"
                        tabIndex={-1}
                        className={cn(
                          "el-menu-item menuItem",
                          pathname === item2.code ? "active" : ""
                        )}
                        style={{ paddingLeft: 20 }}
                      >
                        {pathname === item2.code && (
                          <span className="themeActiveBar" />
                        )}
                        <span>{t(item2.name)}</span>
                      </li>
                    );
                  }
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default SidebarGameNav;
