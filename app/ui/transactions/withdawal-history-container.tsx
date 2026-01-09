"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/providers/admin-store-provider";

import { WithdrawalHistory } from "@/app/lib/definitions";
import WithdrawalHistoryTable from "./withdrawal-history-table";

export default function WithdrawalHistoryContainer({
  transactions,
}: {
  transactions: WithdrawalHistory[];
}) {
  const { initializeWalletTransactions } = useAdminStore((state) => state);

  useEffect(() => {
    initializeWalletTransactions(transactions);
  }, [initializeWalletTransactions, transactions]);

  return (
    <div className="space-y-6">
      <WithdrawalHistoryTable />
    </div>
  );
}
