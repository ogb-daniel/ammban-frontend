"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/providers/admin-store-provider";

import { Transaction } from "@/app/lib/definitions";
import TransactionTable from "./transaction-table";

export default function TransactionContainer({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const { initializeTransactions } = useAdminStore((state) => state);

  useEffect(() => {
    initializeTransactions(transactions);
  }, [initializeTransactions, transactions]);

  return (
    <div className="space-y-6">
      <TransactionTable />
    </div>
  );
}
