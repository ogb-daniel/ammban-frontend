import React from "react";
import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
      <div className="w-full flex-none md:w-80 border-2 border-gray-100">
        <SideNav />
      </div>
      <div className="flex-grow  md:overflow-y-auto  md:bg-primary md:bg-opacity-5">
        <div className="">{children}</div>
      </div>
    </div>
  );
}
