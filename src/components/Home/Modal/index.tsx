"use client";

import { useState } from "react";
import Image from "next/image";
import style from "./Modal.module.css";
import SignUp from "@/components/Home/Modal/SignUp";
import SignIn from "@/components/Home/Modal/SignIn";
import "animate.css";

interface PropsModal {
  modal: string;
  handle: () => void;
}

function Card({ modal, handle }: PropsModal) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div
        onClick={handle}
        className={`${style.background} animate__animated animate__fadeIn animate__faster`}
      ></div>
      <div className={` ${style.wrapper}`}>
        <div
          className={`${style.card} animate__animated animate__slideInUp animate__faster`}
        >
          <button className={style.close} onClick={handle}>
            ✖
          </button>

          <div className={style.body}>
            <div className={style.head}>
              {loading ? (
		<div className={style.loading}>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <Image
                  src="/assets/mailGuard.webp"
                  width={200}
                  height={200}
                  alt="Mail Guard logo"
                />
              )}
            </div>

            {modal === "signin" && (
                <SignIn setLoading={setLoading}/>
            )}
            {modal === "signup" && (
              <>
                <h2>Unete a la guardia</h2>
                <SignUp handle={handle} setLoading={setLoading} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
