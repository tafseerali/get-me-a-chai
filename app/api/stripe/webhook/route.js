import Stripe from "stripe";
import mongoose from "mongoose";
import Payment from "@/models/Payments";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      await mongoose.connect(process.env.MONGO_URI);
      await Payment.findOneAndUpdate(
        { oid: session.id },
        { done: true, updatedAt: new Date() }
      );
      console.log("✅ Payment marked done for:", session.id);
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
