// import { ReactNode } from "react";
import Image from "next/image";
import style from "./Modal.module.css";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";

interface PropsModal {
  modal: string;
  handle: () => void;
}

function Card({ modal, handle }: PropsModal) {
  return (
    <>
      <div onClick={handle} className={style.background}></div>
      <div className={style.wrapper}>
        <div className={style.card}>
          <button className={style.close} onClick={handle}>
            ✖
          </button>

          <div className={style.head}>
            <Image
              src="/assets/mailGuard.webp"
              width={100}
              height={100}
              alt="Mail Guard logo"
            />
            {modal === "signin" && (
              <>
                <h2>Bienvenido Guardían</h2>
                <SignIn />
              </>
            )}
            {modal === "signup" && (
              <>
                <h2>Unete a la guardia</h2>
                <SignUp />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
