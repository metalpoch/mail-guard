import { useState, FormEvent } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");

  const router = useRouter();
  const supabase = useSupabase();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor="sign-up-email">Correo electrónico</label>
        <input
          id="sign-up-email"
          type="email"
          placeholder="palito@mantequillero.com"
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
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 75,
          justifyContent: "flex-end",
          alignItems: "end",
        }}
      >
        <input type="submit" className="btn btn-success" value="Registrarse" />
      </div>
    </form>
  );
}
