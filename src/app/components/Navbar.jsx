import Image from "next/image";
import Link from "next/link";
import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={style.navbar}>
      <div className={style.logo}>
        <Image
          src="/assets/mailGuard.webp"
          width={200}
          height={200}
          alt="Mail Guard logo"
        />
        <h1>Mail Guard</h1>
      </div>
      <ul className={style.links}>
        <l1>
          <Link href={"/"}>Inicio</Link>
        </l1>
        <l1>
          <Link href={"/#testimonial"}>Testimonios</Link>
        </l1>
        <l1>
          <Link href={"/#doc"}>Planes</Link>
        </l1>
        <l1>
          <button>Ingresar</button>
        </l1>

        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
    </header>
  );
}
