"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Link from "next/link";
import { HOME } from "@/app/lib/routes";
import FieldInfo from "./field-info";
import { generatePasswordResetToken } from "@/app/lib/actions/user";
import { toast } from "react-toastify";

const emailOrPhoneSchema = z.string().email("Invalid email address"); // Validate email
const formSchema = z.object({
  contact: emailOrPhoneSchema,
});
export default function SendForgotPasswordForm({
  setHasSentResetRequest,
}: {
  setHasSentResetRequest: (value: boolean) => void;
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const form = useForm({
    defaultValues: {
      contact: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await generatePasswordResetToken({
          Email: values.value.contact,
        });
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
        setHasSentResetRequest(true);
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
                  Email address
                </label>
                <input
                  id={field.name}
                  className={`form-input-field`}
                  name={field.name}
                  placeholder="Enter your email address"
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

      <button type="submit" className="btn-primary mt-10" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
      <div className="text-center text-primary btn">
        <Link href={HOME.url}>Back to Login</Link>
      </div>
    </form>
  );
}
