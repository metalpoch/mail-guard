"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UptimeStatus {
  [key: number]: {
    message: string;
    color: string;
  };
}

const UPTIME_STATUS_CODES: UptimeStatus = {
  0: { message: "Monitoring paused", color: "gray" },
  1: { message: "Not checked yet", color: "yellow" },
  2: { message: "All systems operational", color: "green" },
  8: { message: "System seems down", color: "orange" },
  9: { message: "System down", color: "red" },
};

const year = new Date().getFullYear()

export default function Footer() {
  const [uptimeStatus, setUptimeStatus] = useState(1);

  useEffect(() => {
    async function fetchUptimeStatus() {
      const res = await fetch("/api/health");
      if (res.status === 200) {
        const uptime = await res.json();
        setUptimeStatus(uptime.status);
      }
    }
    fetchUptimeStatus();
  }, [uptimeStatus]);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Image
          src="/assets/mailGuard.webp"
          width={50}
          height={50}
          alt="Mail Guard logo"
        />
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <div className={styles.statusContainer}>
              <a
                href="https://stats.uptimerobot.com/gqN73IPq3l"
                target="_blank"
              >
                Status
              </a>
              <div
                title={UPTIME_STATUS_CODES[uptimeStatus].message}
                className={styles.statusDot}
                style={{
                  backgroundColor: UPTIME_STATUS_CODES[uptimeStatus].color,
                }}
              ></div>
            </div>
          </li>
          <li>
            <Link href="/terms-of-service">Terminos y condiciones</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Politicas de privacidad</Link>
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        Copyright © {year} Mail Guard All rights reserved.
      </div>
    </footer>
  );
}
