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
    <div className="px-6 py-6 space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          
          <p className="text-sm text-gray-500">
            Manage your wallet balance, commissions and withdrawals.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Earnings */}
        <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 via-white to-white shadow-sm transition hover:shadow-md">
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/60" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Icon badge */}
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-emerald-600 text-lg">₦</span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Commission Earnings
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
                    {new Intl.NumberFormat().format(user?.commissionEarnings || 0)}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Withdraw earnings into your wallet anytime.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition"
                onClick={async () => {
                  const html = `
              <div class="space-y-3 text-left">
                <label for="amount" class="block text-sm font-medium text-gray-700">
                  Enter amount to withdraw
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  class="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="₦0.00"
                />
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
                        "text-primary bg-white border border-primary !rounded-xl !px-5 !py-2.5 text-sm",
                      confirmButton: "!rounded-xl !px-5 !py-2.5 text-sm",
                      actions: "flex-row gap-3 !mt-8",
                    },
                    width: "420px",
                    showCancelButton: true,
                    confirmButtonText: "Withdraw",
                    showLoaderOnConfirm: true,
                    confirmButtonColor: "#094794",
                    cancelButtonText: "Cancel",
                    buttonsStyling: true,
                    reverseButtons: true,
                    preConfirm: async () => {
                      const amountInput = (document.getElementById("amount") as HTMLInputElement).value;
                      const amount = parseFloat(amountInput);

                      if (isNaN(amount) || amount <= 0) {
                        Swal.showValidationMessage("Please enter a valid amount greater than zero.");
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
                        const earnings = await commissionsEarned();

                        setUser({
                          ...user!,
                          walletBalance: balance?.result?.payload?.availableBalance,
                          commissionEarnings: earnings?.result?.payload?.amount,
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
                Withdraw to Wallet
              </button>
            </div>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-white to-white shadow-sm transition hover:shadow-md">
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400/70 via-emerald-500/70 to-emerald-400/70" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Icon badge */}
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-600 text-lg">₦</span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
                    {new Intl.NumberFormat().format(user?.walletBalance || 0)}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Deposit or withdraw directly to your bank.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                 className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                
                onClick={() => showWalletDetails({ accountDetails: walletDetails })}
              >
                Deposit Funds
              </button>

              {/* Keep existing withdraw-to-bank component */}
              <div className="sm:self-center">
                <WithdrawCommission />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* History */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <WithdrawalHistoryContainer transactions={transactions} />
      </div>
    </div>
  );


  // return (
  //   <div className="p-6">
  //     <div className="flex flex-wrap items-center gap-5 mb-4">
  //       <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6 flex-1">
  //         <h1 className="text-lg font-semibold">Commission Earnings</h1>
  //         <p className="font-medium line-clamp-1">
  //           {new Intl.NumberFormat("en-NG", {
  //             style: "currency",
  //             currency: "NGN",
  //           }).format(user?.commissionEarnings || 0)}
  //         </p>

  //         <button
  //           className="btn-primary mt-4"
  //           onClick={async () => {
  //             // Html including form for amount input and two buttons
  //             const html = `
  //         <div class="space-y-4">
  //           <label for="amount" class="block text-sm font-medium text-gray-700">Enter Amount to Withdraw</label>
  //           <input type="number" id="amount" name="amount" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="₦0.00" />
  //         </div>
  //         `;
  //             await Swal.fire({
  //               html,

  //               allowOutsideClick: true,
  //               allowEscapeKey: true,
  //               customClass: {
  //                 popup: "!rounded-3xl !p-8",
  //                 htmlContainer: "!p-0 !m-0",
  //                 cancelButton:
  //                   "text-primary bg-white border border-primary !rounded-lg !px-6 !py-3",
  //                 confirmButton: "!rounded-lg !px-6 !py-3",
  //                 actions: "flex-row gap-3 !mt-8",
  //               },
  //               width: "400px",
  //               showCancelButton: true,
  //               confirmButtonText: "Withdraw",
  //               showLoaderOnConfirm: true,

  //               confirmButtonColor: "#094794", // Tailwind's blue-600
  //               cancelButtonText: "Cancel",
  //               buttonsStyling: true,
  //               reverseButtons: true,

  //               preConfirm: async () => {
  //                 const amountInput = (
  //                   document.getElementById("amount") as HTMLInputElement
  //                 ).value;
  //                 const amount = parseFloat(amountInput);
  //                 if (isNaN(amount) || amount <= 0) {
  //                   Swal.showValidationMessage(
  //                     "Please enter a valid amount greater than zero."
  //                   );
  //                   return;
  //                 }
  //                 const response = await withdrawCommission({ amount });

  //                 if (response.success) {
  //                   Swal.fire({
  //                     icon: "success",
  //                     title: "Withdrawal Successful",
  //                     text: `₦${amount} has been withdrawn to your wallet.`,
  //                   });
  //                   const balance = await getAccountBalance();
  //                   const commissionEarnings = await commissionsEarned();

  //                   setUser({
  //                     ...user!,
  //                     walletBalance: balance?.result?.payload?.availableBalance,
  //                     commissionEarnings:
  //                       commissionEarnings?.result?.payload?.amount,
  //                   });
  //                 } else {
  //                   Swal.fire({
  //                     icon: "error",
  //                     title: "Withdrawal Failed",
  //                     text: response.error?.message || "An error occurred.",
  //                   });
  //                 }
  //               },
  //             });
  //           }}
  //         >
  //           Withdraw Commissions to Wallet
  //         </button>
  //       </div>
  //       <div className="bg-[#DDEBFD] p-3 px-4 rounded-md mt-6 flex-1">
  //         <h1 className="text-lg font-semibold">Wallet balance</h1>
  //         <p className="font-medium line-clamp-1">
  //           {new Intl.NumberFormat("en-NG", {
  //             style: "currency",
  //             currency: "NGN",
  //           }).format(user?.walletBalance || 0)}
  //         </p>
  //         <WithdrawCommission />
  //         <button
  //           className="btn-primary mt-2"
  //           onClick={() => {
  //             showWalletDetails({
  //               accountDetails: walletDetails,
  //             });
  //           }}
  //         >
  //           Deposit Funds
  //         </button>
  //       </div>
  //     </div>
  //     {/* <div className="mt-4">
  //       <TabSlider tabs={tabs} />
  //     </div> */}
  //     <WithdrawalHistoryContainer transactions={transactions} />
  //   </div>
  // );
}
