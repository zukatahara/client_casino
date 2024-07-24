import React, { useState, useEffect } from "react";
import NavBar from "@/components/nav-bar";
import NavBarBottom from "@/components/nav-bar-bottom";
import Service from "@/components/service";
import ServiceMobile from "@/components/service-mobile";
import ToasterProvider from "@/components/toaster-proider";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "react-error-boundary";
import "./mobile-layout.css";
import { languages } from "@/i18n";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);
  const currentLanguage = languages.find((l) => l.code === i18n.language);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check the initial window size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log(isMobile);

  return (
    <ErrorBoundary
      fallback={<div>Something went wrong</div>}
      onError={(err) => console.log({ err })}
    >
      <div className="bg-white dark:bg-[#031c32] text-slate-900 antialiased light ">
        <div className="min-h-screen md:pt-12  antialiased">
          <NavBar />
          <div
            className={` h-full md:pt-[5.3rem] pb-14 md:pb-0 ${
              isMobile ? "bg-[#031c32]" : "bg_pc"
            }`}
          >
            {children}
          </div>
          {isMobile && (
            <div className="md:hidden">
              <NavBarBottom />
            </div>
          )}
          {isMobile && location.pathname === "/" && (
            <div className="md:hidden">
              <div className="cursor-pointer block  avatar-hover mr-1 fixed top-[61dvh]  z-[9999] right-0 md:hidden">
                <div className="flex items-center">
                  <div className="dropdown switch-language">
                    <div className="cursor-pointer flex items-center relative z-40">
                      <div className="switch-language__img">
                        <img
                          src={currentLanguage?.icon}
                          className="switch-language__img-active w-9 h-9"
                        />
                      </div>
                      {/**/}
                    </div>
                    {/**/}
                    {/**/}
                  </div>
                  {/* <span className="text-slate-500 ml-2 w-[80px]">
            {currentLanguage?.name}
          </span> */}
                </div>
                <div className="absolute z-50 top-[100%] bg-transparent w-[150px] nav-hover-avatar-wrapper right-0  ">
                  <div className="nav-hover-avatar  !py-2 !px-2">
                    {languages.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            i18n.changeLanguage(item.code);
                          }}
                          key={index}
                          className={cn(
                            "nav-hover-avatar__item flex items-center cursor-pointer  !py-1 !mb-2 last:!mb-0",
                            {
                              "border border-green-500":
                                item.code === currentLanguage?.code,
                            }
                          )}
                        >
                          <img src={item.icon} className="mr-2 w-6 h-6" />
                          <span className="whitespace-nowrap text-white text-[13px]">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {}
        {isMobile ? <ServiceMobile /> : <Service />}
        <Toaster />
        <ToasterProvider />
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;
