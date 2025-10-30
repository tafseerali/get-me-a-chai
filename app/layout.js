import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeModeScript } from 'flowbite-react';
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a chai",
  description: "Support your favourite creators with chai ☕",
  keywords: ["Get me a chai, Patreon alternative, buy me chai, support creators, fan funding, creator support platform, chai donation, content creator tips, crowdfunding for creators, support artists, membership platform"],
  openGraph: {
    title: "Get me a chai – A Friendly Alternative to Patreon for Creators",
    description: "Support creators and artists with a cup of chai — a simple, meaningful way to show appreciation.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Get me a chai",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
         <link rel="icon" href="/logo.png" sizes="any" />
         <meta name="google-site-verification" content="oZonLHfhtwnr0rlgbcG4GUbPyHNFcKF0g_4bmHX6vrk" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <SessionWrapper>
        {children}
      </SessionWrapper>
        </body>
    </html>
  );
}
