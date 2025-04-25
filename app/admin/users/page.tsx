import { getAllUsers } from "@/app/lib/actions/user";
import UsersContainer from "@/app/ui/users/users-container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
};
export default async function Users() {
  const limit = 100;
  const users = await getAllUsers({ MaxResultCount: limit });

  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100 hidden md:block">
        <h1 className="font-semibold">Users</h1>
      </div>
      <div className="p-6">
        <UsersContainer users={users.result.items} limit={limit} />
      </div>
    </main>
  );
}
