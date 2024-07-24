import { Toaster } from "@/components/ui/toaster";
import "./mobile-layout.css";
import ToasterProvider from "@/components/toaster-proider";
const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mobile">
      {children}
      <Toaster />
      <ToasterProvider />
    </div>
  );
};

export default MobileLayout;
