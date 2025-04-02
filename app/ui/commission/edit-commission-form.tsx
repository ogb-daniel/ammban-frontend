"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { useAdminStore } from "@/providers/admin-store-provider";
import styles from "@/app/ui/products/products.module.css";
import { useRouter } from "next/navigation";
import { Commission } from "@/stores/admin-store";

export default function EditCommissionForm({
  commission,
}: {
  commission: Commission;
}) {
  const { editCommission, categories, roles } = useAdminStore((state) => state);
  const router = useRouter();
  console.log(categories);

  const form = useForm({
    defaultValues: {
      productName: commission.productName,
      description: commission.description,
      role: commission.role,
      percentage: commission.percentage,
      id: commission.id,
    },
    onSubmit: (values) => {
      console.log(values);

      editCommission(commission.id, { ...commission, ...values.value });
      // Handle form submission
      router.back();
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className=" "
    >
      <div className="flex flex-col bg-white p-8 rounded-3xl">
        <div className="md:w-1/2">
          <form.Field
            name="productName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder="Name Of Commission"
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
        <div className="mt-6">
          <form.Field
            name="description"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name={field.name}
                  placeholder="Details about the Commission"
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
        <div className="md:w-1/2 mt-6">
          <form.Field
            name="role"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Commission Role
                </label>
                <select
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`${styles.customSelect} mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                >
                  <option className="" value="">
                    Select your role for this commission
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </>
            )}
          />
        </div>
        <div className="md:w-1/2 mt-6">
          <form.Field
            name="percentage"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Percentage
                </label>
                <select
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className={`${styles.customSelect} mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                >
                  <option className="" value="">
                    Select your percentage for commission role
                  </option>
                  {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map(
                    (percentage) => (
                      <option key={percentage} value={percentage}>
                        {percentage}%
                      </option>
                    )
                  )}
                </select>
              </>
            )}
          />
        </div>
      </div>
      <div className="md:w-1/2 mt-8 mx-auto">
        <button
          type="submit"
          className=" w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Edit Commission
        </button>
      </div>
    </form>
  );
}
