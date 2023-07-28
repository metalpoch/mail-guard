import Image from "next/image";
import style from "./Pricing.module.css";

const pricing = [
  {
    name: "Gratis",
    plan: "20 Peticiones",
    description: "Para aplicaciones de prueba.",
    price: 0,
    button: { value: "Ingresar", action: () => alert("Ingresar Free") },
  },
  {
    name: "Premium",
    plan: "1K Peticiones",
    description:
      "Para aplicaciones de producción de pequeñas y medianas empresas.",
    price: 9.99,
    button: {
      value: "Solicitar",
      action: () => alert("Solicitar Premium"),
    },
  },
  {
    name: "Top",
    plan: "10K Peticiones",
    description: "Perfecto para empresas con altos volumenes de datos.",
    price: 96.99,
    button: { value: "Solicitar", action: () => alert("Solicitar Top") },
  },
];

export default function Princing() {
  return (
    <section style={{ height: "initial", flexDirection: "row" }}>
      <h1 className={style.title}>Conoce nuestros planes</h1>
      <div className={style.wrapper}>
        <ul className={style.pricing}>
          {pricing.map((item) => (
            <li className={style.card}>
              <div className={style.description}>
                <h2>{item.name}</h2>
                <p className={style.plan}>{item.plan}</p>
                <p>{item.description}</p>
              </div>

              <div>
                <h1 className={style.title}>${item.price}</h1>
                <button
                  className="btn btn-success"
                  onClick={item.button.action}
                >
                  {item.button.value}
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
