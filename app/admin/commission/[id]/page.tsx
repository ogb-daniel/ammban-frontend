"use client";
import { use } from "react";

import { useAdminStore } from "@/providers/admin-store-provider";
import { notFound } from "next/navigation";
import EditCommissionForm from "@/app/ui/commission/edit-commission-form";
// export const metadata: Metadata = {
//   title: "Dashboard",
// };
export default function ViewCommission({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = use(params).id;
  const { commissions } = useAdminStore((state) => state);
  const commission = commissions.find((commission) => commission.id === id);
  console.log(commissions);

  if (!commission) {
    notFound();
  }
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">View Commission</h1>
      </div>
      <div className=" p-6">
        <EditCommissionForm commission={commission} />
      </div>
    </main>
  );
}
