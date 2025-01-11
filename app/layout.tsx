import type { Metadata } from "next";
import "./ui/globals.css";
import { montserrat } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Cubecover",
  description: "Cubecover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased text-black`}>
        {children}
      </body>
    </html>
  );
}
