"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/providers/admin-store-provider";
import UserStats from "./user-stats";
import UsersTable from "./users-table";
import UsersAction from "./users-action";
import { User } from "@/app/lib/definitions";
import { getAllUsers } from "@/app/lib/actions/user";
import { HiUsers } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";

export default function UsersContainer({
  users,
  limit,
  totalUsers,
  totalActiveUsers,
  totalInactiveUsers,
  hasStats = false,
}: {
  users: User[];
  limit: number;
  totalUsers?: number;
  totalActiveUsers?: number;
  totalInactiveUsers?: number;
  hasStats?: boolean;
}) {
  const [skip, setSkip] = useState(100);
  const { initializeUsers, users: storeUsers } = useAdminStore(
    (state) => state
  );

  useEffect(() => {
    initializeUsers(users);
  }, [initializeUsers, users]);

  useEffect(() => {
    console.log(skip);
    if (skip > storeUsers?.length || skip < storeUsers?.length) return;
    getAllUsers({ MaxResultCount: limit, SkipCount: skip }).then((res) => {
      if (res?.success) initializeUsers([...storeUsers, ...res?.result?.items]);
      setSkip(skip + limit);
    });
  }, [initializeUsers, limit, skip, storeUsers]);

  return (
    <div className="space-y-6">
      {hasStats && (
        <UserStats
          userStats={[
            {
              title: "Total Users",
              count: totalUsers!,
              baseColor: "#094794",
              icon: HiUsers,
            },
            {
              title: "Active Users",
              count: totalActiveUsers!,
              baseColor: "#fdb52a",
              icon: FaUser,
            },
            {
              title: "Inactive Users",
              count: totalInactiveUsers!,
              baseColor: "#05c168",
              icon: IoHeart,
            },
          ]}
        />
      )}
      <div>
        <UsersTable users={storeUsers} />
        <UsersAction />
      </div>
    </div>
  );
}
