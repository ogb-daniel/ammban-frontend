"use client";
import React from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { useAdminStore } from "@/providers/admin-store-provider";

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
  
  return (
    <Table<CommissionPercentage>
      data={commissionsPercentage}
      columns={commissionColumns}
      title="All Commissions"
      actions={[]}
    />
  );
};

export default CommissionTable;
