// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// 1. Define NextAuth options explicitly
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "database", // store sessions in DB
  },
  callbacks: {
    async session({ session, user }) {
      // Add the user ID from DB to session object for client-side usage
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
};

// 2. Export the handler for GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
