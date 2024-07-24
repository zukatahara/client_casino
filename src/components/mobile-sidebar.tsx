import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
// import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden relative ml-a pr-4 hover:opacity-75 transition">
        <Menu className="text-main" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white dark:bg-slate-500">
        <Sidebar />
        <div className="p-4">Mobile Sidebar</div>
      </SheetContent>
    </Sheet>
  );
};
