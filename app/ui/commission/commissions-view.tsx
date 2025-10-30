"use client";
import React, { useEffect } from "react";
import WithdrawCommission from "./withdraw-commision";

import { WalletAccountDetails, WithdrawalHistory } from "@/app/lib/definitions";
import { useUserStore } from "@/providers/user-store-provider";
import Swal from "sweetalert2";
import {
  getAccountBalance,
  withdrawCommission,
} from "@/app/lib/actions/payment";
import { commissionsEarned } from "@/app/lib/actions/dashboard";
import WithdrawalHistoryContainer from "../transactions/withdawal-history-container";
import { showWalletDetails } from "@/app/lib/utils/transaction-details";
import { Button } from "@/components/ui/button";
// const tabs = [
//   { key: "all", label: "All Transactions", component: <AllTransactions /> },
//   { key: "income", label: "Income", component: <Income /> },
//   { key: "outflow", label: "Outflow", component: <Outflow /> },
// ];
export default function CommissionsView({
  transactions,
  commissionEarnings,
  walletDetails,
}: {
  transactions: WithdrawalHistory[];
  commissionEarnings: number;
  walletDetails: WalletAccountDetails;
}) {
  const { setUser, user } = useUserStore((state) => state);
  useEffect(() => {
    console.log(
      "Updating commission earnings in user store:",
      commissionEarnings
    );

    setUser({ ...user!, commissionEarnings });
  }, []);
  console.log(user);

  return (
    <div className="p-6">
      <Button
        variant="default"
        className="bg-primary text-white"
        onClick={() => {
          showWalletDetails({
            accountDetails: walletDetails,
          });
        }}
      >
        Deposit to wallet{" "}
      </Button>

      <div className="flex flex-wrap items-center gap-5 mb-4">
        <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6 flex-1">
          <h1 className="text-lg font-semibold">Commission Earnings</h1>
          <p className="font-medium line-clamp-1">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(user?.commissionEarnings || 0)}
          </p>

          <button
            className="btn-primary mt-4"
            onClick={async () => {
              // Html including form for amount input and two buttons
              const html = `
          <div class="space-y-4">
            <label for="amount" class="block text-sm font-medium text-gray-700">Enter Amount to Withdraw</label>
            <input type="number" id="amount" name="amount" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="₦0.00" />
          </div>
          `;
              await Swal.fire({
                html,

                allowOutsideClick: true,
                allowEscapeKey: true,
                customClass: {
                  popup: "!rounded-3xl !p-8",
                  htmlContainer: "!p-0 !m-0",
                  cancelButton:
                    "text-primary bg-white border border-primary !rounded-lg !px-6 !py-3",
                  confirmButton: "!rounded-lg !px-6 !py-3",
                  actions: "flex-row gap-3 !mt-8",
                },
                width: "400px",
                showCancelButton: true,
                confirmButtonText: "Withdraw",
                showLoaderOnConfirm: true,

                confirmButtonColor: "#094794", // Tailwind's blue-600
                cancelButtonText: "Cancel",
                buttonsStyling: true,
                reverseButtons: true,

                preConfirm: async () => {
                  const amountInput = (
                    document.getElementById("amount") as HTMLInputElement
                  ).value;
                  const amount = parseFloat(amountInput);
                  if (isNaN(amount) || amount <= 0) {
                    Swal.showValidationMessage(
                      "Please enter a valid amount greater than zero."
                    );
                    return;
                  }
                  const response = await withdrawCommission({ amount });

                  if (response.success) {
                    Swal.fire({
                      icon: "success",
                      title: "Withdrawal Successful",
                      text: `₦${amount} has been withdrawn to your wallet.`,
                    });
                    const balance = await getAccountBalance();
                    const commissionEarnings = await commissionsEarned();

                    setUser({
                      ...user!,
                      walletBalance: balance?.result?.payload?.availableBalance,
                      commissionEarnings:
                        commissionEarnings?.result?.payload?.amount,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Withdrawal Failed",
                      text: response.error?.message || "An error occurred.",
                    });
                  }
                },
              });
            }}
          >
            Withdraw Commissions to Wallet
          </button>
        </div>
        <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6 flex-1">
          <h1 className="text-lg font-semibold">Wallet balance</h1>
          <p className="font-medium line-clamp-1">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(user?.walletBalance || 0)}
          </p>
          <WithdrawCommission />
        </div>
      </div>
      {/* <div className="mt-4">
        <TabSlider tabs={tabs} />
      </div> */}
      <WithdrawalHistoryContainer transactions={transactions} />
    </div>
  );
}
