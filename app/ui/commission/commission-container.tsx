"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/providers/admin-store-provider";

import { CommissionPercentage } from "@/app/lib/definitions";
import CommissionTable from "./commision-table";
import CommissionAction from "./commission-action";
import { getAllCommissionPercentages } from "@/app/lib/actions/commission";

export default function CommissionContainer({
  commissions,
  limit,
}: {
  commissions: CommissionPercentage[];
  limit: number;
}) {
  const [skip, setSkip] = useState(100);
  const {
    initializeCommissionsPercentage,
    commissionsPercentage: storeCommissions,
  } = useAdminStore((state) => state);

  useEffect(() => {
    initializeCommissionsPercentage(commissions);
  }, [initializeCommissionsPercentage, commissions]);

  useEffect(() => {
    console.log(skip);
    if (skip > storeCommissions?.length || skip < storeCommissions?.length)
      return;
    getAllCommissionPercentages({
      MaxResultCount: limit,
      SkipCount: skip,
    }).then((res) => {
      console.log(res);
      if (
        res.success &&
        res?.result?.payload?.items?.length &&
        storeCommissions
      )
        initializeCommissionsPercentage([
          ...storeCommissions,
          ...res.result.payload.items,
        ]);
      setSkip(skip + limit);
    });
  }, [initializeCommissionsPercentage, limit, skip, storeCommissions]);

  return (
  <section className="space-y-4">
    {/* Page Header */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-500">
          Manage commission percentages by role and customer type.
        </p>
      </div>

      <CommissionAction />
    </div>

    {/* Table card */}
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <CommissionTable />
    </div>
  </section>
);

  // return (
  //   <div className="space-y-6">
  //     <CommissionTable />
  //     <CommissionAction />
  //   </div>
  // );
}
