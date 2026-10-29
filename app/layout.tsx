import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RKN Devl Cafe | Review Journey Demo",
  description: "Interactive QR review journey prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
