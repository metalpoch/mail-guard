"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";
import Testimonial from "@/components/Testimonial";
import Modal from "@/components/Modal";
import Pricing from "@/components/Pricing";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

import useUser from "@/hooks/useUser";

export default function Home() {
  const [modal, setModal] = useState("");
  const user = useUser();

  const handleOpenModal = (view: string) => setModal(view);
  const handleCloseModal = () => setModal("");

  return (
    <>
      <Navbar openModal={handleOpenModal} />
      <main>
        {modal && <Modal modal={modal} handle={handleCloseModal} />}
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
