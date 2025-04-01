import UserStats from "@/app/ui/users/user-stats";
import UsersAction from "@/app/ui/users/users-action";
import UsersTable from "@/app/ui/users/users-table";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Users() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100 hidden md:block">
        <h1 className="font-semibold ">Users</h1>
      </div>
      <div className="p-6 space-y-6">
        <UserStats />
        <div>
          <UsersTable />
          <UsersAction />
        </div>
      </div>
    </main>
  );
}
