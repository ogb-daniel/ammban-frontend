import VerificationForm from "@/app/ui/auth/verification-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Verify account",
};
export default function VerifyAccount() {
  return (
    <main className=" p-6">
      <h1 className="text-primary text-[40px] font-bold text-center">
        Verify Account{" "}
      </h1>
      <p className="font-medium leading-5 text-slate-400 text-center mt-1">
        Enter the security code we sent to your Email address and Phone number
      </p>
      <VerificationForm />
    </main>
  );
}
