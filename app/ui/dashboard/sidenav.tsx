"use client";
import { AiFillProduct, AiOutlineUser } from "react-icons/ai";
import Logo from "../logo";
import NavIcon from "../nav-icon";
import { IoIosMenu } from "react-icons/io";
import { RiHomeFill, RiWallet3Fill } from "react-icons/ri";
import clsx from "clsx";
import { FaUserLock, FaUsers } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import LogoutButton from "../auth/logout-button";
import { useUserStore } from "@/providers/user-store-provider";

export default function SideNav() {
  const pathname = usePathname();
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const { user } = useUserStore((state) => state);
  console.log(user);
  const links = user && [
    {
      name: "Dashboard",
      href: `/${user.role}/dashboard`,
      icon: RiHomeFill,
    },
    {
      name: "Profile",
      href: `/${user.role}/profile`,
      icon: FaUser,
    },
    {
      name: "Users",
      href: `/${user.role}/users`,
      icon: FaUsers,
      roles: ["admin", "agency", "aggregator", "trade-partners"],
    },
    {
      name: "Roles and Permissions",
      href: `/${user.role}/roles`,
      icon: FaUserLock,
      roles: ["admin"],
    },
    {
      name: "Products",
      href: `/${user.role}/products`,
      icon: AiFillProduct,
      roles: ["admin", "agent"],
    },
    {
      name: "Commission",
      href: `/${user.role}/commissions`,
      icon: RiWallet3Fill,
    },
  ];
  // : [
  //     { name: "Dashboard", href: AGENT_DASHBOARD.url, icon: RiHomeFill },
  //     {
  //       name: "Profile",
  //       href: AGENT_PROFILE.url,
  //       icon: FaUser,
  //     },
  //     {
  //       name: "Products",
  //       href: AGENT_PRODUCTS.url,
  //       icon: AiFillProduct,
  //     },
  //     {
  //       name: "Commissions",
  //       href: `/${user?.role}/commissions`,
  //       icon: RiWallet3Fill,
  //     },
  //   ];

  const handleDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  return (
    <div className="  h-full px-3 md:py-4 md:px-2">
      <div className="flex items-center justify-between">
        <div className=" text-white p-4 w-full md:px-11">
          <Logo />
        </div>
        <div className="md:hidden flex gap-2">
          <NavIcon icon={<AiOutlineUser />} label="Profile" />
          <NavIcon
            icon={<IoIosMenu />}
            label="Menu"
            onClick={handleDropdownMenu}
          />
        </div>
      </div>

      <div
        className={clsx("px-3 pb-3 text-gray-400 font-medium md:hidden", {
          "h-auto": showDropdownMenu,
          "h-0 overflow-hidden": !showDropdownMenu,
        })}
      >
        {links?.map((link) => {
          const LinkIcon = link.icon;
          return (
            ((link.roles && user && link.roles.includes(user.role)) ||
              !link.roles) && (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex h-[48px] grow items-center  gap-2 rounded-md py-3 text-sm font-medium hover:text-primary md:flex-none md:justify-start",
                  {
                    "text-primary": pathname.includes(link.href),
                  }
                )}
              >
                <LinkIcon className="w-6" />
                <p className="">{link.name}</p>
              </Link>
            )
          );
        })}
        <div className="mt-5 space-y-6">
          {
            <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6 text-black">
              <h1 className="text-lg font-semibold">Wallet Balance</h1>
              <p className="font-medium line-clamp-1">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(user?.walletBalance || 0)}
              </p>
            </div>
          }
          <LogoutButton />
        </div>
      </div>
      {/* <NavLinks /> */}
      <div className="hidden w-full grow rounded-md  md:block px-3 mt-10">
        <div className="space-y-1 mt-8 text-gray-400 font-medium">
          {links?.map((link) => {
            const LinkIcon = link.icon;
            return (
              ((link.roles && user && link.roles.includes(user.role)) ||
                !link.roles) && (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "grid grid-cols-[auto,1fr] gap-2 h-[48px] items-center rounded-md py-3 text-sm font-medium hover:text-primary",
                    {
                      " text-primary": pathname.includes(link.href),
                    }
                  )}
                >
                  <LinkIcon className="w-6" />
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              )
            );
          })}
        </div>
        <div className="absolute bottom-10 left-0 right-0 space-y-6">
          {
            <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6">
              <h1 className="text-lg font-semibold">Wallet Balance</h1>
              <p className="font-medium line-clamp-1">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(user?.walletBalance || 0)}
              </p>
            </div>
          }
          <div className=" px-4">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
