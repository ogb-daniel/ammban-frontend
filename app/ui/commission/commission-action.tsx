"use client";
import { ADMIN_COMMISSION } from "@/app/lib/routes";
import { useRouter } from "next/navigation";
import React from "react";

export default function CommissionAction() {
  const router = useRouter();
  return (
    <div className="flex max-w-lg mx-auto gap-6 mt-4">
      <button
        className="btn-primary"
        onClick={() => router.push(`${ADMIN_COMMISSION.url}/create-commission`)}
      >
        Create Commission
      </button>
    </div>
  );
}
