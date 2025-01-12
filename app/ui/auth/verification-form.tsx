"use client";
import VerificationCodeInput from "@/app/ui/auth/verification-input";
import { useState } from "react";

export default function VerificationForm() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      alert("Please complete the code.");
      return;
    }

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

      <button type="submit" className="btn-primary mt-16">
        Verify Code
      </button>
    </form>
  );
}
