"use client";

import MobileProfileLayout from "./mobile-profile-layout";
import DesktopProfileLayout from "./desktop-profile-layout";
import useResponsive from "@/app/lib/hooks/useResponsive";
import { redirect, usePathname } from "next/navigation";
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

  if (pathname === `/${user?.role}/profile`) {
    redirect(`/${user?.role}/profile/personal-information`);
  }

  return <DesktopProfileLayout>{children}</DesktopProfileLayout>;
}
