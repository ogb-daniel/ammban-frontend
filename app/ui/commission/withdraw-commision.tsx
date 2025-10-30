"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { useRouter } from "next/navigation";
import React from "react";

export default function WithdrawCommission() {
  const router = useRouter();
  const { user } = useUserStore((state) => state);
  return (
    <div className="flex max-w-lg mx-auto gap-2 mt-4 flex-col">
      <button
        className="btn-primary"
        onClick={() => router.push(`/${user?.role}/commissions/withdraw-funds`)}
      >
        Withdraw Funds to Bank
      </button>
    </div>
  );
}
