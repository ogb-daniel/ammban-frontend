"use client";

import MobileProfileLayout from "./mobile-profile-layout";
import DesktopProfileLayout from "./desktop-profile-layout";
import useResponsive from "@/app/lib/hooks/useResponsive";
import { redirect, usePathname } from "next/navigation";
import { ADMIN_PROFILE } from "@/app/lib/routes";
import { useEffect, useState } from "react";

export default function ResponsiveProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useResponsive();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (isMobile) {
    return <MobileProfileLayout>{children}</MobileProfileLayout>;
  }

  if (pathname === ADMIN_PROFILE.url) {
    redirect(ADMIN_PROFILE.url + "/personal-information");
  }

  return <DesktopProfileLayout>{children}</DesktopProfileLayout>;
}
