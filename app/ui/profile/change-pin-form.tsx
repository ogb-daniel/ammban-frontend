"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";

import FieldInfo from "../auth/field-info";
import { toast } from "react-toastify";
import * as z from "zod";
import CircleLoader from "../circle-loader";
import { setupPin } from "@/app/lib/actions/user";

const Schema = z
  .object({
    newPin: z.string().nonempty("New PIN is required"),
    confirmPin: z.string().nonempty("Please confirm your new PIN"),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  });
export default function ChangePinForm() {
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm({
    defaultValues: {
      newPin: "",
      confirmPin: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await setupPin({
          ...values.value,
        });
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }

        toast.success("Pin setup successfully");
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
            name="newPin"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium">New PIN</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  className={`form-input-field`}
                  onBlur={field.handleBlur}
                  placeholder="Enter your new PIN"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="confirmPin"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium">
                  Confirm New PIN
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  className={`form-input-field`}
                  onBlur={field.handleBlur}
                  placeholder="Confirm your new PIN"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
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
            "Change Pin"
          )}
        </button>
      </div>
    </form>
  );
}
