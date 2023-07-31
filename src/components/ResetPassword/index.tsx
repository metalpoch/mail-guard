"use client";

import { createClient } from "@/lib/supabase/supabase-client";
import { useState } from "react";
import styles from "./ResetPassword.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ResetPassword() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPasswordForEmail = async () => {
    setLoading(true);
    setError("");
    if (email === "") {
      alert("Ingresa el email");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        process.env.APP_URL + "/auth/callback?next=/account/update-password",
    });
    if (!error) {
      setMessage("Email de recuperación enviado, revisa tu buzón.");
      setEmail("");
    }
    if (error && error.status === 422) {
      setError(
        "El formato del correo electrónico no es correcto. Intenta de nuevo.",
      );
    }
    if (error && error.status === 429) {
      setError("Límite de solicitudes alcanzado. Intenta más tarde.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/assets/mailGuard.webp"
          width={100}
          height={100}
          alt="Mail Guard logo"
        />
      </Link>
      <div className={styles.card}>
        <h3>Recupera tu contraseña</h3>
        <p>Recibiras un correo electrónico para recuperar tu contraseña</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ej. mail@gmail.com"
        />
        {message && <div className={styles.message}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}
        <div className="flex justify-end">
          <button
            disabled={loading}
            onClick={handleResetPasswordForEmail}
            className="btn"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
