import LoginForm from "../ui/auth/login-form";

export default function Login() {
  return (
    <main className="mt-10">
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
