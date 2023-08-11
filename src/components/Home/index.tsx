"use client";

import Navbar from "@/components/Shared/Navbar";
import Introduction from "@/components/Home/Introduction";
import Testimonial from "@/components/Home/Testimonial";
import Pricing from "@/components/Home/Pricing";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/lib/api.types";
import Footer from "../Shared/Footer";

export default function Home({
  user,
  profile,
}: {
  user: User | null;
  profile: Profile | null;
}) {
  return (
    <>
      <Navbar user={user} profile={profile} />
      <main>
        <Introduction />
        <Testimonial />
        <Pricing user={profile} />
      </main>
      <Footer />
    </>
  );
}
