"use client";
import { use } from "react";

import EditRoleForm from "@/app/ui/roles/edit-role-form";
import { useAdminStore } from "@/providers/admin-store-provider";
import { notFound } from "next/navigation";
// export const metadata: Metadata = {
//   title: "Dashboard",
// };
export default function ViewRole({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = use(params).id;
  const { roles } = useAdminStore((state) => state);
  const role = roles.find((role) => role.id === id);

  if (!role) {
    notFound();
  }
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">View Role</h1>
      </div>
      <div className=" p-6">
        <EditRoleForm role={role} />
      </div>
    </main>
  );
}
