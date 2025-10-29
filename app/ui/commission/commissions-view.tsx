"use client";
import React, { useEffect } from "react";
import WithdrawCommission from "./withdraw-commision";

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
      <div className="flex flex-wrap items-center gap-5 mb-4">
        <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6 flex-1">
          <h1 className="text-lg font-semibold">Commission Earnings</h1>
          <p className="font-medium line-clamp-1">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(user?.commissionEarnings || 0)}
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
