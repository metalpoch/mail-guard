import Image from "next/image";
import style from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={style.profile}>
      <Image
        src="https://robohash.org/random?set=set5"
        width={200}
        height={200}
        alt="Peofile imagen"
      />
      <div className={style.info}>
        <h2>Fulano de tal</h2>
        <span>
          <p className={style.bold}>Plan:</p>
          <p>Premium</p>
        </span>
        <span>
          <p className={style.bold}>Balance:</p>
          <p>{"<Binance/>"}</p>
        </span>
        <span>
          <p className={style.bold}>Proximo Pago:</p>
          <p>27/jul/2023</p>
        </span>
      </div>
    </div>
  );
}
