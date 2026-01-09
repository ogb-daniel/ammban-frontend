"use client";
import { useUserStore } from "@/providers/user-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MobileProfile() {
  const router = useRouter();
  const { user } = useUserStore((state) => state);
  const links = [
    {
      title: "Personal Information",
      href: `/${user?.role}/profile/personal-information`,
    },
    // {
    //   title: "Transaction History",
    //   href:
    //     user?.role === "admin"
    //       ? ADMIN_TRANSACTIONS.url
    //       : AGENT_TRANSACTIONS.url,
    // },
    // {
    //   title: "Account Limits",
    //   href:
    //     (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
    //     "/account-limits",
    // },
    // {
    //   title: "Customer Support",
    //   href:
    //     (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
    //     "/customer-support",
    // },
    // {
    //   title: "Update Account Details",
    //   href:
    //     (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
    //     "/update-account-details",
    // },
    {
      title: "Wallet",
      href: `/${user?.role}/profile/wallet`,
    },
    {
      title: "Change Pin",
      href: "/" + user?.role + "/profile/change-pin",
    },
    // {
    //   title: "Change Password",
    //   href:
    //     (user?.role === "admin" ? ADMIN_PROFILE.url : AGENT_PROFILE.url) +
    //     "/change-password",
    // },
  ];

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
        <h2 className="mt-2 text-xl font-semibold">{user?.fullName}</h2>
        <p className="text-sm text-gray-500">{user?.emailAddress}</p>
        <p className="text-green-500 font-medium">
          AXA {user?.role === "admin" ? "Admin" : "Agent"}
        </p>
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
