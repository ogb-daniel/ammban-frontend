import ResponsiveProfileLayout from "@/app/ui/layouts/responsive-profile-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ResponsiveProfileLayout>{children}</ResponsiveProfileLayout>;
}
