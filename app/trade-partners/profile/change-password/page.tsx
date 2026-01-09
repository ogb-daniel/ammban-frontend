import { generatePasswordResetToken } from "@/app/lib/actions/user";
import { User } from "@/app/lib/definitions";
import { getSession } from "@/app/lib/session";
import ChangePasswordContainer from "@/app/ui/profile/change-password-container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function ChangePassword() {
  const user = (await getSession()).user;

  if (user) {
    const parsedUser: User = JSON.parse(user);

    // Handle missing user gracefully
    if (!parsedUser?.emailAddress) {
      return (
        <main>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-red-500">User session not found. Please log in again.</p>
            </div>
          </div>
        </main>
      );
    }

    const response = await generatePasswordResetToken({
      Email: parsedUser?.emailAddress,
    });

    // Handle API error gracefully
    if (!response.success) {
      return (
        <main>
          <div className="p-6">
            <div className="text-center py-8">
              <p className="text-red-500">
                {response.error.message || "Failed to generate reset token"}
              </p>
            </div>
          </div>
        </main>
      );
    }
  }
  return (
    <main>
      {/* <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome</h1>
        <p className="text-blue-500">AXA Agent</p>
      </div> */}
      <div className=" p-6">
        <ChangePasswordContainer />
      </div>
    </main>
  );
}
