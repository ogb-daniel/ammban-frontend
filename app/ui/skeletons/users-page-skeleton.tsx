import UserStatsSkeleton from "./user-stats-skeleton";
import UsersTableSkeleton from "./users-table-skeleton";

export default function UsersPageSkeleton() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100 hidden md:block">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="p-6 space-y-6">
        <UserStatsSkeleton />
        <div>
          <UsersTableSkeleton />
          <div className="mt-4 flex justify-end animate-pulse">
            <div className="h-9 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}