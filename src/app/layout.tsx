import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/Providers";

export const metadata: Metadata = {
  title: "Cyber Aware",
  description: "An interactive learning platform for cybersecurity awareness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
