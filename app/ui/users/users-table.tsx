"use client";
import React, { useState } from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { MdCheckBox, MdEdit } from "react-icons/md";
import { FaTransgender, FaTrash, FaUser } from "react-icons/fa";
import { ADMIN_USERS } from "@/app/lib/routes";
import { User } from "@/stores/admin-store";
import { useRouter } from "next/navigation";
import { PiPhoneFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCog, UserCheck, ChevronDown } from "lucide-react";
const usersData: User[] = Array(10).fill({
  name: "David Abolaji",
  email: "david@google.com",
  phone: "(234) 907 - 1274 - 515",
  state: "Lagos (Nigeria)",
  gender: "Male",
  status: "Active",
});

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => (
      <div>
        <p className="font-medium">{info.getValue() as string}</p>
        <p className="text-xs font-medium text-gray-500">
          {info.row.original.email}
        </p>
      </div>
    ),
    enableSorting: true,
    meta: {
      icon: <FaUser className="text-gray-500" />,
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <PiPhoneFill className="text-gray-500" />,
    },
  },
  {
    accessorKey: "state",
    header: "State",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <FaLocationDot className="text-gray-500" />,
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <FaTransgender className="text-gray-500" />,
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => <Status value={info.getValue() as string} />,
    enableSorting: true,
    meta: {
      icon: <MdCheckBox className="text-gray-500" />,
    },
  },
];
const Status = ({ value }: { value: string }) => {
  return (
    <span
      className={`text-sm font-medium min-w-[80px] justify-center w-full  broder py-1 px-2 flex items-center gap-1 rounded-sm ${
        value === "Active"
          ? "text-[#14CA74] bg-[#05C16833] border-[#05C16880]"
          : value === "Pending"
          ? "text-[#A3A3A3] bg-[#AEB9E133] border-[#AEB9E133]"
          : "text-[#FF5A65] bg-[#FF5A6533] border-[#FF5A6533]"
      }`}
    >
      <span
        className={`w-1 h-1 inline-block rounded-full ${
          value === "Active"
            ? "bg-[#14CA74]"
            : value === "Pending"
            ? "bg-[#A3A3A3]"
            : "bg-[#FF5A65]"
        } `}
      ></span>
      {value as string}
    </span>
  );
};

function ManageUsersDropdown({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  const handleSelect = (value: string) => {
    setSelected(value);
    console.log("Selected:", value); // You can use this value for further logic
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-primary text-white">
          {selected} <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => handleSelect("Manage Users")}
        >
          <UserCog size={16} /> Manage Users
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => handleSelect("Assign Users")}
        >
          <UserCheck size={16} /> Assign Users
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const UsersTable = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("Manage Users");

  const actions =
    selected === "Manage Users"
      ? [
          {
            element: <MdEdit className="w-4 h-4 text-[#0B1739]" />,
            onClick: (user: User) => {
              router.push(`${ADMIN_USERS.url}/${user.id}`);
            },
            label: "Edit User",
          },
          {
            element: <FaTrash className="w-4 h-4 text-red-500" />,
            onClick: (user: User) => {
              // Handle delete action
              if (confirm("Are you sure you want to delete this User?")) {
                // Add delete logic here
                console.log("Delete User:", user);
              }
            },
            label: "Delete User",
          },
        ]
      : [
          {
            element: (
              <span className="text-primary border border-primary py-[5px] px-[10px] rounded-lg">
                Assign
              </span>
            ),
            onClick: (user: User) => {
              router.push(`${ADMIN_USERS.url}/${user.id}`);
            },
            label: "Edit User",
          },
        ];
  return (
    <div className="space-y-2">
      <ManageUsersDropdown selected={selected} setSelected={setSelected} />
      <Table<User>
        data={usersData}
        columns={userColumns}
        title="All Users"
        actions={actions}
      />
    </div>
  );
};

export default UsersTable;
