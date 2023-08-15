import { NextRequest, NextResponse } from "next/server";
import coinbase from "coinbase-commerce-node";
import { createServerSupabaseClient } from "@/lib/supabase/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const Client = coinbase.Client;
  const resources = coinbase.resources;
  const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
  const data = await request.json();

  if (COINBASE_API_KEY) {
    Client.init(COINBASE_API_KEY);
  } else {
    return NextResponse.json("internal server error", { status: 500 });
  }

  // basic request validation
  const { user_id, amount } = data;
  const user = await supabase.from("users").select().eq("id", user_id).single();
  if (!user) {
    return NextResponse.json("user not found", { status: 404 });
  }

  if (!amount) {
    return NextResponse.json("bad request", { status: 400 });
  }

  // check if user has any new charge
  const { data: payment } = await supabase
    .from("payments")
    .select()
    .eq("user_id", user_id)
    .eq("status", "NEW")
    .single();

  if (payment) {
    return NextResponse.json(
      {
        sucess: false,
        message:
          "Tienes una transacción abierta, ve al siguente url para procesar tu pago",
        hosted_url: payment.hosted_url,
      },
      { status: 409 }
    );
  }

  try {
    // create new coinbase charge
    const charge = await resources.Charge.create({
      name: "Add founds",
      description: "Add founds to your Mail Guard account",
      local_price: {
        amount,
        currency: "USD",
      },
      pricing_type: "fixed_price",
      metadata: {
        user_id,
      },
    });

    // create row in payments table
    await supabase.from("payments").insert({
      amount: amount,
      user_id: user_id,
      status: "NEW",
      charge_id: charge.id,
      hosted_url: charge.hosted_url,
    });

    return NextResponse.json({ charge }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
