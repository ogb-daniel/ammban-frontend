import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function CreateCategory() {
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold">Create Category</h1>
      </div>
      <div className=" p-6"></div>
    </main>
  );
}
