import AllRoles from "@/app/ui/roles/all-roles";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Roles() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">Roles and Permissions</h1>
      </div>
      <div className=" p-6">
        <AllRoles />
      </div>
    </main>
  );
}
