import Home from "@/components/Home";
import { Profile } from "@/lib/api.types";
import { createServerSupabaseClient } from "@/lib/supabase/supabase-server";

export default async function HomePage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user?.id)
    .single();

  return (
    <>
      <Home user={user} profile={profile as Profile} />
    </>
  );
}
