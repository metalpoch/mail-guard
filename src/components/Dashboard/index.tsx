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
  user: User;
  profile: ProfileType | null;
}) {
  const apiKey = profile?.id.replaceAll("-", "");

  return (
    <>
      <Navbar user={user} profile={profile} />
      <main>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <div className="dashboard-wrapper">
          <Profile profile={profile} email={user.email} />
          <ApiKey apiKey={apiKey || ""} />
          <Stats profile={profile} />
          <Support />
        </div>
      </main>
    </>
  );
}
// {
//   "id": "823dfdf8-6dc6-44b1-8a74-3d9fc118a085",
//   "requests": null,
//   "plan_id": 1,
//   "last_payment": null,
//   "plans": {
//     "id": 1,
//     "name": "FREE",
//     "max_requests": 20
//   }
// }
