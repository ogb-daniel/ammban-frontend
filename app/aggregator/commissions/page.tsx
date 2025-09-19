import { commissionsEarned } from "@/app/lib/actions/dashboard";
import { getTransactionHistory } from "@/app/lib/actions/payment";
import CommissionsView from "@/app/ui/commission/commissions-view";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Commissions() {
  const transactions = await getTransactionHistory();
  const commissionEarnings = await commissionsEarned();
  if (transactions.error || commissionEarnings.error) {
    throw new Error(
      transactions.error?.message ||
        commissionEarnings.error?.message ||
        "Something went wrong!"
    );
  }
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
        <h1 className="font-semibold">Transactions</h1>
      </div>
      <CommissionsView
        transactions={transactions.result.payload.items || []}
        commissionEarnings={commissionEarnings.result.payload.amount}
      />
    </main>
  );
}
