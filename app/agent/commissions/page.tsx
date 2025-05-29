import CommissionsView from "@/app/ui/commission/commissions-view";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Commissions() {
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
        <h1 className="font-semibold">Transactions</h1>
      </div>
      <CommissionsView />
    </main>
  );
}
