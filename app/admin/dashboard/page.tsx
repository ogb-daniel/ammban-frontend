import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Login() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome Jacob</h1>
        <p className="text-blue-500">(AXA Agent)</p>
      </div>
      <div className=" p-6">
        <h1 className="text-primary text-[40px] font-bold text-center">
          Dashboard
        </h1>
      </div>
    </main>
  );
}
