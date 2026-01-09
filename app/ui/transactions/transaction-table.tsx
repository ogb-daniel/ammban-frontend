"use client";
import React from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { useAdminStore } from "@/providers/admin-store-provider";

import { LiaUserShieldSolid } from "react-icons/lia";
import { PiPhoneFill } from "react-icons/pi";
import { Transaction } from "@/app/lib/definitions";
import { FaUser } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdCheckBox } from "react-icons/md";
import { showAXATransactionDetails } from "@/app/lib/utils/transaction-details";

const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: (info) => info.getValue(),
    meta: {
      icon: <LiaUserShieldSolid className="text-gray-500" />,
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: (info) => info.getValue(),
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
    accessorKey: "amount",
    header: "Amount",
    cell: (info) => {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(info.getValue() as number);
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const priceA = rowA.getValue("amount") as number;
      const priceB = rowB.getValue("amount") as number;
      return priceA > priceB ? 1 : priceA < priceB ? -1 : 0;
    },
    meta: {
      icon: <TbCurrencyNaira className="text-gray-500" />,
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => <Status value={info.getValue() as number} />,
    enableSorting: true,
    meta: {
      icon: <MdCheckBox className="text-gray-500" />,
    },
  },
];
const Status = ({ value }: { value: number }) => {
  return (
    <span
      className={`text-sm font-medium min-w-[80px] justify-center w-full  broder py-1 px-2 flex items-center gap-1 rounded-sm ${
        value === 1
          ? "text-[#14CA74] bg-[#05C16833] border-[#05C16880]"
          : value === 2
          ? "text-[#FBBF24] bg-[#FDE68A] border-[#FCD34D]"
          : value === 3
          ? "text-[#FF5A65] bg-[#FF5A6533] border-[#FF5A6533]"
          : value === 4
          ? "text-[#14CA74] bg-[#eff1f9] border-[#e2e6f4]"
          : "text-[#a3a3a3] bg-[#eff1f9] border-[#e2e6f4]"
      }`}
    >
      <span
        className={`w-1 h-1 inline-block rounded-full ${
          value === 1
            ? "bg-[#14CA74]"
            : value === 2
            ? "bg-[#FBBF24]"
            : value === 3
            ? "bg-[#FF5A65]"
            : value === 4
            ? "bg-[#14CA74]"
            : "bg-[#a3a3a3]"
        } `}
      ></span>
      {value === 1
        ? "Paid"
        : value === 2
        ? "Pending"
        : value === 3
        ? "Failed"
        : value === 4
        ? "Success"
        : "Refunded"}
    </span>
  );
};
const TransactionTable = ({
  title = "All Transactions",
}: {
  title?: string;
}) => {
  const { transactions } = useAdminStore((state) => state);
  const actions = [
    {
      element: (
        <button className="border rounded-md py-1 px-2 text-primary border-primary">
          Details
        </button>
      ),
      onClick: async (transaction: Transaction) => {
        await showAXATransactionDetails(
          new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(transaction.amount),
          "",
          transaction.customerName,
          "",
          "",
          "",
          ""
        );
      },
      label: "Details",
    },
  ];
  return (
    <Table<Transaction>
      data={transactions}
      columns={transactionColumns}
      title={title}
      actions={actions}
    />
  );
};

export default TransactionTable;
