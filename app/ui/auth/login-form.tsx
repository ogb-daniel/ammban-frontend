"use client";
import React, { useActionState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import {
  ADMIN_DASHBOARD,
  AGENT_DASHBOARD,
  FORGOT_PASSWORD,
  SIGNUP,
} from "@/app/lib/routes";
import FieldInfo from "./field-info";
import { SignInSchema } from "@/app/lib/definitions";
import { toast } from "react-toastify";
import { login } from "@/app/actions/auth";
import { useUserStore } from "@/providers/user-store-provider";
import { useLoading } from "@/app/providers/loading-provider";
import CircleLoader from "../circle-loader";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const { setUser } = useUserStore((state) => state);
  const { showLoader, hideLoader } = useLoading();
  const form = useForm({
    defaultValues: {
      userNameOrEmailAddress: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // router.push(ADMIN_DASHBOARD.url);
      // Handle form submission
    },
    validators: {
      onChange: SignInSchema,
    },
  });
  useEffect(() => {
    if (state?.error) {
      if (state.details) {
        toast(state.details, { type: "error", position: "bottom-right" });
      } else {
        toast(state.error, { type: "error", position: "bottom-right" });
      }
    } else if (state?.success) {
      setUser(state.user);
      showLoader(); // Show progress bar before navigation
      const redirectUrl =
        state.role === "admin" ? ADMIN_DASHBOARD.url : AGENT_DASHBOARD.url;
      if (typeof window !== "undefined") {
        window.location.href = redirectUrl;
      }
    }
  }, [state]);

  useEffect(() => {
    return () => {
      hideLoader(); // Cleanup
    };
  }, []);

  const handleAction = async (formData: FormData) => {
    Object.entries(form.state.values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    return action(formData);
  };

  return (
    <form action={handleAction} className="max-w-lg mx-auto space-y-4 mt-9">
      <div>
        {/* A type-safe field component*/}
        <form.Field
          name="userNameOrEmailAddress"
          // eslint-disable-next-line react/no-children-prop
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>
                <label
                  className="block text-sm font-medium"
                  htmlFor={field.name}
                >
                  Email address / Username
                </label>
                <input
                  id={field.name}
                  className={`form-input-field`}
                  placeholder="Enter your email address or username"
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
      <button type="submit" className="btn-primary mt-10" disabled={pending}>
        {pending ? (
          <>
            <CircleLoader />
          </>
        ) : (
          "Login"
        )}
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
