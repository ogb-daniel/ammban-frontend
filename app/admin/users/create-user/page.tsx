import CreateUserForm from "@/app/ui/users/create-user-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create User",
};
export default function CreateUser() {
  return (
    <main>
      <div className="bg-white md:px-10 px-6 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold">Create User</h1>
      </div>
      <div className=" p-6">
        <CreateUserForm />
      </div>
    </main>
  );
}
