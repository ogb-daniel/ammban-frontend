"use client";
import { ADMIN_USERS } from "@/app/lib/routes";
import { useRouter } from "next/navigation";
import React from "react";

export default function UsersAction() {
  const router = useRouter();
  return (
    <div className="flex max-w-lg mx-auto gap-6 mt-4">
      <button
        className="btn-primary"
        onClick={() => router.push(`${ADMIN_USERS.url}/create-user`)}
      >
        Create User
      </button>
    </div>
  );
}
