import { NextRequest, NextResponse } from "next/server";
import coinbase from "coinbase-commerce-node";
import { createServerSupabaseClient } from "@/lib/supabase/supabase-server";

enum PaymentStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  DELAYED = "DELAYED",
  CANCELLED = "CANCELLED",
  CONFIRMED = "CONFIRMED",
}

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();

  const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET;
  const webhookHeader = request.headers.get("x-cc-webhook-signature");
  const rawBody = await request.text();

  if (webhookHeader && COINBASE_WEBHOOK_SECRET) {
    const event = coinbase.Webhook.verifyEventBody(
      rawBody,
      webhookHeader,
      COINBASE_WEBHOOK_SECRET
    );

    let newStatus = PaymentStatus.NEW;

    if (event.data.resource === "charge" && event.type === "charge:created") {
      newStatus = PaymentStatus.NEW;
    }

    if (event.data.resource === "charge" && event.type === "charge:delayed") {
      newStatus = PaymentStatus.DELAYED;
    }

    if (event.data.resource === "charge" && event.type === "charge:pending") {
      newStatus = PaymentStatus.PENDING;
    }
    // for cancelled payments
    if (event.data.resource === "charge" && event.type === "charge:failed") {
      newStatus = PaymentStatus.CANCELLED;
    }

    if (event.data.resource === "charge" && event.type === "charge:confirmed") {
      newStatus = PaymentStatus.CONFIRMED;
      const { data: userProfile } = await supabase
        .from("profiles")
        .select()
        .eq("id", event.data.metadata.user_id)
        .single();

      // add balance to user profile
      if (userProfile?.balance !== undefined) {
        const formerBalance = Number(userProfile?.balance);
        const newBalance =
          formerBalance + Number(event.data.pricing.local.amount);
        await supabase
          .from("profiles")
          .update({ balance: newBalance })
          .eq("id", event.data.metadata.user_id);
      }
    }

    // updated payment status
    await supabase
      .from("payments")
      .update({ status: newStatus })
      .eq("charge_id", event.data.id);
  }

  return NextResponse.json(true);
}
