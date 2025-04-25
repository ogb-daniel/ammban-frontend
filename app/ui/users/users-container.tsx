"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/providers/admin-store-provider";
import UserStats from "./user-stats";
import UsersTable from "./users-table";
import UsersAction from "./users-action";
import { User } from "@/app/lib/definitions";
import { getAllUsers } from "@/app/lib/actions/user";

export default function UsersContainer({
  users,
  limit,
}: {
  users: User[];
  limit: number;
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
    if (skip > storeUsers.length || skip < storeUsers.length) return;
    getAllUsers({ MaxResultCount: limit, SkipCount: skip }).then((res) => {
      initializeUsers([...storeUsers, ...res.result.items]);
      setSkip(skip + limit);
    });
  }, [initializeUsers, limit, skip, storeUsers]);

  return (
    <div className="space-y-6">
      <UserStats />
      <div>
        <UsersTable users={storeUsers} />
        <UsersAction />
      </div>
    </div>
  );
}
