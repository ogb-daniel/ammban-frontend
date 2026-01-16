"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import styles from "@/app/ui/products/products.module.css";
import { useRouter } from "next/navigation";
import { Product, ProductCategory } from "@/app/lib/definitions";
import {
  getAllProductCategories,
  updateProduct,
} from "@/app/lib/actions/product";
import { toast } from "react-toastify";
import { useAdminStore } from "@/providers/admin-store-provider";
import { useUserStore } from "@/providers/user-store-provider";
import CircleLoader from "../circle-loader";

export default function EditProductForm({ product }: { product: Product }) {
  const { editProduct: updateProductFromStore } = useAdminStore(
    (state) => state
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [categories, setCategories] = React.useState<ProductCategory[]>([]);
  React.useEffect(() => {
    (async () => {
      const response = await getAllProductCategories({});
      if (response.success) {
        setCategories(response.result.payload.items || []);
      }
    })();
  }, []);
  const router = useRouter();
  const { user } = useUserStore((state) => state);

  const form = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      categoryId: 0,
      price: product.price,
      quantity: product.quantity,
      id: product.id,
    },
    onSubmit: async (values) => {
      setSubmitting(true);
       console.log(values);
      try {
        const response = await updateProduct(product.id, values.value);
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
        if (response.result.responseCode !== 200) {
          toast.error(response.result.message);
          return;
        }
        updateProductFromStore(product.id, response.result.payload);
      } finally {
        setSubmitting(false);
      }
      // Handle form submission
      router.replace(`/${user?.role}/products`);
    },
  });

  React.useEffect(() => {
    if (categories?.length > 0) {
      const categoryId =
        categories.find((category) => category.name === product.categoryName)
          ?.id || 0;
      form.setFieldValue("categoryId", categoryId);
    }
  }, [categories, form, product.categoryName]);
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
            name="categoryId"
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
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className={`${styles.customSelect} mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                >
                  <option className="" value="">
                    Select your Product’s Category{" "}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
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
            name="price"
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
        <div className="mt-6 md:w-1/2 ">
          <form.Field
            name="quantity"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name={field.name}
                  placeholder="Quantity"
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
          disabled={submitting}
          className=" w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white btn-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {submitting ? (
            <>
              <CircleLoader />
            </>
          ) : (
            "Edit Product"
          )}
        </button>
      </div>
    </form>
  );
}
