import mockClients from "@/mocks/clients";
import ClientCard from "./ClientCard";

export default function Testimonial() {
  return (
    <section>
      <ClientCard testimonials={mockClients} />
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
