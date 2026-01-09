"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { logout } from "@/app/lib/actions/auth";
import { HOME } from "@/app/lib/routes";
import { MdLogout } from "react-icons/md";
import clsx from "clsx";

interface LogoutButtonProps {
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
}

export default function LogoutButton({
  className,
  showIcon = true,
  showText = true,
}: LogoutButtonProps) {
  const { clearUser } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        clearUser();
        if (typeof window !== "undefined") {
          window.location.href = HOME.url;
        }
      } else {
        console.error("Logout failed:", result.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={clsx(
        "flex items-center gap-2 text-red-500 hover:text-red-600",
        className
      )}
    >
      {showIcon && <MdLogout className="w-6" />}
      {showText && <span>Logout</span>}
    </button>
  );
}
