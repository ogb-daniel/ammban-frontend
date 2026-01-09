import EditRoleForm from "@/app/ui/roles/edit-role-form";
import { notFound } from "next/navigation";
import { getRole } from "@/app/lib/actions/role";
// export const metadata: Metadata = {
//   title: "Dashboard",
// };
export default async function ViewRole({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const response = await getRole(parseInt((await params).id));
  if (!response.success || !response.result) {
    notFound();
  }
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">View Role</h1>
      </div>
      <div className=" p-6">
        <EditRoleForm role={response.result} />
      </div>
    </main>
  );
}
