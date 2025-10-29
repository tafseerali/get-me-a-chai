export const metadata = {
  title: "Login – Get me a chai | Sign In to Support or Create",
  description: "Log in to your Get me a chai account to support your favorite creators or manage your own creator profile. Join a friendly Patreon-style community built around chai and creativity.",
  keywords: ["Get me a chai login, Patreon alternative, creator login, user login, sign in, buy me chai, support creators, fan funding, creator support platform, membership platform, content creator account"],
  openGraph: {
    title: "Login – Get me a chai | Sign In to Support or Create",
    description: "Access your Get me a chai account to support creators or grow your own community through chai-powered support.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
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

export default function AuthLayout({ children }) {
  return (
    <div>
        {children}
      </div>
  );
}
