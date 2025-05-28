"use client";
import { AiFillProduct, AiOutlineUser } from "react-icons/ai";
import Logo from "../logo";
import NavIcon from "../nav-icon";
import { IoIosMenu } from "react-icons/io";
import SearchBar from "../search-bar";
import { RiHomeFill, RiWallet3Fill } from "react-icons/ri";
import clsx from "clsx";
import { FaUserLock, FaUsers } from "react-icons/fa";
import {
  ADMIN_DASHBOARD,
  ADMIN_COMMISSION,
  ADMIN_PRODUCTS,
  ADMIN_PROFILE,
  ADMIN_USERS,
  ADMIN_ROLES,
  AGENT_DASHBOARD,
  AGENT_PROFILE,
  AGENT_PRODUCTS,
  AGENT_REPORTS,
} from "@/app/lib/routes";
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

  const links =
    user?.role === "admin"
      ? [
          { name: "Dashboard", href: ADMIN_DASHBOARD.url, icon: RiHomeFill },
          {
            name: "Profile",
            href: `${ADMIN_PROFILE.url}`,
            icon: FaUser,
          },
          { name: "Users", href: `${ADMIN_USERS.url}`, icon: FaUsers },
          {
            name: "Roles and Permissions",
            href: `${ADMIN_ROLES.url}`,
            icon: FaUserLock,
          },
          {
            name: "Products",
            href: `${ADMIN_PRODUCTS.url}`,
            icon: AiFillProduct,
          },
          {
            name: "Commission",
            href: `${ADMIN_COMMISSION.url}`,
            icon: RiWallet3Fill,
          },
        ]
      : [
          { name: "Dashboard", href: AGENT_DASHBOARD.url, icon: RiHomeFill },
          {
            name: "Profile",
            href: AGENT_PROFILE.url,
            icon: FaUser,
          },
          {
            name: "Products",
            href: AGENT_PRODUCTS.url,
            icon: AiFillProduct,
          },
          {
            name: "Reports",
            href: AGENT_REPORTS.url,
            icon: RiWallet3Fill,
          },
        ];

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
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
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
          );
        })}
        <div className="mt-5">
          <LogoutButton />
        </div>
      </div>
      {/* <NavLinks /> */}
      <div className="hidden w-full grow rounded-md  md:block px-7 mt-10">
        <SearchBar placeholder="Search for..." onChange={() => {}} />
        <div className="space-y-1 mt-8 text-gray-400 font-medium">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
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
            );
          })}
        </div>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
