"use client";

import { Database } from "@/lib/database.types";
import dayjs from "dayjs";

type Ticket = Database["public"]["Tables"]["tickets"]["Row"];

export default function TicketList({ tickets }: { tickets: Ticket[] | null }) {
  return (
    <div className="ticket-list">
      <h2 className="my-10">Consultas</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Creada
              </th>
              <th scope="col" className="px-6 py-3">
                Motivo
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Cita asignada
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="bg-white border-b">
                  <td className="px-6 py-4">
                    {dayjs(ticket.created_at).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-4">{ticket.title}</td>
                  <td className="px-6 py-4">{ticket.status}</td>
                  <td className="px-6 py-4">
                    Para el dia{" "}
                    {dayjs(ticket.appointment_date).format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))
            ) : (
              <div>No hay solicitudes</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
