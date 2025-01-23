import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Login() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Products</h1>
      </div>
      <div className=" p-6"></div>
    </main>
  );
}
