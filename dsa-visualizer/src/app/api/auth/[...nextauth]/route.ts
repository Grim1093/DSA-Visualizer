import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { pool } from "@/lib/db";

export const authOptions: NextAuthOptions = {
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
    async signIn({ user }) {
      if (!user.email) return false;

      // Sync user to PostgreSQL
      try {
        const query = `
          INSERT INTO users (id, email, name, image) 
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO UPDATE 
          SET name = EXCLUDED.name, image = EXCLUDED.image, last_active_at = CURRENT_TIMESTAMP
        `;
        await pool.query(query, [user.id, user.email, user.name, user.image]);
        return true;
      } catch (error) {
        console.warn("⚠️ Warning: Database synchronization failed (PostgreSQL might not be running or tables are missing). Allowing sign-in for development.", error);
        // We return true anyway so development isn't blocked if DB isn't running
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
