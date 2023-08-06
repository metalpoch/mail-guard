import Support from "@/components/Support";
import { Profile } from "@/lib/api.types";
import { createServerSupabaseClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";

export default async function SupportPage() {
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

  if (profile?.plans && profile.plans?.id === 1) {
    // if logged in but free plan
    redirect("/");
  }
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select()
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: tickets_taken } = await supabase
    .from("tickets")
    .select()
    .neq("status", "SOLVED");

  let days_taken: Array<Date> = [];
  if (tickets_taken !== null && tickets_taken.length > 0) {
    tickets_taken.forEach((ticket) => {
      let date = new Date(ticket.appointment_date);
      date.setDate(date.getDate() + 1);
      days_taken.push(date);
    });
  }

  return (
    <Support
      user={user}
      profile={profile as Profile}
      tickets={tickets}
      days_taken={days_taken}
    />
  );
}
