import { useState, FormEvent } from "react";

import Image from "next/image";
import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import style from "./SignIn.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const supabase = useSupabase();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <form onSubmit={handleSignIn}>
      <div>
        <label htmlFor="sign-in-email">Correo electrónico</label>
        <input
          id="sign-in-email"
          type="email"
          placeholder="palito@mantequillero.com"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
        />
      </div>
      <div>
        <label htmlFor="sign-in-password">Contraseña</label>
        <input
          id="sign-in-password"
          placeholder="*********"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
        />
      </div>
      <p className={style.recovery} onClick={() => alert("Tejo 🤷 ")}>
        Recuperar contraseña
      </p>

      <div className={style.footer}>
        <input type="submit" className="btn btn-success" value="Ingresar" />
        <ul className={style.mediaAuth}>
          <li>
            <button>
              <Image
                src="/icons/google.svg"
                alt="logo de Google"
                width={30}
                height={30}
                title="Inicia sesión con Google"
              />
            </button>
          </li>
          <li>
            <button>
              <Image
                src="/icons/github.svg"
                alt="logo de GitHub"
                width={30}
                height={30}
                title="Inicia sesión con GitHub"
              />
            </button>
          </li>
          <li>
            <button>
              <Image
                src="/icons/linkedin.svg"
                alt="logo de LinkedIn"
                width={30}
                height={30}
                title="Inicia sesión con LinkedIn"
              />
            </button>
          </li>
        </ul>
      </div>
    </form>
  );
}
