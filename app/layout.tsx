// At the top of your page.tsx
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import "./ui/globals.css";
import { montserrat } from "./ui/fonts";
import { ToastContainer } from "react-toastify";
import { UserStoreProvider } from "@/providers/user-store-provider";
import { LoadingProvider } from "./providers/loading-provider";
import SessionManager from "./ui/session-manager";

export const metadata: Metadata = {
  title: {
    template: "%s | Cubecover",
    default: "Cubecover",
  },
  description: "Cubecover",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased text-black bg-white`}
      >
        <SessionManager>
          <LoadingProvider>
            <UserStoreProvider>
              {children}
              <div id="modals"></div>
            </UserStoreProvider>
            <ToastContainer />
          </LoadingProvider>
        </SessionManager>
      </body>
    </html>
  );
}
