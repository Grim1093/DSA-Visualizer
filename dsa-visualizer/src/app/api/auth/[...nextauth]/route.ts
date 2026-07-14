import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import PostgresAdapter from "@auth/pg-adapter"
import { pool } from "@/lib/db"

const handler = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },
  },
})

export { handler as GET, handler as POST }
