import { useUserStore } from "@/providers/user-store-provider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUserStore((state) => state);
  return (
    <div className="p-6">
      {pathname !== `/${user?.role}/profile` && (
        <Link
          className="flex items-center mb-4 cursor-pointer"
          href={`/${user?.role}/profile`}
        >
          <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" />
          <h2 className="text-xl font-semibold">Back</h2>
        </Link>
      )}
      {children}
    </div>
  );
}
