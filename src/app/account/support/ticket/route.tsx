import { Database } from "@/lib/database.types";
import { createServerSupabaseClient } from "@/lib/supabase/supabase-server";
import { NextRequest, NextResponse } from "next/server";

type Ticket = Database["public"]["Tables"]["tickets"]["Insert"];

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const formData: Ticket = await request.json();

  const trelloApiUrl = "https://api.trello.com/1";
  const trelloCreateNewCardEndpoint = "/cards";

  const TRELLO_BOARD_LIST_ID = process.env.TRELLO_BOARD_LIST_ID;
  const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
  const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

  // basic validation
  if (!formData.appointment_date || formData.appointment_date === undefined) {
    return NextResponse.json({
      success: false,
      message: "El campo fecha es requerido.",
    });
  }

  if (!formData.title || formData.title === undefined) {
    return NextResponse.json({
      success: false,
      message: "El campo motivo es requerido.",
    });
  }

  // check if user has a pending ticket
  const { data: tickets } = await supabase
    .from("tickets")
    .select()
    .eq("user_id", formData.user_id)
    .eq("status", "PENDING");

  if (Array.isArray(tickets) && tickets.length > 0) {
    return NextResponse.json({
      success: false,
      message: "Tienes solicitudes pendientes.",
    });
  }

  // create new ticket
  const { error, data: ticket } = await supabase
    .from("tickets")
    .insert(formData)
    .select()
    .single();

  if (!error) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // create new card in trello board
    if (
      typeof TRELLO_API_KEY === "string" &&
      typeof TRELLO_TOKEN === "string" &&
      typeof TRELLO_BOARD_LIST_ID === "string"
    ) {
      const params = new URLSearchParams([
        ["idList", TRELLO_BOARD_LIST_ID],
        ["key", TRELLO_API_KEY],
        ["token", TRELLO_TOKEN],
        ["name", `[ticket#${ticket.id}] ${ticket.title}`],
        [
          "desc",
          JSON.stringify({
            desc: ticket.description,
            user_id: user?.id,
            email: user?.email,
          }),
        ],
        ["pos", "top"],
        ["due", ticket.appointment_date],
      ]);
      await fetch(
        trelloApiUrl + trelloCreateNewCardEndpoint + "?" + params.toString(),
        {
          method: "POST",
          headers: { Accept: "application/json" },
        }
      );
    }
  }

  return NextResponse.json({ success: true, ticket });
}

export async function PATCH(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const data = await request.json();

  const { error } = await supabase
    .from("tickets")
    .update({ status: data.status })
    .eq("id", data.ticket_id);

  if (error) {
    console.error(error);
    throw new Error("Error updating ticket status");
  }

  return NextResponse.json({ success: true, message: "ticket status updated" });
}
