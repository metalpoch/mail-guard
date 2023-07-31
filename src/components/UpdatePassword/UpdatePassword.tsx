"use client";

import { createClient } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import navbarStyles from "../Navbar.module.css";
import styles from "./UpdatePassword.module.css";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        router.push("/");
      }
    }
    checkAuth();
  }, [supabase.auth, router]);

  const handlePasswordUpdate = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    if (password === "") {
      setError("Ingresa la nueva contraseña.");
      setLoading(false);
      return;
    }
    if (passwordConfirmation === "") {
      setError("Confirma tu contraseña.");
      setLoading(false);
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: password });
    if (!error) {
      setMessage("La contraseña fue actualizada exitosamente.");
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    }
    if (error && error.status === 422) {
      setError("La contraseña debe poseer al menos 6 caracteres.");
    }
    setLoading(false);
  };

  return (
    <div>
      <header className={navbarStyles.navbar}>
        <div className={navbarStyles.logo}>
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/mailGuard.webp"
              width={200}
              height={200}
              alt="Mail Guard logo"
            />
            <h1>Mail Guard</h1>
          </Link>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.card}>
          <p>Actualiza tu contraseña</p>
          <div className={styles.formControl}>
            <label htmlFor="password">Nueva contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="********"
              type="password"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password_confirmation">Ingresa nuevamente</label>
            <input
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              id="password_confirmation"
              placeholder="********"
              type="password"
            />
          </div>
          {message && <div className={styles.message}>{message}</div>}
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.btnRow}>
            <button
              disabled={loading}
              className="btn"
              onClick={handlePasswordUpdate}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
