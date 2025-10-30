import WithdrawCommissionForm from "@/app/ui/commission/withdraw-commission-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default function WithdrawCommission() {
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
        <h1 className="font-semibold">Withdraw Funds to Bank</h1>
      </div>
      <div className=" p-6">
        <WithdrawCommissionForm />
      </div>
    </main>
  );
}
