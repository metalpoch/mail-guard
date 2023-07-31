'use client';

import Image from "next/image";
import style from "./Pricing.module.css";
import { Plan } from "@/lib/components.types";
import PaymentPlans from "@/mocks/paymentPlans";

export default function Princing() {
  return (
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
                <button
                  className="btn btn-success"
                  onClick={plan.button.action}
                >
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
  );
}
