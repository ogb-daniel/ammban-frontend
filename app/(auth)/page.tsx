import LoginForm from "../ui/auth/login-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
};
export default function Login() {
  return (
    <main className=" p-6">
      <h1 className="text-primary text-[40px] font-bold text-center">
        Welcome!
      </h1>
      <p className="font-medium leading-5 text-slate-400 text-center mt-1">
        Your account is protected with the highest security standards. Sign in
        to access your personalized coverage and stay in control of your future
        with confidence.
      </p>
      <LoginForm />
    </main>
  );
}
