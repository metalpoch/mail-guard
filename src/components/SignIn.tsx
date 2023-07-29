import { useState } from "react";
import Image from "next/image";
import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import style from "./SignIn.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");

  const router = useRouter();
  const supabase = useSupabase();

  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   });
  //   router.refresh()
  // };
  const handleSignUp = async (e) => {
    e.preventDefault();
    alert(
      `email: ${email} | password: ${password} | passwordConfirmation: ${passwordConfirmation}`
    );
  };

  return (
    <form onSubmit={handleSignUp}>
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
        <p>
          ¿No eres parte de la guardia aun?{" "}
          <span className={style.link} onClick={() => alert("a")}>
            Resgistrate aquí.
          </span>
        </p>
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
