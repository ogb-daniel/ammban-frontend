import PersonalInformation from "@/app/ui/profile/personal-information";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function PersonalInfo() {
  return (
    <main>
      {/* <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome</h1>
        <p className="text-blue-500">AXA Agent</p>
      </div> */}
      <div className=" p-6">
        <PersonalInformation />
      </div>
    </main>
  );
}
