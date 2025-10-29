import PaymentContent from '@/components/PaymentContent';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import User from '@/models/User';

export async function generateMetadata({ params }) {
  const username = params.username;

  return {
    title: `${username} – Get me a chai | Support ${username} with Chai ☕`,
    description: `Support ${username} and your favorite creators with chai ☕. A friendly alternative to Patreon for artists, developers, and creators.`,
    keywords: ["Get me a chai", "Patreon alternative", "buy me chai", "support creators", "fan funding", "creator support platform", "chai donation", "content creator tips", "crowdfunding for creators", "support artists", "membership platform", `${username}`, `${username} profile`,],
    openGraph: {
      title: `${username} – Get me a chai | Support ${username}`,
      description: `Support ${username} and other creators with a cup of chai — a simple, meaningful way to show appreciation.`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${username}`,
      siteName: "Get me a chai",
      locale: "en_US",
      type: "profile",
    },
  };
}


export default async function Page({ params: rawParams }) {
  const params = await rawParams
  const username = params.username;
  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOne({ username }).lean();
  if (!user) {
    notFound();
  }

  return (
    <>

      <PaymentContent username={params.username} />
    </>
  );
}
