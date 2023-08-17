"use client";

import Image from "next/image";
import style from "./Support.module.css";

export default function Support() {
  return (
    <div className={style.support}>
      <div>
        <p>
          Si quieres cominicarte con nosotros o realizar un cambio de plan, solo
          tienes que hacer clic en el siguiente enlace y te atenderemos
          enseguida. Estamos a tu disposición.
        </p>
        <a href="https://mail-guard.vercel.app/support">
          mail-guard.vercel.app/support
        </a>
      </div>
      <Image
        src="/assets/support.webp"
        width={100}
        height={100}
        alt="icono de soporte tecnico"
      />
    </div>
  );
}
