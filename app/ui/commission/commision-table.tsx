"use client";
import React from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { useAdminStore } from "@/providers/admin-store-provider";
import { FaTrash } from "react-icons/fa";

import { LiaUserShieldSolid } from "react-icons/lia";
import { PiDivideFill } from "react-icons/pi";
import { CommissionPercentage } from "@/app/lib/definitions";

const commissionColumns: ColumnDef<CommissionPercentage>[] = [
  {
    accessorKey: "roleName",
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
  const { commissionsPercentage } = useAdminStore((state) => state);
  const actions = [
    // {
    //   element: <MdEdit className="w-4 h-4 text-[#0B1739]" />,
    //   onClick: (commission: Commission) => {
    //     router.push(`${ADMIN_COMMISSION.url}/${commission.id}`);
    //   },
    // //   label: "Edit commission",
    // // },
    // {
    //   element: <FaTrash className="w-4 h-4 text-red-500" />,
    //   onClick: (commission: CommissionPercentage) => {
    //     // Handle delete action
    //     if (confirm("Are you sure you want to delete this commission?")) {
    //       // Add delete logic here
    //       console.log("Delete commission:", commission);
    //     }
    //   },
    //   label: "Delete commission",
    // },
  ];
  return (
    <Table<CommissionPercentage>
      data={commissionsPercentage}
      columns={commissionColumns}
      title="All Commissions"
      actions={actions}
    />
  );
};

export default CommissionTable;
