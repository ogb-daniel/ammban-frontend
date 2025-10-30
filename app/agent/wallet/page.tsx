import { commissionsEarned } from "@/app/lib/actions/dashboard";
import { getWalletTransactionHistory } from "@/app/lib/actions/payment";
import CommissionsView from "@/app/ui/commission/commissions-view";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Wallet() {
  const transactions = await getWalletTransactionHistory();
  const commissionEarnings = await commissionsEarned();
  // Handle errors gracefully instead of throwing
  if (transactions.error || commissionEarnings.error) {
    return (
      <main>
        <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
          <h1 className="font-semibold">Transactions</h1>
        </div>
        <div className="p-6 text-center">
          <p className="text-red-500">
            {transactions.error?.message ||
              commissionEarnings.error?.message ||
              "Failed to load commission data"}
          </p>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
        <h1 className="font-semibold">Transactions</h1>
      </div>
      <CommissionsView
        transactions={transactions.result.payload || []}
        commissionEarnings={commissionEarnings.result.payload?.amount}
      />
    </main>
  );
}
