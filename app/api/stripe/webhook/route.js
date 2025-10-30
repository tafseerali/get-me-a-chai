import Stripe from "stripe";
import mongoose from "mongoose";
import Payment from "@/models/Payments";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text(); // ✅ raw body for Stripe signature verification
  const sig = headers().get("stripe-signature"); // ✅ correct way in App Router

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ Handle events
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await mongoose.connect(process.env.MONGO_URI);
      await Payment.findOneAndUpdate(
        { oid: session.id },
        { done: true, updatedAt: new Date() }
      );
      console.log("✅ Payment marked done for:", session.id);
    } catch (dbErr) {
      console.error("❌ Database error:", dbErr.message);
      return new Response("DB Error", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
