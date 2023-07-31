"use client";

import Navbar from "@/components/Shared/Navbar";
import Profile from "@/components/Dashboard/Profile";
import Stats from "@/components/Dashboard/Stats";
import ApiKey from "@/components/Dashboard/ApiKey";
import Support from "@/components/Dashboard/Support";
import { User } from "@supabase/supabase-js";
import { Profile as ProfileType } from "@/lib/api.types";

export default function Dashboard({
  user,
  profile,
}: {
  user: User,
  profile: ProfileType | null
}) {
  console.log(profile)
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
