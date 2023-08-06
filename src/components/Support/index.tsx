"use client";

import { Profile } from "@/lib/api.types";
import { Database } from "@/lib/database.types";
import { User } from "@supabase/supabase-js";
import es from "date-fns/locale/es";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../Shared/Navbar";
import styles from "./Support.module.css";
import TicketList from "./TicketList";

registerLocale("es", es);

type Ticket = Database["public"]["Tables"]["tickets"]["Row"];

export default function Support({
  user,
  profile,
  tickets,
  days_taken,
}: {
  user: User;
  profile: Profile;
  tickets: Ticket[] | null;
  days_taken: Array<Date>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleCreateSupportTicket() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/account/support/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_date: dayjs(selectedDate).format("YYYY-MM-DD"),
          user_id: user.id,
          title,
          description,
        } as Database["public"]["Tables"]["tickets"]["Insert"]),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      if (data.success) {
        setSelectedDate(new Date());
        setTitle("");
        setDescription("");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar user={user} profile={profile} />
      <main className={styles.container}>
        <h1>Solicitar consulta</h1>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="date">Selecciona una fecha</label>
            <DatePicker
              id="date"
              selected={selectedDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              onChange={(date: Date) => setSelectedDate(date)}
              locale="es"
              excludeDates={days_taken}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject">Motivo</label>
            <input
              type="text"
              id={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Motivo"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Cuentanos sobre tu problema..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              disabled={loading}
              className="btn"
              onClick={handleCreateSupportTicket}
            >
              Solicitar consulta
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </div>
        <TicketList tickets={tickets} />
      </main>
    </>
  );
}
