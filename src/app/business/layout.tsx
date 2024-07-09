
import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";
import NavBar from "@/components/NavBar";
import { redirect } from "next/navigation";
import BusinessNavBar from "./BusinessNavBar";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authoptions)
    if(!session) return redirect('/api/auth/signin')

    return (
        <div className={"min-h-screen"}>
            <NavBar userInfo={session?.user} />
            <main className="w-full pt-12">
                <BusinessNavBar />
                <div className="flex h-full justify-center w-full mt-4">
                    {children}
                </div>
            </main>
        </div>
    );
}