"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import styles from "@/app/ui/products/products.module.css";
import { useRouter } from "next/navigation";
import { getAllRoles } from "@/app/lib/actions/role";
import { CommissionPercentage, Role } from "@/app/lib/definitions";
import { toast } from "react-toastify";
import { useUserStore } from "@/providers/user-store-provider";

export default function EditCommissionForm({
  commission,
}: {
  commission: CommissionPercentage;
}) {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getAllRoles();
        if (response.success && response.result) {
          setRoles(response.result.items || []);
        } else {
          toast.error("Failed to fetch roles");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Error fetching roles");
      } finally {
      }
    };

    fetchRoles();
  }, []);

  const form = useForm({
    defaultValues: {
      roleId: commission.roleName || 0,
      percentage: commission.percentage?.toString() || 0,
    },
    onSubmit: (values) => {
      console.log(values);

      // Handle form submission
      router.replace(`/${user?.role}/commissions`);
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
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Edit Commission
          </h2>
          <p className="text-sm text-gray-600">
            All commissions percentage must sum up to 100% before you can
            successfully create a commission
          </p>
        </div>

        {/* Form Fields - Side by side layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Role Field */}
          <div className="flex-1">
            <form.Field
              name="roleId"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseInt(e.target.value))
                    }
                    className={`${styles.customSelect} block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  >
                    <option value="">
                      Select your role for this Commission
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.displayName || role.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div>

          {/* Percentage Field */}
          <div className="flex-1">
            <form.Field
              name="percentage"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Percentage
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseInt(e.target.value))
                    }
                    className={`${styles.customSelect} block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  >
                    <option value="">
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
      </div>

      {/* Submit Button */}
      <div className="md:w-1/2 mt-8 mx-auto">
        <button
          type="submit"
          className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Edit Commission
        </button>
      </div>
    </form>
  );
}
