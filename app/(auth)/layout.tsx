import React from "react";
import HomeNavbar from "../ui/home-navbar";
import Footer from "../ui/home-footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <HomeNavbar />
      <div className="h-full flex items-center max-w-3xl mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
}
