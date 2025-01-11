import React from "react";
import Logo from "./logo";
import Image from "next/image";

export default function HomeNavbar() {
  return (
    <nav className="px-5 py-2 flex justify-between items-center">
      <Logo />
      <Image src="/faqs.png" width={18} height={18} alt="Faqs" />
    </nav>
  );
}
