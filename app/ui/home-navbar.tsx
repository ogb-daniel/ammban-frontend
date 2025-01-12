"use client";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { FAQS, HOME } from "../lib/routes";
import { GrCircleQuestion } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";

export default function HomeNavbar() {
  const pathname = usePathname();
  return (
    <nav className="px-6 py-6 flex justify-between items-center">
      <Logo />
      <Link href={pathname === FAQS.url ? HOME.url : FAQS.url}>
        {pathname === FAQS.url ? (
          <CgProfile size={20} />
        ) : (
          <GrCircleQuestion size={20} />
        )}
      </Link>
    </nav>
  );
}
