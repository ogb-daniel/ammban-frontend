"use client";

import { useAdminStore } from "@/providers/admin-store-provider";
import React from "react";
import Table from "../table";
import { transactionColumns } from "./all-transactions";
import TransactionRowCard from "./transaction-row-card";
import { Transaction } from "@/app/lib/definitions";

const Outflow = () => {
  const { transactions } = useAdminStore((state) => state);
  const outflows = transactions.filter((transaction) => transaction);
  return (
    <Table<Transaction>
      data={outflows}
      columns={transactionColumns}
      title="All Outflows"
      mobileLayout="custom"
      customMobileComponent={TransactionRowCard as unknown as React.ReactNode}
    />
  );
};

export default Outflow;
