import TabSlider from "@/app/ui/tab-slider";
import AllTransactions from "@/app/ui/transactions/all-transactions";
import Income from "@/app/ui/transactions/income";
import Outflow from "@/app/ui/transactions/outflow";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
const tabs = [
  { key: "all", label: "All Transactions", component: <AllTransactions /> },
  { key: "income", label: "Income", component: <Income /> },
  { key: "outflow", label: "Outflow", component: <Outflow /> },
];

export default function Transactions() {
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
        <h1 className="font-semibold">Transactions</h1>
      </div>
      <div className=" p-6">
        <TabSlider tabs={tabs} />
      </div>
    </main>
  );
}
