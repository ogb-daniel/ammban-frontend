import ForgotPasswordForm from "@/app/ui/auth/forgot-password-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot password",
};
export default function ForgotPassword() {
  return (
    <main className="flex-1 p-6">
      <h1 className="text-primary text-[40px] font-bold text-center">
        Reset Password
      </h1>
      <ForgotPasswordForm />
    </main>
  );
}
