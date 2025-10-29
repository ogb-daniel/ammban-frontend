"use client";
import { commissionsEarned } from "@/app/lib/actions/dashboard";
import {
  getAccountBalance,
  withdrawCommission,
} from "@/app/lib/actions/payment";
import { useUserStore } from "@/providers/user-store-provider";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

export default function WithdrawCommission() {
  const router = useRouter();
  const { user, setUser } = useUserStore((state) => state);
  return (
    <div className="flex max-w-lg mx-auto gap-2 mt-4 flex-col">
      <button
        className="btn-primary"
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
      <button
        className="btn-primary"
        onClick={() => router.push(`/${user?.role}/commissions/withdraw-funds`)}
      >
        Withdraw Funds to Bank
      </button>
    </div>
  );
}
