import CreateRoleForm from "@/app/ui/roles/create-role-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function RolesAndPermissions() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">Roles</h1>
      </div>
      <div className=" p-6">
        <CreateRoleForm />
      </div>
    </main>
  );
}
