"use client";

import { useAdminStore } from "@/providers/admin-store-provider";
import { Transaction } from "@/stores/admin-store";
import React from "react";
import Table from "../table";
import { transactionColumns } from "./all-transactions";
import TransactionRowCard from "./transaction-row-card";

const Outflow = () => {
  const { transactions } = useAdminStore((state) => state);
  const outflows = transactions.filter(
    (transaction) => transaction.source === "outflow"
  );
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
