"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import styles from "@/app/ui/products/products.module.css";
import { useRouter } from "next/navigation";
import { getAllRoles } from "@/app/lib/actions/role";
import { Role } from "@/app/lib/definitions";
import { toast } from "react-toastify";
import { setupCommissionPercentage } from "@/app/lib/actions/commission";
import { useUserStore } from "@/providers/user-store-provider";
import CircleLoader from "../circle-loader";

export default function CreateCommissionForm() {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [submitting, setSubmitting] = React.useState(false);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getAllRoles();
        if (response?.success && response?.result) {
          setRoles(response?.result?.items || []);
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
      roleId: 0,
      percentage: 0,
      customerType: 0,
    },
    onSubmit: async (values) => {
      console.log(values);
      setSubmitting(true);
      try {
        const response = await setupCommissionPercentage({
          ...values.value,
          
          roleName:
            roles.find((role) => role.id === values.value.roleId)?.name || "",
        });
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
      } finally {
        setSubmitting(false);
      }
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
            Create Commission
          </h2>
          <p className="text-sm text-gray-600">
            All commissions percentage must sum up to 100% before you can
            successfully create a commission
          </p>
        </div>

        {/* Form Fields - Side by side layout */}
        <div className="flex flex-col gap-6">
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
                  <input
                    type="number"
                    name={field.name}
                    placeholder="Commission Percentage"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseFloat(e.target.value))
                    }
                    className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </>
              )}
            />
          </div>
          {/* Customer type */}
          <div className="flex-1">
            <form.Field
              name="customerType"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Type
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
                      Select your customer type for commission role
                    </option>
                    <option value={1}>First Time Customer</option>
                    <option value={2}>Returning Same Agent</option>
                    <option value={3}>Returning Different Agent</option>
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
          disabled={submitting}
          className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {submitting ? (
            <>
              <CircleLoader />
            </>
          ) : (
            "Create Commission"
          )}
        </button>
      </div>
    </form>
  );
}
