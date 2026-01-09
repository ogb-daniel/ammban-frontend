"use client";
import { useUserStore } from "@/providers/user-store-provider";
import { useRouter } from "next/navigation";
import React from "react";

export default function CommissionAction() {
  const router = useRouter();
  const { user } = useUserStore((state) => state);

  return (
    <div className="flex max-w-lg mx-auto gap-6 mt-4">
      <button
        className="btn-primary"
        onClick={() =>
          router.push(`/${user?.role}/commissions/create-commission`)
        }
      >
        Create Commission
      </button>
    </div>
  );
}
