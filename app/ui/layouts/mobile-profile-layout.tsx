import { ADMIN_PROFILE } from "@/app/lib/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="p-6">
      {pathname !== ADMIN_PROFILE.url && (
        <Link
          className="flex items-center mb-4 cursor-pointer"
          href={ADMIN_PROFILE.url}
        >
          <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" />
          <h2 className="text-xl font-semibold">Back</h2>
        </Link>
      )}
      {children}
    </div>
  );
}
