"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import style from "./Testimonial.module.css";
import clients from "@/mocks/clients";
import type { Client } from "@/lib/components.types";

export default function Testimonial() {
  const [testimonialID, setTestimonialID] = useState(0);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    const interval = setInterval(
      () => setAnimation("animate__fadeInDown"),
      5000
    );
    return () => clearInterval(interval);
  }, [testimonialID]);

  useEffect(() => {
    if (animation === "animate__fadeInDown") {
      const interval = setInterval(
        () => setAnimation("animate__fadeOutDown animate__fast"),
        4200
      );
      return () => clearInterval(interval);
    }
  }, [animation]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTestimonial = (testimonialID + 1) % clients.length;
      setTestimonialID(newTestimonial);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonialID]);

  return (
    <section id="testimonials" className={style.wrapper}>
      <div className={style.testimonials}>
        <div className={`${style.client} animate__animated ${animation}`}>
          <Image
            src={clients[testimonialID].perfil}
            height={163}
            width={163}
            alt={`Picture of ${clients[testimonialID].name}`}
          />
          <div className={style.card}>
            <p className={style.ranking}>{`${"⭐".repeat(
              clients[testimonialID].ranking
            )}`}</p>
            <p className={style.body}>{clients[testimonialID].message}</p>
            <p className={style.name}>{clients[testimonialID].name}</p>
          </div>
        </div>
      </div>
      <div className={style.description}>
        <h2>
          ¿Quieres verificar los correos electrónicos de tus contactos con
          seguridad y eficiencia?
        </h2>
        <p>
          Con nuestro servicio de validación de correos electrónicos, podrás
          optimizar tu estrategia de email marketing, aumentar tu conversión y
          fidelización de clientes, y proteger tu seguridad y privacidad.
        </p>
        <p>
          Nuestro servicio es rápido, fácil y seguro. Solo tienes que
          registrarte en nuestra página web, obtener tu clave de API y empezar a
          validar los correos electrónicos que quieras.
        </p>
      </div>
    </section>
  );
}
