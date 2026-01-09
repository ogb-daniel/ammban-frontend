"use client";
import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import FieldInfo from "../auth/field-info";
import { Product, States } from "@/app/lib/definitions";
import { getAllStates } from "@/app/lib/actions/user";
import { toast } from "react-toastify";
import { useUserStore } from "@/providers/user-store-provider";
import { showAXATransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";
import {
  getAccountBalance,
  syncTransaction,
  checkForExistingCustomer,
} from "@/app/lib/actions/payment";
import {
  showAXAFailureModal,
  showAXASuccessModal,
} from "@/app/lib/utils/transaction-result";
import { showAXATransactionDetails } from "@/app/lib/utils/transaction-details";
import CircleLoader from "../circle-loader";

export default function PurchaseProductForm({ product }: { product: Product }) {
  const [states, setStates] = React.useState<States[] | null>([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [searchEmail, setSearchEmail] = React.useState("");
  const [, setExisting] = useState(true);
  const [searching, setSearching] = React.useState(false);
  const { setUser } = useUserStore((state) => state);
  React.useEffect(() => {
    (async () => {
      const response = await getAllStates();
      if (response.success) {
        setStates(response.result);
      }
    })();
  }, []);
  const router = useRouter();
  const { user } = useUserStore((state) => state);

  const handleSearchCustomer = async () => {
    if (!searchEmail || !searchEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSearching(true);
    try {
      const response = await checkForExistingCustomer(searchEmail);

      if (response.success && response.result.responseCode === 200) {
        const customer = response.result.payload;

        // Populate form fields with customer data if it exists
        if (customer.firstName) {
          form.setFieldValue("firstName", customer.firstName);
        }
        if (customer.lastName) {
          form.setFieldValue("lastName", customer.lastName);
        }
        if (customer.phoneNumber) {
          form.setFieldValue("phoneNumber", customer.phoneNumber);
        }
        if (customer.email) {
          form.setFieldValue("email", customer.email);
        }
        if (customer.address) {
          form.setFieldValue("address", customer.address);
        }
        if (customer.state) {
          form.setFieldValue(
            "stateId",
            states?.find((state) => state.stateName === customer.state)?.id || 0
          );
        }
        if (customer.dateOfBirth) {
          form.setFieldValue("dateOfBirth", customer.dateOfBirth);
        }
        if (customer.gender) {
          form.setFieldValue("gender", customer.gender);
        }
        setExisting(true);
        // toast.success("Customer found! Form populated with existing data.");
      } else {
        setExisting(false);
        toast.info("Customer not found. Please fill in the form manually.");
      }
    } catch (error) {
      console.error("Error searching for customer:", error);
      toast.error("Error searching for customer. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      stateId: 0,
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      console.log(values);
      // Validate form fields
      if (
        !values.value.firstName ||
        !values.value.lastName ||
        !values.value.phoneNumber ||
        !values.value.email ||
        !values.value.address ||
        !values.value.stateId ||
        !values.value.dateOfBirth ||
        !values.value.gender
      ) {
        toast.error("Please fill in all required fields.");
        setSubmitting(false);
        return;
      }
      try {
        const result = await showAXATransactionConfirmation(
          `₦${product.price}`, // cost (formatted)
          "", // fee
          user?.fullName || "", // seller
          "", // buyer
          "", // reference
          async () => {
            return await syncTransaction({
              narration: `Purchase of ${product.name}`,
              amount: product.price,
              isTrial: false,
              productId: product.id,
              ...values.value,
            });
          }
        );
        console.log(result);
        if (result.isConfirmed) {
          if (result.value?.success && result.value?.result.status) {
            const balance = await getAccountBalance();
            setUser({
              ...user!,
              walletBalance: balance?.result?.payload?.availableBalance,
            });
            await showAXASuccessModal(
              async () => {
                await showAXATransactionDetails(
                  `₦${product.price}`, // cost (formatted)
                  "", // fee
                  user?.fullName || "", // seller
                  "", // buyer
                  "" // reference
                ).then(() => {
                  router.back();
                });
              },
              async () => {
                router.back();
              }
            );
          } else {
            await showAXAFailureModal(
              async () => {
                console.log("Retrying transaction");
              },
              async () => {
                console.log("Opening support contact form");
              }
            );
          }
        }
      } catch (error) {
        toast.error("An error occurred while processing customer's request.");
        console.error("Error during transaction:", error);
        return;
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
    >
      <h1 className="text-2xl font-semibold mb-4">Purchase {product.name}</h1>
      <p className="text-gray-600 mb-4">
        Please fill in the customer details below to purchase this product.
      </p>

      {/* Customer Search Section */}
      <div className="bg-white md:p-6 p-4 rounded-3xl mb-6 border-2 border-gray-100">
        <h2 className="text-lg font-semibold mb-3">
          Search for Existing Customer
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter customer&apos;s email to check if they already exist in the
          system
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Enter customer's email address"
            className="form-input-field flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchCustomer();
              }
            }}
          />
          <button
            type="button"
            onClick={handleSearchCustomer}
            disabled={searching}
            className="btn-primary px-6 whitespace-nowrap flex-1"
          >
            {searching ? <CircleLoader /> : "Search Customer"}
          </button>
        </div>
      </div>
      {/* {!existing && ( */}
      <div
        className="
        grid sm:grid-cols-2 grid-cols-1 bg-white md:p-8 rounded-3xl gap-6
        "
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="firstName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
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
                    className={`form-input-field`}
                    onBlur={field.handleBlur}
                    placeholder="Enter customer's first name"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="lastName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
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
                    className={`form-input-field`}
                    value={field.state.value}
                    placeholder="Enter customer's last name"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>

        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="phoneNumber"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
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
                    onChange={(phone) => field.handleChange(phone)}
                    inputClass="!w-full !h-auto !p-2 !pl-14 !border !rounded focus:!outline-none focus:!ring-2 focus:!ring-blue-500"
                    containerClass="w-full"
                    buttonClass="!border-r-0 !rounded-l !p-2"
                    dropdownClass="!rounded"
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="email"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Email Address
                  </label>
                  <input
                    id={field.name}
                    className={`form-input-field`}
                    name={field.name}
                    value={field.state.value}
                    type="email"
                    placeholder="Enter customer's email address"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="address"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Address
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    className={`form-input-field`}
                    placeholder="Enter customer's house address"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="stateId"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    State
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className={`form-input-field`}
                  >
                    <option value="">{`Select customer's state`}</option>
                    {states?.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.stateName}
                      </option>
                    ))}
                  </select>

                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>

        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="dateOfBirth"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
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
                    className={`form-input-field`}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="gender"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
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
                    className={`form-input-field`}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value="">{`Select customer's gender`}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
      </div>
      {/* )} */}

      <button type="submit" disabled={submitting} className="btn-primary mt-10">
        {submitting ? <CircleLoader /> : "Purchase Product"}
      </button>
    </form>
  );
}
