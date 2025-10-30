"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import styles from "@/app/ui/products/products.module.css";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { banks } from "@/app/lib/static-data";
import { useUserStore } from "@/providers/user-store-provider";
import { getAccountBalance, withdrawFunds } from "@/app/lib/actions/payment";
import { showSuccessModal } from "@/app/lib/utils/transaction-result";
import CircleLoader from "../circle-loader";
import Swal from "sweetalert2";
import { verifyPin } from "@/app/lib/actions/user";

export default function WithdrawCommissionForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const { user, setUser } = useUserStore((state) => state);

  const form = useForm({
    defaultValues: {
      amount: 0,
      bank: "",
      beneficiaryAccountNumber: "",
      narration: "",
    },
    onSubmit: async (values) => {
      if (
        !values.value.bank ||
        !values.value.amount ||
        !values.value.beneficiaryAccountNumber
      ) {
        return;
      }
      if (values.value.amount > (user?.walletBalance || 0)) {
        toast.error("Insufficient wallet balance");
        return;
      }
      console.log(values);
      setSubmitting(true);
      try {
        const html = `
                  <div class="space-y-4">
                    <label for="pin" class="block text-sm font-medium text-gray-700">Enter Pin</label>
                    <input type="password" id="pin" name="pin" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Pin" />
                  </div>
                  `;
        const result = await Swal.fire({
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
            const pin = (
              document.getElementById("pin") as HTMLInputElement
            ).value.trim();
            const res = await verifyPin({ pin });
            if (res.success) {
              return pin;
            } else {
              return "wrong";
            }
          },
        });
        if (!result.isConfirmed) {
          return;
        }
        if (!result.value) {
          return toast.error("Input your pin");
        }
        if (result.value === "wrong") {
          return toast.error("Incorrect pin");
        }
        const response = await withdrawFunds({
          ...values.value,
          beneficiaryBankCode: banks.find((b) => b.name === values.value.bank)!
            .code,
          beneficiaryBankName: values.value.bank,
          narration: "Withdrawal",
          securityPin: result.value,
        });
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
        if (!response.result.requestSuccessful) {
          toast.error(response.result.responseMessage);
          return;
        }
        const balance = await getAccountBalance();
        setUser({
          ...user!,
          walletBalance: balance?.result?.payload?.availableBalance,
        });
        await showSuccessModal(
          `Success`,
          `Withdraw of ${new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(values.value.amount)} was successful`,
          "Close"
        ).then(() => {
          router.replace(`/${user!.role}/wallet`);
        });
      } catch (error) {
        toast.error((error as Error).message);
        return;
      } finally {
        setSubmitting(false);
      }
      // Handle form submission
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className=""
    >
      <div className="flex flex-col bg-white p-8 rounded-3xl">
        {/* Form Fields - Side by side layout */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <form.Field
              name="bank"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Bank
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`${styles.customSelect} block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  >
                    <option value="">Select your Bank</option>
                    {banks.map((bank) => (
                      <option key={bank.name} value={bank.name}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div>

          <div className="flex-1">
            <form.Field
              name="beneficiaryAccountNumber"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    Account number
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    placeholder="Input account number"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </>
              )}
            />
          </div>
        </div>
        <div className="mt-4">
          <form.Field
            name="amount"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Withdrawal amount
                </label>
                <input
                  type="number"
                  name={field.name}
                  placeholder="Input your withdrawal amount"
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    if (
                      e.target.value.charAt(0) === "0" &&
                      e.target.value.length > 1
                    ) {
                      e.target.value = e.target.value.substring(1);
                    }
                    field.handleChange(Number(e.target.value));
                  }}
                  className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </>
            )}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="md:w-1/2 mt-8 mx-auto">
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {submitting ? (
            <>
              <CircleLoader />
            </>
          ) : (
            "Confirm Details"
          )}
        </button>
      </div>
    </form>
  );
}
