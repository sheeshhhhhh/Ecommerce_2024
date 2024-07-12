
import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";
import NavBar from "@/components/NavBar";
import { redirect } from "next/navigation";
import Explore from "@/components/Explore";
import Search from "@/components/explore/Search";
import CartsModal from "@/components/explore/CartsModal";


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
            <main className="w-full">
                <div className='mx-auto max-w-[1120px] flex items-center justify-between'>
                    <div className=''>
                        <Explore />
                    </div>
                    <div className='flex items-center gap-4'>
                        <Search />
                        <CartsModal size={30} />
                    </div>
                </div>
                <div className="flex h-full justify-center w-full mt-8">
                    {children}
                </div>
            </main>
        </div>
    );
}