"use client";
import React, { useState } from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { MdCheckBox, MdEdit, MdPermIdentity } from "react-icons/md";
import { FaTransgender, FaTrash, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { PiExportBold, PiPhoneFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCog, UserCheck, ChevronDown, Eye } from "lucide-react";
import RoleAssignmentModal from "../roles/role-assign-modal";
import DownlineModal from "./downline-modal";
import { toTitleCase } from "@/lib/utils";
import { User } from "@/app/lib/definitions";
import Swal from "sweetalert2";
import { deleteUser } from "@/app/lib/actions/user";
import { toast } from "react-toastify";
import { useAdminStore } from "@/providers/admin-store-provider";
import { useUserStore } from "@/providers/user-store-provider";

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
    cell: (info) => (
      <div>
        <p className="text-sm font-medium">{info.row.original.fullName}</p>
        <p className="text-xs font-medium text-gray-500">
          {info.row.original.emailAddress}
        </p>
      </div>
    ),
    enableSorting: true,
    meta: {
      icon: <FaUser className="text-gray-500" />,
    },
  },
  {
    accessorKey: "phoneNumber",
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
    accessorKey: "roleNames",
    header: "Role",
    cell: (info) => info.getValue(),
    enableSorting: true,

    meta: {
      icon: <MdPermIdentity className="text-gray-500" />,
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: (info) => toTitleCase(info.getValue() === 0 ? "Male" : "Female"),
    enableSorting: true,
    meta: {
      icon: <FaTransgender className="text-gray-500" />,
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: (info) => <Status value={info.getValue() as boolean} />,
    enableSorting: true,
    meta: {
      icon: <MdCheckBox className="text-gray-500" />,
    },
  },
];
const Status = ({ value }: { value: boolean }) => {
  return (
    <span
      className={`text-sm font-medium min-w-[80px] justify-center w-full  broder py-1 px-2 flex items-center gap-1 rounded-sm ${
        value
          ? "text-[#14CA74] bg-[#05C16833] border-[#05C16880]"
          : "text-[#FF5A65] bg-[#FF5A6533] border-[#FF5A6533]"
      }`}
    >
      <span
        className={`w-1 h-1 inline-block rounded-full ${
          value ? "bg-[#14CA74]" : "bg-[#FF5A65]"
        } `}
      ></span>
      {value ? "Active" : "Inactive"}
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
  const { user } = useUserStore((state) => state);
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
        {user?.role === "admin" && (
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => handleSelect("Assign Users")}
          >
            <UserCheck size={16} /> Assign Users
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const UsersTable = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const { deleteUser: deleteUserFromStore } = useAdminStore((state) => state);
  const [selected, setSelected] = useState("Manage Users");
  const [isOpen, setIsOpen] = useState(false);
  const [isDownlineModalOpen, setIsDownlineModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const { user: currentUser } = useUserStore((state) => state);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const actions =
    selected === "Manage Users"
      ? [
          {
            element: <Eye className="w-4 h-4 text-[#094794]" />,
            onClick: (user: User) => {
              setSelectedUser(user);
              setIsDownlineModalOpen(true);
            },
            label: "View Downline",
          },
          {
            element: <MdEdit className="w-4 h-4 text-[#0B1739]" />,
            onClick: (user: User) => {
              router.push(`/${currentUser?.role}/users/${user.id}`);
            },
            label: "Edit User",
          },
          {
            element: <FaTrash className="w-4 h-4 text-red-500" />,
            onClick: (user: User) => {
              Swal.fire({
                title: "Are you sure?",
                text: "Please confirm your action.",
                showCancelButton: true,
                cancelButtonText: "No, Cancel",
                confirmButtonColor: "#094794",
                confirmButtonText: "Yes, Confirm",
                reverseButtons: true,
                customClass: {
                  cancelButton: "text-primary bg-white border border-primary",
                  actions: "flex-row gap-2",
                },
                buttonsStyling: true,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                  return deleteUser(user.id);
                },
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const response = result.value;
                  if (response.success) {
                    deleteUserFromStore(user.id);
                    toast.success("User deleted successfully");
                  } else {
                    toast.error(response.error.message);
                  }
                }
              });
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
              setSelectedUser(user);
              setIsOpen(true);
            },
            label: "Edit User",
          },
        ];
  console.log(filteredUsers);

  return (
    <div className="space-y-2">
      <RoleAssignmentModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        user={selectedUser as User}
      />
      <DownlineModal
        isOpen={isDownlineModalOpen}
        onRequestClose={() => setIsDownlineModalOpen(false)}
        user={selectedUser as User}
      />
      <div className="flex items-center justify-between">
        <ManageUsersDropdown selected={selected} setSelected={setSelected} />
        <Button
          variant="default"
          className="bg-primary text-white"
          onClick={() => {
            // Export filtered users to CSV
            const csvContent =
              "data:text/csv;charset=utf-8," +
              [
                [
                  "Full Name",
                  "Email",
                  "Phone",
                  "State",
                  "Roles",
                  "Gender",
                  "Status",
                ],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...filteredUsers.map((user: any) => [
                  user?.fullName,
                  user?.emailAddress,
                  user?.phoneNumber,
                  user?.state,
                  user?.roleNames,
                  user?.gender === 0 ? "Male" : "Female",
                  user?.isActive ? "Active" : "Inactive",
                ]),
              ]
                .map((row) => row?.join(","))
                ?.join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "users.csv");
            document.body.appendChild(link);
            link.click();
          }}
        >
          Export Users
          <PiExportBold className="w-4 h-4" />
        </Button>
      </div>
      <Table<User>
        data={users}
        columns={userColumns}
        title="All Users"
        actions={actions}
        setFilteredData={setFilteredUsers}
      />
    </div>
  );
};

export default UsersTable;
