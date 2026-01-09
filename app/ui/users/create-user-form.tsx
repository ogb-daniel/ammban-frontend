"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import FieldInfo from "../auth/field-info";
import { SignupFormSchema, States } from "@/app/lib/definitions";
import { createUser, getAllStates } from "@/app/lib/actions/user";
import { toast } from "react-toastify";
import { useUserStore } from "@/providers/user-store-provider";
import CircleLoader from "../circle-loader";

export default function CreateUserForm() {
  const [states, setStates] = React.useState<States[] | null>([]);
  const [submitting, setSubmitting] = React.useState(false);
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

  const form = useForm({
    defaultValues: {
      referralCode: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
      address: "",
      stateId: 0,
      dateOfBirth: "",
      userName: "",
      gender: 0,
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      console.log(values);
      try {
        const response = await createUser({
          ...values.value,
          sureName: values.value.lastName,
          name: values.value.firstName,
        });
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
      } finally {
        setSubmitting(false);
      }
      router.push(`/${user?.role}/user`);
    },
    validators: {
      onChange: SignupFormSchema,
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
      <div
        className="
        flex flex-col bg-white md:p-8 rounded-3xl gap-6
        "
      >
        <div>
          <form.Field
            name="referralCode"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium">
                  Referral Code
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  className={`form-input-field`}
                  onBlur={field.handleBlur}
                  placeholder="Enter your referral code"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
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
                    placeholder="Enter your first name"
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
                    placeholder="Enter your last name"
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
            name="userName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Username
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    className={`form-input-field`}
                    value={field.state.value}
                    placeholder="Enter your username"
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
            name="emailAddress"
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
                    placeholder="Enter your email address"
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
                    placeholder="Enter your house address"
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
                    <option value="">Select your state</option>
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
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  >
                    <option value="">Select your gender</option>
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Other</option>
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
            name="password"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Password
                  </label>
                  <input
                    id={field.name}
                    type="password"
                    name={field.name}
                    value={field.state.value}
                    className={`form-input-field`}
                    placeholder="Create a secure password"
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
            name="confirmPassword"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Confirm Password
                  </label>
                  <input
                    id={field.name}
                    type="password"
                    name={field.name}
                    placeholder="Re-enter your password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`form-input-field`}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary mt-10"
        >
          {submitting ? (
            <>
              <CircleLoader />
            </>
          ) : (
            "Create User"
          )}
        </button>
      </div>
    </form>
  );
}
