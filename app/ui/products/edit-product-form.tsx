"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { useAdminStore } from "@/providers/admin-store-provider";
import styles from "@/app/ui/products/products.module.css";
import { useRouter } from "next/navigation";
import { Product } from "@/stores/admin-store";

export default function EditProductForm({ product }: { product: Product }) {
  const { categories, editProduct } = useAdminStore((state) => state);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      id: product.id,
    },
    onSubmit: (values) => {
      console.log(values);
      editProduct(product.id, { ...product, ...values.value });
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
                  Product Description
                </label>
                <textarea
                  name={field.name}
                  placeholder="Details about the product"
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
            name="category"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Category
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
                    Select your Product’s Category{" "}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          />
        </div>
        <div className="mt-6 md:w-1/2 ">
          <form.Field
            name="price.amount"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name={field.name}
                  placeholder="Input your price"
                  id={field.name}
                  min={0}
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
      <div className="md:w-1/2 mt-8 mx-auto">
        <button
          type="submit"
          className=" w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white btn-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Edit Product
        </button>
      </div>
    </form>
  );
}
