import React from "react";
import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
      <div className="w-full flex-none md:w-64 border-2 border-gray-100">
        <SideNav />
      </div>
      <div className="flex-grow  md:overflow-y-auto  bg-primary bg-opacity-5">
        <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
          <h1 className="font-semibold ">Welcome Jacob</h1>
          <p className="text-blue-500">(AXA Agent)</p>
        </div>
        <div className="p-6 md:p-12">{children}</div>
      </div>
    </div>
  );
}
