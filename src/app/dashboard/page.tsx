import Dashboard from "@/components/Dashboard";
import { createServerSupabaseClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, plans(*)")
    .eq("id", user.id)
    .single();

  return (
    <>
      <Dashboard user={user} profile={profile} />
    </>
  );
}
