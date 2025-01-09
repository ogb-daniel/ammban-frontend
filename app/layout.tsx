import type { Metadata } from "next";
import "./globals.css";
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
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
