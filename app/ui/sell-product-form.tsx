"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import styles from "@/app/ui/products/products.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  getAllProductCategories,
  getAllProducts,
} from "@/app/lib/actions/product";
import { toast } from "react-toastify";
import { ProductCategory, Product } from "@/app/lib/definitions";

const SellProductForm = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const [categories, setCategories] = React.useState<ProductCategory[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number>(0);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllProductCategories({});
      if (response.success && response.result.responseCode === 200) {
        setCategories(response.result.payload.items);
      }
    };

    const fetchProducts = async () => {
      const response = await getAllProducts({});
      if (response.success && response.result.responseCode === 200) {
        setProducts(response.result.payload.items);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  React.useEffect(() => {
    if (selectedCategoryId > 0) {
      const filtered = products.filter(
        (product) =>
          product.categoryName ===
          categories.find((c) => c.id === selectedCategoryId)?.name
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategoryId, products, categories]);

  const form = useForm({
    defaultValues: {
      productCategoryId: 0,
      productId: 0,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      setSubmitting(true);
      try {
        // Here you would add the API call to sell the product
        // For now, we'll just show a success message
        toast.success("Product sold successfully!");
        // Reset form
        form.reset();
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to sell product";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="bg-white md:p-6 rounded-3xl"
    >
      <div className="flex flex-col bg-white rounded-3xl">
        <div className="md:w-1/2">
          <form.Field
            name="productCategoryId"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Product Category
                </label>
                <select
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.handleChange(value);
                    setSelectedCategoryId(value);
                  }}
                  className={`${styles.customSelect} mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                >
                  <option className="" value="">
                    Select Product Category
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

        <div className="mt-5 md:w-1/2">
          <form.Field
            name="productId"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Product
                </label>
                <select
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className={`${styles.customSelect} mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  disabled={selectedCategoryId === 0}
                >
                  <option className="" value="">
                    Select Product
                  </option>
                  {filteredProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price}
                    </option>
                  ))}
                </select>
                <p className="text-sm font-medium mt-1">Total Balance: 0</p>
              </>
            )}
          />
        </div>

        <div className="mt-8 space-y-5">
          <p className="font-medium text-center">Customer&apos;s Details</p>

          <div>
            <form.Field
              name="firstName"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    First Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your first name"
                  />
                </>
              )}
            />
          </div>

          <div>
            <form.Field
              name="lastName"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Last Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your last name"
                  />
                </>
              )}
            />
          </div>

          <div>
            <form.Field
              name="phoneNumber"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    country={"ng"}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    inputClass="!w-full !h-auto !p-2 !pl-14 !border !rounded focus:!outline-none focus:!ring-2 focus:!ring-blue-500"
                    containerClass="w-full"
                    buttonClass="!border-r-0 !rounded-l !p-2"
                    dropdownClass="!rounded"
                  />
                </>
              )}
            />
          </div>

          <div>
            <form.Field
              name="dateOfBirth"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Date Of Birth
                  </label>
                  <input
                    id={field.name}
                    type="date"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </>
              )}
            />
          </div>

          <div>
            <form.Field
              name="gender"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Gender
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Select your gender</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
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
            className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white btn-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {submitting ? "Processing..." : "Confirm Details"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SellProductForm;
