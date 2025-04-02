"use client";
import { use } from "react";

import { useAdminStore } from "@/providers/admin-store-provider";
import { notFound } from "next/navigation";
import UserDetails from "@/app/ui/users/user-details";
// export const metadata: Metadata = {
//   title: "Dashboard",
// };
export default function ViewUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = use(params).id;
  const { users } = useAdminStore((state) => state);
  const user = users.find((user) => user.id === id);

  if (!user) {
    notFound();
  }
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">View User</h1>
      </div>
      <div className=" p-6">
        <UserDetails user={user} />
      </div>
    </main>
  );
}
