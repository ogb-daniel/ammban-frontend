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
const formSchema = z.object({
  contact: emailOrPhoneSchema,
});
export default function SendForgotPasswordForm({
  setHasSentResetRequest,
}: {
  setHasSentResetRequest: (value: boolean) => void;
}) {
  const form = useForm({
    defaultValues: {
      contact: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setHasSentResetRequest(true);
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
                  placeholder="Enter your email address or phone number"
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

      <button type="submit" className="btn-primary mt-10">
        Submit
      </button>
      <div className="text-center text-primary btn">
        <Link href={HOME.url}>Back to Login</Link>
      </div>
    </form>
  );
}
