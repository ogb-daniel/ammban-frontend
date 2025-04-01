import CreateCommissionForm from "@/app/ui/commission/create-commission-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function CreateCommission() {
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold">Create Commission</h1>
      </div>
      <div className=" p-6">
        <CreateCommissionForm />
      </div>
    </main>
  );
}
