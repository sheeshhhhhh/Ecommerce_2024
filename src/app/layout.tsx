import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderSession from "@/context/ProviderSession";

// for my upload thing reference: https://docs.uploadthing.com/getting-started/appdir
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { authoptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "An Online Shopping app in the philippines",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authoptions)

  return (
    <html lang="en">
      <ProviderSession>
        <body className={inter.className} >
          <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
        </body>
      </ProviderSession>
    </html>
  );
}
