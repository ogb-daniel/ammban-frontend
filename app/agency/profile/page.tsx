import MobileProfile from "@/app/ui/profile/mobile-profile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Profile() {
  return (
    <main>
      <MobileProfile />
    </main>
  );
}
