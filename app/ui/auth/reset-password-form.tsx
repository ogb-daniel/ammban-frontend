"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HOME } from "@/app/lib/routes";
import FieldInfo from "./field-info";
import { resetPassword } from "@/app/lib/actions/user";
import { toast } from "react-toastify";

const emailOrPhoneSchema = z.string().email("Invalid email address"); // Validate email
const formSchema = z
  .object({
    email: emailOrPhoneSchema,
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    resetToken: z.string().nonempty("Token is required"),

    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function ResetPasswordForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      resetToken: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
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
        router.push(HOME.url);
      } finally {
        setSubmitting(false);
      }
    },
    validators: {
      onChange: formSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="max-w-lg mx-auto space-y-4 mt-9"
    >
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
                  Email address
                </label>
                <input
                  id={field.name}
                  className={`form-input-field`}
                  name={field.name}
                  value={field.state.value}
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
                  onBlur={field.handleBlur}
                  placeholder="Create a secure password"
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
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder="Re-enter your password"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`form-input-field`}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>

      <button type="submit" className="btn-primary mt-10" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
      <div className=" text-center text-primary btn">
        <Link href={HOME.url}>Back to Login</Link>
      </div>
    </form>
  );
}
