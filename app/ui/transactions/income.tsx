"use client";

import { useAdminStore } from "@/providers/admin-store-provider";
import { Transaction } from "@/stores/admin-store";
import React from "react";
import Table from "../table";
import { transactionColumns } from "./all-transactions";
import TransactionRowCard from "./transaction-row-card";

const Income = () => {
  const { transactions } = useAdminStore((state) => state);
  const incomes = transactions.filter(
    (transaction) => transaction.source === "income"
  );
  return (
    <Table<Transaction>
      data={incomes}
      columns={transactionColumns}
      title="All Incomes"
      mobileLayout="custom"
      customMobileComponent={TransactionRowCard as unknown as React.ReactNode}
    />
  );
};

export default Income;
