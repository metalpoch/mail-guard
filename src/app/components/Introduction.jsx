import Image from "next/image";
import style from "./Introduction.module.css";

export default function Introduction() {
  return (
    <section className={style.base}>
      <div className={style.detail}>
        <h1>Protegemos y optimizamos la integridad de tus contactos</h1>
        <p>
          No dejes que los correos electrónicos temporales o sospechosos
          arruinen tu negocio.
        </p>
        <p>
          Con Mail Guard, puedes validar los correos electrónicos en tiempo
          real, utilizando una API fácil de integrar y una base de datos
          confiable.
        </p>
      </div>
      <Image
        src="/assets/envelope.webp"
        width={500}
        height={500}
        alt="mail envelope above fake mail"
      />
    </section>
  );
}
