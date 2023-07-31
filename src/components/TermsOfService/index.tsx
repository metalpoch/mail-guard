import Image from "next/image";
import style from "./Navbar.module.css";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div>
      <header className={style.navbar}>
        <div className={style.logo}>
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/mailGuard.webp"
              width={200}
              height={200}
              alt="Mail Guard logo"
            />
            <h1>Mail Guard</h1>
          </Link>
        </div>
      </header>
      <div className="p-5 lg:px-28">
        <h1 className="my-10">Terminos y condiciones</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          voluptatibus at a velit tempore porro dolorem, quae fugiat obcaecati
          perspiciatis praesentium cum iste reprehenderit non ea nam eligendi,
          alias deleniti.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          voluptatibus at a velit tempore porro dolorem, quae fugiat obcaecati
          perspiciatis praesentium cum iste reprehenderit non ea nam eligendi,
          alias deleniti.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          voluptatibus at a velit tempore porro dolorem, quae fugiat obcaecati
          perspiciatis praesentium cum iste reprehenderit non ea nam eligendi,
          alias deleniti.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          voluptatibus at a velit tempore porro dolorem, quae fugiat obcaecati
          perspiciatis praesentium cum iste reprehenderit non ea nam eligendi,
          alias deleniti.
        </p>
      </div>
    </div>
  );
}
