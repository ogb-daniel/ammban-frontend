import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Users() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">Users</h1>
      </div>
      <div className=" p-6">
        <h1 className="text-primary text-[40px] font-bold text-center">
          Users
        </h1>
      </div>
    </main>
  );
}
