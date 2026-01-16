"use client";
import React, { useEffect } from "react";

import TransactionContainer from "../transactions/transaction-container";
import { Transaction } from "@/app/lib/definitions";
import { useUserStore } from "@/providers/user-store-provider";

// const tabs = [
//   { key: "all", label: "All Transactions", component: <AllTransactions /> },
//   { key: "income", label: "Income", component: <Income /> },
//   { key: "outflow", label: "Outflow", component: <Outflow /> },
// ];
export default function CommissionsView({
  transactions,
  commissionEarnings,
}: {
  transactions: Transaction[];
  commissionEarnings: number;
}) {
  const { setUser, user } = useUserStore((state) => state);
  useEffect(() => {
    console.log(
      "Updating commission earnings in user store:",
      commissionEarnings
    );

    setUser({ ...user!, commissionEarnings });
  }, []);
    console.log(user);

  return (
    <div className="p-6">
      {/* <div className="mt-4">
        <TabSlider tabs={tabs} />
      </div> */}
      <TransactionContainer transactions={transactions} />
    </div>
  );
}
