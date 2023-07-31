"use client";

import Navbar from "@/components/Shared/Navbar";
import Introduction from "@/components/Home/Introduction";
import Testimonial from "@/components/Home/Testimonial";
import Pricing from "@/components/Home/Pricing";
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
