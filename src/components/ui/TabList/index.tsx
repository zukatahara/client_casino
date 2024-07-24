import React, { PropsWithChildren, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

export interface ITabList extends PropsWithChildren {
  className?: string;
  tabList: Option[];
  onChangTab: (value?: any) => void;
  selectTab?: string;
  divider?: boolean;
  navClassName?: string;
}

interface ITabItem extends PropsWithChildren {
  isSelected?: boolean;
}

const TabItem: React.FC<ITabItem> = ({ isSelected, ...props }) => {
  return isSelected && props.children;
};

const TabList: React.FC<ITabList> = ({ navClassName, className, tabList, onChangTab, selectTab, divider, children }) => {
  return (
    <div className={classNames("wrap-tab-content h-full")}>
      <nav className={classNames("flex justify-center items-center", navClassName)}>
        <ul>
          {tabList.map((item) => (
            <li
              key={item.id}
              className={classNames({ selected: item.id === selectTab })}
              onClick={() => {
                onChangTab(item);
              }}
            >
              <span
                className={classNames("absolute z-1 font-bold", {
                  "text-black dark:text-main": item.id === selectTab,
                  "text-gray": item.id !== selectTab,
                })}
              >
                {item.label}
              </span>
              {item.id === selectTab ? <motion.div className={classNames("underline")} layoutId={"underline"} /> : null}
            </li>
          ))}
        </ul>
        {divider && <i className="newThemeEl_i" />}
      </nav>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectTab ? selectTab : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={className}
          style={{ color: "white" }}
        >
          {React.Children.map(children, (child, idx) => {
            return (
              <TabItem isSelected={selectTab === tabList[idx].id} key={tabList[idx].id}>
                {child}
              </TabItem>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(TabList);
