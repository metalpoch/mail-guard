import Home from "@/components/Home";
import { createServerSupabaseClient } from "@/lib/supabase/supabase-server";

export default async function HomePage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Home user={user} />
    </>
  );
}
