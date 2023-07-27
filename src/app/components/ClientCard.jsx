import Image from "next/image";
import style from "./ClientCard.module.css";

export default function ClientCard({ clients }) {
  return (
    <div className={style.testimonials}>
      {clients.map((client) => (
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
