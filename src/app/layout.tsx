import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderSession from "@/context/ProviderSession";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "An Online Shopping app in the philippines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <ProviderSession>
        <body className={inter.className}>{children}</body>
      </ProviderSession>
    </html>
  );
}
