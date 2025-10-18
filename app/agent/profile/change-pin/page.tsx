import ChangePinContainer from "@/app/ui/profile/change-pin-container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Pin",
};
export default async function ChangePin() {
  return (
    <main>
      {/* <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome</h1>
        <p className="text-blue-500">AXA Agent</p>
      </div> */}
      <div className=" p-6">
        <ChangePinContainer />
      </div>
    </main>
  );
}
