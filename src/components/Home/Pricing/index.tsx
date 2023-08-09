"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import style from "./Pricing.module.css";
import { Profile } from "@/lib/api.types";
import { Plan } from "@/lib/components.types";
import Modal from "@/components/Home/Modal";
import PaymentPlans from "@/mocks/paymentPlans";

interface Props {
  user: Profile | null;
}

export default function Princing({ user }: Props) {
  const [modal, setModal] = useState("");
  const router = useRouter();

  const handleClick = () =>
    user ? router.push("/dashboard") : setModal("signin");

  const handleClose = () => setModal("");

  return (
    <>
      <section id="pricing" style={{ height: "initial", flexDirection: "row" }}>
        <h1 className={style.title}>Conoce nuestros planes</h1>
        <div className={style.wrapper}>
          <ul className={style.pricing}>
            {PaymentPlans.map((plan: Plan) => (
              <li key={plan.name} className={style.card}>
                <div className={style.description}>
                  <h2>{plan.name}</h2>
                  <p className={style.plan}>{plan.plan}</p>
                  <p>{plan.description}</p>
                </div>

                <div>
                  <h1 className={style.title}>${plan.price}</h1>
                  <button className="btn btn-success" onClick={handleClick}>
                    {plan.button.value}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Image
            src="/assets/parcels.webp"
            className={style.img}
            alt="Parcels"
            width={500}
            height={500}
          />
        </div>
      </section>
      {modal && <Modal modal={modal} handle={handleClose} />}
    </>
  );
}
