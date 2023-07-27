import Image from "next/image";
import style from "./ClientCard.module.css";
import type { Testimonials } from "@/lib/testimonial.types";


export default function ClientCard({testimonials }: {testimonials: Testimonials[]}) {
  return (
    <div className={style.testimonials}>
      {testimonials.map((client) => (
        <div key={client.name} className={style.client}>
          <Image
            src={client.perfil}
            height={163}
            width={163}
            alt={`Picture of ${client.name}`}
          />
          <div className={style.card}>
            <p className={style.ranking}>{`${"⭐".repeat(client.ranking)}`}</p>
            <p className={style.body}>{client.message}</p>
            <p className={style.name}>{client.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
