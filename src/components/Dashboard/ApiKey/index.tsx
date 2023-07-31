"use client";

import Image from "next/image";
import style from "./ApiKey.module.css";

export default function ApiKey({ apiKey }: { apiKey: string }) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(apiKey);
    alert("Api Key copiado");
  };

  return (
    <div className={style.apiKey}>
      <p>API KEY: </p>
      <span>
        <input type="password" readOnly value="Carajo!... Deja el chisme" />
        <button onClick={handleCopyClick} title="Copiar Key">
          <Image src="/icons/copy.svg" width={50} height={50} alt="Copy icon" />
        </button>
      </span>
    </div>
  );
}
