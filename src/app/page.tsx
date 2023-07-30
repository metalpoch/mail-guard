"use client";

import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";
import Testimonial from "@/components/Testimonial";
import Pricing from "@/components/Pricing";

import useUser from "@/hooks/useUser";

export default function Home() {
  const user = useUser();

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
