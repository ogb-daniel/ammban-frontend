"use client";
import React, { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import styles from "@/app/ui/products/products.module.css";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { banks } from "@/app/lib/static-data";
import { useUserStore } from "@/providers/user-store-provider";
import { withdrawFunds } from "@/app/lib/actions/payment";
import { showSuccessModal } from "@/app/lib/utils/transaction-result";
import { commissionsEarned } from "@/app/lib/actions/dashboard";

export default function WithdrawCommissionForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const { user } = useUserStore((state) => state);
  const [commissionBalance, setCommissionBalance] = React.useState(0);
  useEffect(() => {
    (async () => {
      const response = await commissionsEarned();
      setCommissionBalance(response.result.payload.amount);
    })();
  }, []);
  const form = useForm({
    defaultValues: {
      amount: 0,
      bank: "",
      beneficiaryAccountNumber: "",
      narration: "",
    },
    onSubmit: async (values) => {
      if (values.value.amount > commissionBalance) {
        toast.error("Insufficient commission balance");
        return;
      }
      console.log(values);
      setSubmitting(true);
      try {
        const response = await withdrawFunds({
          ...values.value,
          beneficiaryBankCode: banks.find((b) => b.name === values.value.bank)!
            .code,
          beneficiaryBankName: values.value.bank,
          narration: "Withdrawal",
        });
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
        if (!response.result.requestSuccessful) {
          toast.error(response.result.responseMessage);
          return;
        }
        await showSuccessModal(
          `Success`,
          `Withdraw of ${new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(values.value.amount)} was successful`,
          "Close"
        );
      } catch (error) {
        toast.error((error as Error).message);
        return;
      } finally {
        setSubmitting(false);
      }
      // Handle form submission
      router.replace(`/${user!.role}/commissions`);
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
                  type="text"
                  name={field.name}
                  placeholder="Input your withdrawal amount"
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
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
          Confirm Details
        </button>
      </div>
    </form>
  );
}
