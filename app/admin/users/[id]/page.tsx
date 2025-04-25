import { notFound } from "next/navigation";
import UserDetails from "@/app/ui/users/user-details";
import { getUser } from "@/app/lib/actions/user";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "View User",
};
export default async function ViewUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const response = await getUser(parseInt((await params).id));

  if (!response.success || !response.result) {
    notFound();
  }

  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">View User</h1>
      </div>
      <div className=" p-6">
        <UserDetails user={response.result} />
      </div>
    </main>
  );
}
