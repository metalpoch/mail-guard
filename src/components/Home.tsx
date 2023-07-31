"use client";

import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";
import Testimonial from "@/components/Testimonial";
import Pricing from "@/components/Pricing";
import { User } from "@supabase/supabase-js";

export default function Home({ user }: { user: User | null }) {
  return (
    <>
      <Navbar user={user} />
      <main>
        <Introduction />
        <Testimonial />
        <Pricing />
      </main>
    </>
  );
}
