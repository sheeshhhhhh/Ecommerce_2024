
import { Inter } from "next/font/google";
import SideBar from "./SideBar";
import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authoptions)

    return (
        <div className={"min-h-screen"}>
            <NavBar userInfo={session?.user} />
            <main className="w-full flex justify-center pt-12">
                <SideBar />
                <div className="flex h-full justify-start w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
