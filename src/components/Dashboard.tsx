"use client";

import Navbar from "@/components/Navbar";
import Profile from "@/components/dashboard/Profile";
import Stats from "@/components/dashboard/Stats";
import ApiKey from "@/components/dashboard/ApiKey";
import Support from "@/components/dashboard/Support";
import { User } from "@supabase/supabase-js";
import { Profile as ProfileType } from "@/lib/api.types";

export default function Dashboard({
  user,
  profile,
}: {
  user: User;
  profile: ProfileType;
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
