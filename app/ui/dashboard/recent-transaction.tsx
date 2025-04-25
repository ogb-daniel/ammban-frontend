import Link from "next/link";
import React from "react";
import TransactionCard from "../transactions/transaction-card";
import { BiCard } from "react-icons/bi";
import { ADMIN_TRANSACTIONS, AGENT_TRANSACTIONS } from "@/app/lib/routes";
import { useUserStore } from "@/providers/user-store-provider";

export default function RecentTransactions() {
  const { user } = useUserStore((state) => state);
  console.log(user);

  return (
    <section className="mt-9">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Link
          className="text-primary font-semibold"
          href={
            user?.role === "admin"
              ? ADMIN_TRANSACTIONS.url
              : AGENT_TRANSACTIONS.url
          }
        >
          View All
        </Link>
      </div>
      <div className="p-4">
        <TransactionCard
          change="-₦5,000"
          date={new Date()}
          icon={<BiCard />}
          baseColor="text-yellow-500"
          id="#2431"
          title="INSURANCE"
        />
      </div>
    </section>
  );
}
