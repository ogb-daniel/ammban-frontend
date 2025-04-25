"use client";
import { ADMIN_PROFILE, ADMIN_TRANSACTIONS } from "@/app/lib/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";

const links = [
  {
    title: "Personal Information",
    href: ADMIN_PROFILE.url + "/personal-information",
  },
  { title: "Transaction History", href: ADMIN_TRANSACTIONS.url },
  { title: "Account Limits", href: ADMIN_PROFILE.url + "/account-limits" },
  { title: "Customer Support", href: ADMIN_PROFILE.url + "/customer-support" },
  {
    title: "Update Account Details",
    href: ADMIN_PROFILE.url + "/update-account-details",
  },
  { title: "Change Password", href: ADMIN_PROFILE.url + "/change-password" },
];

export default function MobileProfile() {
  const router = useRouter();
  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
        <Image
          src="/placeholder-avatar.png"
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h2 className="mt-2 text-xl font-semibold">Sophia Rose</h2>
        <p className="text-sm text-gray-500">sophiarose221@gmail.com</p>
        <p className="text-sm text-gray-500">
          Date of Birth: December, 07, 2020
        </p>
        <p className="text-green-500 font-medium">AXA Admin</p>
      </div>

      <div className="space-y-4">
        {links.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer"
            onClick={() => {
              router.push(item.href);
            }}
          >
            <span>{item.title}</span>
            <span>{"\u276F"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
