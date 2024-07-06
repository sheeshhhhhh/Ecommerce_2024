import { getServerSession } from "next-auth";
import { authoptions } from "./api/auth/[...nextauth]/route";

import NavBar from "@/components/NavBar";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeMission from "@/components/Home/HomeMission";
import AboutWebsite from "@/components/Home/AboutWebsite";

export default async function Home() {
  const session = await getServerSession(authoptions) // for server sessions

  return (
    <div className="min-h-screen">
      <div className="bg-[#119bbe] pt-6">
        <NavBar userInfo={session?.user} />
      </div>
      <main>
        <HomeHeader />
        <HomeMission />
        <AboutWebsite />
      </main>
    </div>
  );
}

