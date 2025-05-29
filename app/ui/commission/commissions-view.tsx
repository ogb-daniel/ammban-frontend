"use client";
import React from "react";
import TabSlider from "../tab-slider";
import WithdrawCommission from "./withdraw-commision";

import AllTransactions from "@/app/ui/transactions/all-transactions";
import Income from "@/app/ui/transactions/income";
import Outflow from "@/app/ui/transactions/outflow";
const tabs = [
  { key: "all", label: "All Transactions", component: <AllTransactions /> },
  { key: "income", label: "Income", component: <Income /> },
  { key: "outflow", label: "Outflow", component: <Outflow /> },
];
export default function CommissionsView() {
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center gap-5">
        <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6 flex-1">
          <h1 className="text-lg font-semibold">Commission Earnings</h1>
          <p className="font-medium line-clamp-1">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(0)}
          </p>
        </div>
        <div className="flex-1">
          <WithdrawCommission />
        </div>
      </div>
      <div className="mt-4">
        <TabSlider tabs={tabs} />
      </div>
    </div>
  );
}
