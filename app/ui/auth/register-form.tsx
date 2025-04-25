"use client";
import React, { useActionState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { MdOutlineLock } from "react-icons/md";
import { HOME } from "@/app/lib/routes";
import FieldInfo from "./field-info";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { signup } from "@/app/lib/actions/auth";
import { SignupFormSchema, States } from "@/app/lib/definitions";
import { toast } from "react-toastify";
import { getAllStates } from "@/app/lib/actions/user";

export default function RegistrationForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [states, setStates] = React.useState<States[] | null>([]);
  React.useEffect(() => {
    (async () => {
      const response = await getAllStates();
      if (response.success) {
        setStates(response.result);
      }
    })();
  }, []);
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
    onSubmit: (values) => {
      console.log(values);

      // Handle form submission
    },
    validators: {
      onChange: SignupFormSchema,
    },
  });

  useEffect(() => {
    if (state?.error) {
      toast(state.error, { type: "error", position: "bottom-right" });
    }
  }, [state]);
  const handleAction = async (formData: FormData) => {
    Object.entries(form.state.values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    return action(formData);
  };

  return (
    <form action={handleAction} className="max-w-lg mx-auto  space-y-4 mt-9">
      <div>
        <form.Field
          name="referralCode"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => (
            <>
              <label className="block text-sm font-medium">Referral Code</label>
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

      <button className="btn-primary mt-10" disabled={pending}>
        Create Account
      </button>
      <p className="mt-3 text-center">
        Alredy have an account?
        <Link className="text-primary ml-1 font-medium" href={HOME.url}>
          Sign in
        </Link>
      </p>
      <p className="mt-6 text-[10px] flex items-center gap-1 justify-center">
        <MdOutlineLock className="text-blue-500" />
        Your information is safe with us
      </p>
    </form>
  );
}
