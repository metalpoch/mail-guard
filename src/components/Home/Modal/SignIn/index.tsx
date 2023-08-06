"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase/supabase-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import style from "./SignIn.module.css";

export default function SignIn({
  setLoading,
}: {
  setLoading: (state: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert(error.message);
      if (!error) router.replace("/dashboard");
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleSignInWithTwitter = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
  };

  return (
    <form onSubmit={handleSignIn} method="POST">
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
      <p
        className={style.recovery}
        onClick={() => router.push("/reset-password")}
      >
        Recuperar contraseña
      </p>

      <div className={style.footer}>
        <input type="submit" className="btn btn-success" value="Ingresar" />
        <ul className={style.mediaAuth}>
          <li>
            <button onClick={handleSignInWithGoogle}>
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
            <button onClick={handleSignInWithGitHub}>
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
            <button onClick={handleSignInWithTwitter}>
              <Image
                src="/icons/twitter-x.svg"
                alt="logo de Twitter"
                width={30}
                height={30}
                title="Inicia sesión con Twitter"
              />
            </button>
          </li>
        </ul>
      </div>
    </form>
  );
}
