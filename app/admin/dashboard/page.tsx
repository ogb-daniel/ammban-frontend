import {
  commissionsEarned,
  getMonthlyReferrals,
  totalSales,
} from "@/app/lib/actions/dashboard";
import AdminDashboard from "@/app/ui/dashboard/admin-dashboard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function Dashboard() {
  const tSales = await totalSales();
  const commissionEarnings = await commissionsEarned();
  const monthlyReferrals = await getMonthlyReferrals();
  return (
    <main>
      <AdminDashboard
        totalSales={tSales?.result?.totalSales || 0}
        totalSalesAmount={tSales?.result?.amount || 0}
        commissionEarnings={commissionEarnings?.result?.payload?.amount || 0}
        monthlyReferrals={monthlyReferrals?.result || []}
      />
    </main>
  );
}
