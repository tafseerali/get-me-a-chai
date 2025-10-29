import Stripe from "stripe";
import mongoose from "mongoose";
import Payment from "@/models/Payments";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const rawBody = await req.text(); // required by Stripe
  const sig = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
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

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

// Stripe needs raw body, so disable Next.js JSON parsing
export const config = {
  api: { bodyParser: false },
};
