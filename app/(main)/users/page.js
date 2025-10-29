import React from 'react'
import Users from '@/components/users'

export const metadata = {
  title: "Creators – Get me a chai | Discover and Support Talented People",
  description: "Browse creators on Get me a chai — explore profiles, discover amazing talent, and support them with a cup of chai. Join the community and help your favorite creators grow, just like on Patreon.",
  keywords: ["Get me a chai creators, Patreon alternative, creator profiles, discover creators, support artists, buy me chai, fan funding, content creator community, crowdfunding for creators, artist support platform"],
  openGraph: {
    title: "Creators – Get me a chai | Discover and Support Talented People",
    description: "Explore creator profiles on Get me a chai — connect, discover, and support your favorite artists and developers with a cup of chai.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    siteName: "Get me a chai",
    locale: "en_US",
    type: "website",
  },
};

const page = () => {
  return (
    <Users/>
  )
}

export default page