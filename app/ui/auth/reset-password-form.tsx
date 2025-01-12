"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Link from "next/link";
import { HOME } from "@/app/lib/routes";
import FieldInfo from "./field-info";

// Email and phone number validation schema
const emailOrPhoneSchema = z.union([
  z.string().email("Invalid email address"), // Validate email
  z.string().regex(/^\d{10,12}$/, "Invalid phone number"), // Validate phone number (10 digits)
]);
const formSchema = z
  .object({
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
    otp: z.string().nonempty("OTP is required"),

    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function ResetPasswordForm() {
  const form = useForm({
    defaultValues: {
      contact: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
                  name={field.name}
                  value={field.state.value}
                  placeholder="Enter your email address or phone number"
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
          name="otp"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => (
            <>
              <label className="block text-sm font-medium">OTP</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                className={`form-input-field`}
                onBlur={field.handleBlur}
                placeholder="Enter the OTP sent to your number"
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

      <button type="submit" className="btn-primary mt-10">
        Submit
      </button>
      <div className=" text-center text-primary btn">
        <Link href={HOME.url}>Back to Login</Link>
      </div>
    </form>
  );
}
