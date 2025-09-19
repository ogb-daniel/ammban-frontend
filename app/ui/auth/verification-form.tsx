"use client";
import { verifyEmail } from "@/app/lib/actions/auth";
import { HOME } from "@/app/lib/routes";
import VerificationCodeInput from "@/app/ui/auth/verification-input";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function VerificationForm() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode?.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);
    verifyEmail({ code: verificationCode }).then((response) => {
      setLoading(false);
      if (response.success) {
        toast.success("Email verified successfully!");
        redirect(HOME.url);
      }
    });

    console.log("Verification code submitted:", verificationCode);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-16">
      <VerificationCodeInput code={code} length={6} onChange={handleChange} />

      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-primary underline">
            Sign in
          </a>
        </p>
      </div>

      <button type="submit" className="btn-primary mt-16" disabled={loading}>
        {loading ? "Verifying..." : "Verify Code"}
      </button>
    </form>
  );
}
