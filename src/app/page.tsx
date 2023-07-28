"use client";

import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";
import Testimonial from "@/components/Testimonial";
import SignUp from "@/components/SignUp";
import Pricing from "@/components/Pricing";

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

import useUser from "@/hooks/useUser";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Navbar />
      <main>
        <SignUp />
        <Introduction />
        <Testimonial />
        <Pricing />
        <div className="p-10">
          {!user && <LoginForm />}
          {!user && <RegisterForm />}
        </div>
      </main>
    </>
  );
}
