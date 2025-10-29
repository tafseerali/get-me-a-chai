import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import mongoose from "mongoose"
import User from "@/models/User"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider === "google" || account.provider === "github"){
        const client = await mongoose.connect("mongodb://localhost:27017/getmeachai")
        const existingUser = await User.findOne({ email:user.email });
        if (!existingUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            username: user.name.replace(/\s+/g, '').toLowerCase(),
          })
          await newUser.save();
        }
        return true
      }
    }
  }

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }