"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Link from "next/link";
import { ADMIN_DASHBOARD, FORGOT_PASSWORD, SIGNUP } from "@/app/lib/routes";
import FieldInfo from "./field-info";
import { useRouter } from "next/navigation";

// Email and phone number validation schema
const emailOrPhoneSchema = z.union([
  z.string().email("Invalid email address"), // Validate email
  z.string().nonempty("Phone number is required"),
]);

const formSchema = z.object({
  contact: emailOrPhoneSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
});
export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      contact: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      router.push(ADMIN_DASHBOARD.url);
      // Handle form submission
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
          name="contact"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>
                <label
                  className="block text-sm font-medium"
                  htmlFor={field.name}
                >
                  Email address / Phone number
                </label>
                <input
                  id={field.name}
                  className={`form-input-field`}
                  placeholder="Enter your email address or phone number"
                  name={field.name}
                  value={field.state.value}
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
                  placeholder="Enter your password"
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
      <p className="mt-4 text-primary text-right">
        <Link href={FORGOT_PASSWORD.url}>Forgot Password?</Link>
      </p>
      <button type="submit" className="btn-primary mt-10">
        Login
      </button>

      <p className="mt-3 text-center">
        New here?
        <Link className="text-primary ml-1 font-medium" href={SIGNUP.url}>
          Sign up
        </Link>
      </p>
    </form>
  );
}
