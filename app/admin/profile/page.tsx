import ProfileSettings from "@/app/ui/profile/profile-settings";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Profile() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome Jacob</h1>
        <p className="text-blue-500">AXA Admin</p>
      </div>
      <div className=" p-6">
        <ProfileSettings />
      </div>
    </main>
  );
}
