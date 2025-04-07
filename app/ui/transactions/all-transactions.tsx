"use client";
import { useAdminStore } from "@/providers/admin-store-provider";
import { Price, Transaction } from "@/stores/admin-store";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Table from "../table";
import moment from "moment";
import TransactionRowCard from "./transaction-row-card";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => moment(info.getValue() as Date).format("Do MMMM YYYY"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info) =>
      (info.getValue() as Price).amount.toLocaleString("en", {
        style: "currency",
        currency: (info.getValue() as Price).currency,
      }),
  },
  {
    accessorKey: "receipt",
    header: "Receipt",
    cell: (info) => (
      <a
        href={info.getValue() as string}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        Download
      </a>
    ),
  },
];

const AllTransactions = () => {
  const { transactions } = useAdminStore((state) => state);
  return (
    <Table<Transaction>
      data={transactions}
      columns={transactionColumns}
      title="All Transactions"
      mobileLayout="custom"
      customMobileComponent={TransactionRowCard as unknown as React.ReactNode}
    />
  );
};

export default AllTransactions;
