"use client";

import Image from "next/image";
import style from "./Profile.module.css";
import BinanceButton from "./BinanceButton";
import { Profile as ProfileType } from "@/lib/api.types";

export default function Profile({
  profile,
  email,
}: {
  profile: ProfileType | null;
  email: string | undefined;
}) {
  return (
    <div className={style.profile}>
      <Image
        src={`https://robohash.org/${email}?set=set5`}
        width={200}
        height={200}
        alt="Profile imagen"
      />
      <div className={style.info}>
        <h2>{email}</h2>
        <span>
          <p className={style.bold}>Plan:</p>
          <p>{profile?.plans?.name}</p>
        </span>
        <span>
          <p className={style.bold}>Balance:</p>
          <span className={style.balance}>
            <p>{`\$${profile?.balance}`}</p>
            <BinanceButton />
          </span>
        </span>
        <span>
          <p className={style.bold}>Proximo Pago:</p>
          <p>{profile?.last_payment ? profile.last_payment : `-`}</p>
        </span>
      </div>
    </div>
  );
}
