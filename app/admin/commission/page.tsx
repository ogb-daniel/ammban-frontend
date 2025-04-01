import CommissionTable from "@/app/ui/commission/commision-table";
import CommissionAction from "@/app/ui/commission/commission-action";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Commission() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
        <h1 className="font-semibold ">Commission</h1>
      </div>
      <div className=" p-6">
        <CommissionTable />
        <CommissionAction />
      </div>
    </main>
  );
}
