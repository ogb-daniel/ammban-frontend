"use client";

import MobileProfileLayout from "./mobile-profile-layout";
import DesktopProfileLayout from "./desktop-profile-layout";
import useResponsive from "@/app/lib/hooks/useResponsive";
import { redirect, usePathname } from "next/navigation";
import { ADMIN_PROFILE, AGENT_PROFILE } from "@/app/lib/routes";
import { useEffect, useState } from "react";
import { useUserStore } from "@/providers/user-store-provider";

export default function ResponsiveProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useResponsive();
  const pathname = usePathname();
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (isMobile) {
    return <MobileProfileLayout>{children}</MobileProfileLayout>;
  }

  if (pathname === ADMIN_PROFILE.url || pathname === AGENT_PROFILE.url) {
    redirect(
      user?.role === "admin"
        ? ADMIN_PROFILE.url + "/personal-information"
        : AGENT_PROFILE.url + "/personal-information"
    );
  }

  return <DesktopProfileLayout>{children}</DesktopProfileLayout>;
}
