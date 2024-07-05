import { getServerSession } from "next-auth";
import { authoptions } from "./api/auth/[...nextauth]/route";

import NavBar from "@/components/NavBar";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeMission from "@/components/Home/HomeMission";

export default async function Home() {
  const session = await getServerSession(authoptions) // for server sessions

  return (
    <div className="min-h-screen ">
      <div className="bg-[#119bbe]">
        <NavBar userInfo={session?.user} />
      </div>
      <main>
        <HomeHeader />
        <HomeMission />
      </main>
    </div>
  );
}

