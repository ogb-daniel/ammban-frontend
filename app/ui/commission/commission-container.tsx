"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/providers/admin-store-provider";

import { Commission } from "@/app/lib/definitions";
import CommissionTable from "./commision-table";
import CommissionAction from "./commission-action";
import { getAllCommissions } from "@/app/lib/actions/commission";

export default function CommissionContainer({
  commissions,
  limit,
}: {
  commissions: Commission[];
  limit: number;
}) {
  const [skip, setSkip] = useState(100);
  const { initializeCommissions, commissions: storeCommissions } =
    useAdminStore((state) => state);

  useEffect(() => {
    initializeCommissions(commissions);
  }, [initializeCommissions, commissions]);

  useEffect(() => {
    console.log(skip);
    if (skip > storeCommissions.length || skip < storeCommissions.length)
      return;
    getAllCommissions({ MaxResultCount: limit, SkipCount: skip }).then(
      (res) => {
        console.log(res);
        if (res.success)
          initializeCommissions([
            ...storeCommissions,
            ...res.result.payload.items,
          ]);
        setSkip(skip + limit);
      }
    );
  }, [initializeCommissions, limit, skip, storeCommissions]);

  return (
    <div className="space-y-6">
      <CommissionTable />
      <CommissionAction />
    </div>
  );
}
