import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Commission() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Commission</h1>
      </div>
      <div className=" p-6">
        <h1 className="text-primary text-[40px] font-bold text-center">
          Commission
        </h1>
      </div>
    </main>
  );
}
