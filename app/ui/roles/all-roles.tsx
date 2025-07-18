"use client";
import React, { useEffect } from "react";
import RoleCard from "./role-card";
import { useRouter } from "next/navigation";
import { Role } from "@/app/lib/definitions";
import { useAdminStore } from "@/providers/admin-store-provider";
import { useUserStore } from "@/providers/user-store-provider";

export default function AllRoles({ roles }: { roles: Role[] }) {
  const { initializeRoles, roles: storeRoles } = useAdminStore(
    (state) => state
  );
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    initializeRoles(roles);
  }, []);
  const router = useRouter();
  return (
    <section className="space-y-5">
      {storeRoles.map((role) => (
        <RoleCard
          key={role.id}
          title={role.displayName}
          description={role.description}
          onClick={() => {
            router.push(`/${user?.role}/roles/${role.id}`);
          }}
        />
      ))}
      <div className="md:w-1/2 mx-auto mt-10">
        <button
          className="btn-primary "
          onClick={() => router.push(`/${user?.role}/roles/create-role`)}
        >
          Create Role
        </button>
      </div>
    </section>
  );
}
