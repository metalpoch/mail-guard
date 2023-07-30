"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Profile from "@/components/dashboard/Profile";
import Stats from "@/components/dashboard/Stats";
import ApiKey from "@/components/dashboard/ApiKey";
import Support from "@/components/dashboard/Support";

export default function Dashboard() {
  const router = useRouter();
  const user = useUser();

  return (
    <>
      <Navbar user={user} />
      {console.log(user)}
      <main>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <div className="dashboard-wrapper">
          <Profile />
          <ApiKey />
          <Stats />
          <Support />
        </div>
      </main>
    </>
  );
}
