import React from "react";
import SideNav from "../ui/dashboard/sidenav";
import { AdminStoreProvider } from "@/providers/admin-store-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminStoreProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
        <div className="w-full flex-none md:w-1/4 border-2 border-gray-100">
          <SideNav />
        </div>
        <div className="flex-grow  md:overflow-y-auto  md:bg-[#F1F7FE]">
          <div className="">{children}</div>
        </div>
      </div>
    </AdminStoreProvider>
  );
}
