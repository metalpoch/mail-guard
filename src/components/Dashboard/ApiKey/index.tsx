import Image from "next/image";
import style from "./ApiKey.module.css";

const keyMock = "11111111222233334444555555555555";

export default function ApiKey() {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(keyMock);
    alert("texto copiado");
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
