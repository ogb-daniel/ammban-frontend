import Link from "next/link";
import React from "react";
import TransactionCard from "../transactions/transaction-card";
import { BiCard } from "react-icons/bi";

export default function RecentTransactions() {
  return (
    <section className="mt-9">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Link className="text-primary font-semibold" href="#">
          View All
        </Link>
      </div>
      <div className="p-4">
        <TransactionCard
          change="-₦5,000"
          date={new Date()}
          icon={<BiCard />}
          iconColor="text-yellow-500"
          bgColor="bg-yellow-100"
          id="#2431"
          title="INSURANCE"
        />
      </div>
    </section>
  );
}
