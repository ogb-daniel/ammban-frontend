import { depositFunds } from "@/app/lib/actions/payment";
import ProfileContainer from "@/app/ui/profile/profile-container";
import WalletContainer from "@/app/ui/profile/WalletContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function Wallet() {
  const response = await depositFunds();

  // Handle errors gracefully instead of throwing
  if (!response || !response.success) {
    return (
      <main>
        <div className="p-6">
          <ProfileContainer title="Wallet">
            <div className="text-center py-8">
              <p className="text-red-500">
                {response?.error?.message || "Failed to load wallet data"}
              </p>
            </div>
          </ProfileContainer>
        </div>
      </main>
    );
  }

  if (response.result?.responseCode !== 200) {
    return (
      <main>
        <div className="p-6">
          <ProfileContainer title="Wallet">
            <div className="text-center py-8">
              <p className="text-red-500">
                {response.result?.message || "Wallet service unavailable"}
              </p>
            </div>
          </ProfileContainer>
        </div>
      </main>
    );
  }
  return (
    <main>
      {/* <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome</h1>
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
