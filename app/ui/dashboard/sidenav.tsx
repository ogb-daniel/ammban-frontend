"use client";
import { AiFillProduct, AiOutlineUser } from "react-icons/ai";
import Logo from "../logo";
import NavIcon from "../nav-icon";
import { IoIosMenu } from "react-icons/io";
import SearchBar from "../search-bar";
import { RiHomeFill, RiWallet3Fill } from "react-icons/ri";
import clsx from "clsx";
import { FaUsers } from "react-icons/fa";
import { ADMIN_DASHBOARD } from "@/app/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
const links = [
  { name: "Dashboard", href: ADMIN_DASHBOARD.url, icon: RiHomeFill },
  {
    name: "Profile",
    href: `${ADMIN_DASHBOARD.url}/profile`,
    icon: FaUser,
  },
  { name: "Users", href: `${ADMIN_DASHBOARD.url}/users`, icon: FaUsers },
  {
    name: "Products",
    href: `${ADMIN_DASHBOARD.url}/products`,
    icon: AiFillProduct,
  },
  {
    name: "Commission",
    href: `${ADMIN_DASHBOARD.url}/commission`,
    icon: RiWallet3Fill,
  },
];

export default function SideNav() {
  const pathname = usePathname();
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
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
        className={clsx("px-3 text-gray-400 font-medium md:hidden", {
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
                  " text-primary": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="">{link.name}</p>
            </Link>
          );
        })}
      </div>
      {/* <NavLinks /> */}
      <div className="hidden h-auto w-full grow rounded-md  md:block px-7 mt-10">
        <SearchBar placeholder="Search for..." onChange={() => {}} />
        <div className="space-y-1 mt-8 text-gray-400 font-medium">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md py-3 text-sm font-medium hover:text-primary md:flex-none md:justify-start",
                  {
                    " text-primary": pathname === link.href,
                  }
                )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
