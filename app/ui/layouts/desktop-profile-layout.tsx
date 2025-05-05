import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ADMIN_PROFILE,
  ADMIN_TRANSACTIONS,
  AGENT_PROFILE,
  AGENT_TRANSACTIONS,
} from "@/app/lib/routes";
import { useUserStore } from "@/providers/user-store-provider";

export default function DesktopProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUserStore((state) => state);
  const links = [
    {
      title: "Personal Information",
      href:
        (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
        "/personal-information",
    },
    {
      title: "Transaction History",
      href:
        user?.role === "admin"
          ? ADMIN_TRANSACTIONS.url
          : AGENT_TRANSACTIONS.url,
    },
    {
      title: "Account Limits",
      href:
        (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
        "/account-limits",
    },
    {
      title: "Customer Support",
      href:
        (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
        "/customer-support",
    },
    {
      title: "Update Account Details",
      href:
        (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
        "/update-account-details",
    },
    {
      title: "Change Password",
      href:
        (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
        "/change-password",
    },
  ];

  return (
    <div>
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome {user?.fullName}</h1>
        <p className="text-blue-500">
          AXA {user?.role === "admin" ? "Admin" : "Agent"}
        </p>
      </div>
      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <aside className="max-w-64 w-full p-4">
          <ScrollArea className="h-full pr-2">
            <nav className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary text-black bg-[#EBF3FF]"
                      : "text-muted-foreground hover:bg-[#EBF3FF]"
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
