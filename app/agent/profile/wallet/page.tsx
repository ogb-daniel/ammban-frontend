import { depositFunds } from "@/app/lib/actions/payment";
import ProfileContainer from "@/app/ui/profile/profile-container";
import WalletContainer from "@/app/ui/profile/WalletContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function Wallet() {
  const response = await depositFunds();
  if (response) {
    console.log(response);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    if (response.result.responseCode !== 200) {
      throw new Error(response.result.message);
    }
  }
  return (
    <main>
      {/* <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome Jacob</h1>
        <p className="text-blue-500">AXA Agent</p>
      </div> */}
      <div className=" p-6">
        <ProfileContainer title="Wallet">
          <WalletContainer account={response.result.payload} />
        </ProfileContainer>
      </div>
    </main>
  );
}
