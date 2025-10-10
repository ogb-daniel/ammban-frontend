import AccountLimitContainer from "@/app/ui/profile/account-limit-container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function AccountLimits() {
  return (
    <main>
      {/* <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome</h1>
        <p className="text-blue-500">AXA Agent</p>
      </div> */}
      <div className=" p-6">
        <AccountLimitContainer />
      </div>
    </main>
  );
}
