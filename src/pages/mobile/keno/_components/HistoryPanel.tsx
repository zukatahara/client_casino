import React, { useCallback, useMemo, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TabList from "@/components/ui/TabList";
import classNames from "classnames";
import { colorList, findItemInColorListById } from "@/constants/constants";
import { TooltipItem } from "@/components/ui/tooltip-item";
import { IKenoCau } from "..";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

const HistoryPanel: React.FC<{ cau?: IKenoCau }> = ({ cau }) => {
  const { t } = useTranslation(NS.keno);
  const listTabs: { id: keyof IKenoCau; label: string }[] = [
    { id: "taixiu", label: t("tai xiu") },
    { id: "chanle", label: t("le chan") },
    { id: "trenHoaDuoi", label: t("tren hoa duoi") },
    { id: "nguHanh", label: t("ngu hanh") },
  ];
  const [toggleType, setToggleType] = useState<keyof IKenoCau>(listTabs[0].id);
  const renderTitles = useCallback(
    (idx: number) => {
      let findPercent: any = {};
      if (toggleType === "chanle")
        findPercent = {
          chan: cau?.chanle.phanTramChan,
          le: cau?.chanle.phanTramLe,
        };
      if (toggleType === "nguHanh")
        findPercent = {
          hoa: cau?.nguHanh.phanTramHoa,
          kim: cau?.nguHanh.phanTramKim,
          moc: cau?.nguHanh.phanTramMoc,
          tho: cau?.nguHanh.phanTramTho,
          thuy: cau?.nguHanh.phanTramThuy,
        };
      if (toggleType === "taixiu")
        findPercent = {
          tai: cau?.taixiu.phanTramTai,
          xiu: cau?.taixiu.phanTramXiu,
        };
      if (toggleType === "trenHoaDuoi")
        findPercent = {
          tren: cau?.trenHoaDuoi.phanTramDuoi,
          hoa: cau?.trenHoaDuoi.phanTramHoa,
          duoi: cau?.trenHoaDuoi.phanTramTren,
        };

      return colorList[idx].map((item) => {
        return (
          <div className="titles">
            <div className={classNames("label", item.color)}>
              {t(item.label)}
            </div>
            <CircularProgressbar
              className="w-10 h10"
              value={findPercent[item.id === "nh_hoa" ? "hoa" : item.id] ?? 0}
              text={`${Math.floor(
                findPercent[item.id === "nh_hoa" ? "hoa" : item.id] ?? 0
              )}%`}
              styles={buildStyles({
                pathColor: `var(--${item.color})`,
                textColor: `var(--${item.color})`,
                textSize: "30px",
              })}
            />
          </div>
        );
      });
    },
    [cau, toggleType]
  );

  function groupArrayByConsecutiveKetqua(arr: any[]) {
    if (!arr || !Array.isArray(arr)) {
      return [];
    }

    const result = [];
    let currentGroup = [];

    for (const item of arr) {
      if (
        currentGroup.length === 0 ||
        currentGroup[currentGroup.length - 1].ketqua === item.ketqua
      ) {
        currentGroup.push(item);
      } else {
        result.push(currentGroup);
        currentGroup = [item];
      }

      if (currentGroup.length >= 6) {
        result.push(currentGroup);
        currentGroup = [];
      }
    }

    if (currentGroup.length > 0) {
      result.push(currentGroup);
    }

    return result;
  }

  const renderTableList = useMemo(() => {
    const getCau = cau && cau[toggleType as keyof typeof cau];
    if (getCau) {
      const taiXiuGroups = groupArrayByConsecutiveKetqua(getCau.cau);
      return (
        <div className="tableData">
          <div className="tableItem">
            {taiXiuGroups.map((group, idx) => {
              if (idx < 18) {
                return (
                  <div
                    className="tableDataList"
                    key={toggleType + idx.toString()}
                  >
                    {group.map((i, idxx) => {
                      const getLabel = findItemInColorListById(i?.ketqua);
                      return (
                        <div className="list" key={i?.phien}>
                          <TooltipItem
                            tooltipContent={
                              <div>
                                ({getLabel?.label}){i?.phien}
                              </div>
                            }
                          >
                            <span
                              className={classNames(
                                " items item uppercase",
                                getLabel?.color
                              )}
                              tabIndex={idxx}
                            >
                              {i?.ketqua[0]}
                            </span>
                          </TooltipItem>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    }
  }, [cau, toggleType]);

  return (
    <div className="w-full kenoTableTitle h-full mt-4">
      <TabList
        divider
        navClassName="header"
        selectTab={toggleType}
        tabList={listTabs}
        onChangTab={(val) => setToggleType(val?.id)}
      >
        {listTabs.map((key, idx) => {
          switch (key.id) {
            case "taixiu":
              return (
                <div className="mt-4">
                  <div className="w-full flex flex-wrap items-center justify-center">
                    {renderTitles(idx)}
                  </div>
                  {renderTableList}
                </div>
              );

            case "chanle":
              return (
                <div className="mt-4">
                  <div className="w-full flex flex-wrap items-center justify-center">
                    {renderTitles(idx)}
                  </div>
                  {renderTableList}
                </div>
              );
            case "trenHoaDuoi":
              return (
                <div className="mt-4">
                  <div className="w-full flex flex-wrap items-center justify-center">
                    {renderTitles(idx)}
                  </div>
                  {renderTableList}
                </div>
              );
            case "nguHanh":
              return (
                <div className="mt-4">
                  <div className="w-full flex flex-wrap items-center justify-center">
                    {renderTitles(idx)}
                  </div>
                  {renderTableList}
                </div>
              );
            default:
              return null;
          }
        })}
      </TabList>
    </div>
  );
};

export default HistoryPanel;
