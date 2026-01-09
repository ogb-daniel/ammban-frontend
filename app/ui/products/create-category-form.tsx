"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { createProductCategory } from "@/app/lib/actions/product";
import { toast } from "react-toastify";
import styles from "./products.module.css";
import { industryList } from "@/app/lib/static-data";
import { useUserStore } from "@/providers/user-store-provider";
import CircleLoader from "../circle-loader";

export default function CreateCategoryForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const { user } = useUserStore((state) => state);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      industry: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      setSubmitting(true);
      try {
        const response = await createProductCategory(values.value);
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
        if (response.result.responseCode !== 200) {
          toast.error(response.result.message);
          return;
        }
      } finally {
        setSubmitting(false);
      }
      // Handle form submission
      router.replace(`/${user?.role}/products`);
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
            name="name"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder="Name Of Category"
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
                  placeholder="Details about the Category"
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
            name="industry"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Industry
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
                    Select your Industry
                  </option>
                  {industryList.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </>
            )}
          />
        </div>
      </div>
      <div className="md:w-1/2 mt-8 mx-auto">
        <button
          type="submit"
          disabled={submitting}
          className=" w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {submitting ? (
            <>
              <CircleLoader />
            </>
          ) : (
            "Create Category"
          )}
        </button>
      </div>
    </form>
  );
}
