"use client";
import { useAdminStore } from "@/providers/admin-store-provider";
import React from "react";
import RoleCard from "./role-card";
import { useRouter } from "next/navigation";
import { ADMIN_ROLES } from "@/app/lib/routes";

export default function AllRoles({}) {
  const { roles } = useAdminStore((state) => state);
  const router = useRouter();
  return (
    <section className="space-y-5">
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          title={role.title}
          description={role.description}
          color={role.color}
          onClick={() => {}}
        />
      ))}
      <div className="md:w-1/2 mx-auto mt-10">
        <button
          className="btn-primary "
          onClick={() => router.push(`${ADMIN_ROLES.url}/create-role`)}
        >
          Create Role
        </button>
      </div>
    </section>
  );
}
