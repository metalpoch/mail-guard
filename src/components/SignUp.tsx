import Image from "next/image";
import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./SignUp.module.css";

function RegisterForm() {
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
    <div className={style.background}>
      <div className={style.card}>
        <Image
          src="/assets/mailGuard.webp"
          width={200}
          height={200}
          alt="Mail Guard logo"
        />
        <h2>Unete a la guardia </h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="sign-up-email">Correo electrónico</label>
            <input
              id="sign-up-email"
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
            />
          </div>
          <div>
            <label htmlFor="sign-up-password">Contraseña</label>
            <input
              id="sign-up-password"
              placeholder="*********"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="sign-up-password-confirmation">
              Confirmar contraseña
            </label>
            <input
              id="sign-up-password-confirmation"
              placeholder="*********"
              type="password"
              onChange={(e) => setpasswordConfirmation(e.target.value)}
              name="passwordConfirmation"
              value={passwordConfirmation}
            />
          </div>
          <div>
            <input
              type="submit"
              className="btn btn-success"
              value="Registrarse"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
