'use client';

import Image from "next/image";
import style from "./Testimonial.module.css";
import clients from "@/mocks/clients";
import type { Client } from "@/lib/components.types";

export default function Testimonial() {
  return (
    <section id="testimonials">
      <div className={style.testimonials}>
        {clients.map((client: Client) => (
          <div key={client.name} className={style.client}>
            <Image
              src={client.perfil}
              height={163}
              width={163}
              alt={`Picture of ${client.name}`}
            />
            <div className={style.card}>
              <p className={style.ranking}>{`${"⭐".repeat(
                client.ranking
              )}`}</p>
              <p className={style.body}>{client.message}</p>
              <p className={style.name}>{client.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="description">
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
