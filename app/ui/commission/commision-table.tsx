"use client";
import React from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { useAdminStore } from "@/providers/admin-store-provider";
import { FaTrash, FaUser } from "react-icons/fa";

import { MdEdit, MdInfo } from "react-icons/md";
import { ADMIN_COMMISSION } from "@/app/lib/routes";
import { useRouter } from "next/navigation";
import { LiaUserShieldSolid } from "react-icons/lia";
import { PiDivideFill } from "react-icons/pi";
import { Commission } from "@/app/lib/definitions";

const commissionColumns: ColumnDef<Commission>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <FaUser className="text-gray-500" />,
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => `${(info.getValue() as string).substring(0, 50)}...`,
    meta: {
      icon: <MdInfo className="text-gray-500" />,
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info) => info.getValue(),
    meta: {
      icon: <LiaUserShieldSolid className="text-gray-500" />,
    },
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
    cell: (info) => info.getValue() + "%",
    enableSorting: true,
    meta: {
      icon: <PiDivideFill className="text-gray-500" />,
    },
  },
];

const CommissionTable = () => {
  const { commissions } = useAdminStore((state) => state);
  const router = useRouter();
  const actions = [
    {
      element: <MdEdit className="w-4 h-4 text-[#0B1739]" />,
      onClick: (commission: Commission) => {
        router.push(`${ADMIN_COMMISSION.url}/${commission.id}`);
      },
      label: "Edit commission",
    },
    {
      element: <FaTrash className="w-4 h-4 text-red-500" />,
      onClick: (commission: Commission) => {
        // Handle delete action
        if (confirm("Are you sure you want to delete this commission?")) {
          // Add delete logic here
          console.log("Delete commission:", commission);
        }
      },
      label: "Delete commission",
    },
  ];
  return (
    <Table<Commission>
      data={commissions}
      columns={commissionColumns}
      title="All Commissions"
      actions={actions}
    />
  );
};

export default CommissionTable;
