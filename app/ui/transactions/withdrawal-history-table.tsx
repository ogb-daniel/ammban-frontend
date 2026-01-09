"use client";
import React from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { useAdminStore } from "@/providers/admin-store-provider";

import { WithdrawalHistory } from "@/app/lib/definitions";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdAccountBalance, MdCheckBox } from "react-icons/md";
import { showAXATransactionDetails } from "@/app/lib/utils/transaction-details";
import { FaNoteSticky } from "react-icons/fa6";

const transactionColumns: ColumnDef<WithdrawalHistory>[] = [
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
    accessorKey: "narration",
    header: "Narration",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <FaNoteSticky className="text-gray-500" />,
    },
  },
  {
    accessorKey: "beneficiaryAccountNumber",
    header: "Account Number",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <MdAccountBalance className="text-gray-500" />,
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <Status value={info.getValue() as WithdrawalHistory["status"]} />
    ),
    enableSorting: true,
    meta: {
      icon: <MdCheckBox className="text-gray-500" />,
    },
  },
];
const Status = ({ value }: { value: WithdrawalHistory["status"] }) => {
  return (
    <span
      className={`text-sm font-medium min-w-[80px] justify-center w-full  broder py-1 px-2 flex items-center gap-1 rounded-sm ${
        value === "SUCCESS"
          ? "text-[#14CA74] bg-[#05C16833] border-[#05C16880]"
          : value === "PENDING"
          ? "text-[#FBBF24] bg-[#FDE68A] border-[#FCD34D]"
          : value === "FAILED"
          ? "text-[#FF5A65] bg-[#FF5A6533] border-[#FF5A6533]"
          : "text-[#a3a3a3] bg-[#eff1f9] border-[#e2e6f4]"
      }`}
    >
      <span
        className={`w-1 h-1 inline-block rounded-full ${
          value === "SUCCESS"
            ? "bg-[#14CA74]"
            : value === "PENDING"
            ? "bg-[#FBBF24]"
            : value === "FAILED"
            ? "bg-[#FF5A65]"
            : "bg-[#a3a3a3]"
        } `}
      ></span>
      {value === "SUCCESS"
        ? "Success"
        : value === "PENDING"
        ? "Pending"
        : value === "FAILED"
        ? "Failed"
        : "No Info"}
    </span>
  );
};
const WithdrawalHistoryTable = ({
  title = "Wallet Transaction History",
}: {
  title?: string;
}) => {
  const { walletTransactions } = useAdminStore((state) => state);
  const actions = [
    {
      element: (
        <button className="border rounded-md py-1 px-2 text-primary border-primary">
          Details
        </button>
      ),
      onClick: async (transaction: WithdrawalHistory) => {
        await showAXATransactionDetails(
          new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(transaction.amount),
          "",
          transaction.beneficiaryAccountNumber,
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
    <Table<WithdrawalHistory>
      data={walletTransactions}
      columns={transactionColumns}
      title={title}
      actions={actions}
    />
  );
};

export default WithdrawalHistoryTable;
