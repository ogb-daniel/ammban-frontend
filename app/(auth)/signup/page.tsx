import RegistrationForm from "@/app/ui/auth/register-form";

export default function Signup() {
  return (
    <main className="mt-10">
      <h1 className="text-primary text-[40px] font-bold text-center">
        Welcome!
      </h1>
      <p className="font-medium leading-5 text-slate-400 text-center mt-1">
        Join us today for secure access to tailored insurance solutions. Start
        protecting what matters most with an account built for your peace of
        mind.
      </p>
      <RegistrationForm />
    </main>
  );
}
