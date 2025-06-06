"use client";
import React from "react";
import WithdrawCommission from "./withdraw-commision";

import TransactionContainer from "../transactions/transaction-container";
import { Transaction } from "@/app/lib/definitions";
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
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center gap-5">
        <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6 flex-1">
          <h1 className="text-lg font-semibold">Commission Earnings</h1>
          <p className="font-medium line-clamp-1">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(commissionEarnings)}
          </p>
        </div>
        <div className="flex-1">
          <WithdrawCommission />
        </div>
      </div>
      {/* <div className="mt-4">
        <TabSlider tabs={tabs} />
      </div> */}
      <TransactionContainer transactions={transactions} />
    </div>
  );
}
