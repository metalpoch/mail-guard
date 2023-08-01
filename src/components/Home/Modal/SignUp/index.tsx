"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase/supabase-client";

export default function SignUp({ handle }: { handle: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");

  const supabase = createClient();

  const API_KEY =
    process.env.SUPER_USER_TOKEN || "994de7713f3f425daefba5ace7fabd0d";

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${location.origin}/api/check?email=${email}`,
      {
        headers: {
          Authentication: `Bearer ${API_KEY}`,
        },
      },
    );
    const { valid } = await response.json();
    if (!valid) {
      alert("El email no es valido");
      handle();
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert(JSON.stringify(error.message));
    } else {
      alert("Se ha enviado un correo de confirmación a su email");
    }
    handle();
  };

  return (
    <form onSubmit={handleSignUp} method="POST">
      <div>
        <label htmlFor="sign-up-email">Correo electrónico</label>
        <input
          id="sign-up-email"
          type="email"
          placeholder="palito@mantequillero.com"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
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
          required
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
          required
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
