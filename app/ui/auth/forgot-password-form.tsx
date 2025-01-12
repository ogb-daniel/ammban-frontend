"use client";
import React, { useState } from "react";
import SendForgotPasswordForm from "./send-forgot-password-form";
import ResetPasswordForm from "./reset-password-form";

export default function ForgotPasswordForm() {
  const [hasSentResetRequest, setHasSentResetRequest] = useState(false);
  return (
    <div>
      <p className="font-medium leading-5 text-slate-400 text-center mt-1">
        {!hasSentResetRequest
          ? `Forgot your password? No worries! Enter the email address associated
            with your account, and we'll send you instructions to reset your
            password securely.`
          : "Enter the OTP sent to your mail and set your new secured password"}
      </p>
      {!hasSentResetRequest ? (
        <SendForgotPasswordForm
          setHasSentResetRequest={setHasSentResetRequest}
        />
      ) : (
        <ResetPasswordForm />
      )}
    </div>
  );
}
