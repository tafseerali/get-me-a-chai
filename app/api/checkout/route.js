import Stripe from "stripe";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Payment from "@/models/Payments";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const sessionAuth = await getServerSession(authOptions);
    const email = sessionAuth?.user?.email || "guest@example.com";

    const { amount, name, to_user, message, username } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Payment to ${to_user}` },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${username}?paid=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${username}?paid=false`,
      customer_email: email,
    });

    await Payment.create({
      name,
      to_user,
      email,
      oid: session.id,
      message,
      amount,
      done: false,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
