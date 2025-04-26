"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";

import FieldInfo from "../auth/field-info";
import { resetPassword } from "@/app/lib/actions/user";
import { toast } from "react-toastify";
import * as z from "zod";

const Schema = z
  .object({
    email: z.string().email("Invalid email address"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().nonempty("Please confirm your password"),
    resetToken: z.string().nonempty("Token is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function ChangePasswordForm() {
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm({
    defaultValues: {
      resetToken: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      console.log(values);
      try {
        const response = await resetPassword(values.value);
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
        if (!response.result.success) {
          toast.error(response.result.message);
          return;
        }
        toast.success("Password changed successfully");
      } finally {
        setSubmitting(false);
      }
    },
    validators: {
      onChange: Schema,
      onSubmit: Schema,
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
            name="resetToken"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium">Token</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  className={`form-input-field`}
                  onBlur={field.handleBlur}
                  placeholder="Enter the token sent to your email"
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
            name="newPassword"
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
          Change Password
        </button>
      </div>
    </form>
  );
}
