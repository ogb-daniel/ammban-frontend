import type { Metadata } from "next";
import "./ui/globals.css";
import { montserrat } from "./ui/fonts";

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
        {children}
        <div id="modals"></div>
      </body>
    </html>
  );
}
