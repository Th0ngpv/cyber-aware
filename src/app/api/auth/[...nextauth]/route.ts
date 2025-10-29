import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // your Prisma client

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database", // store sessions in DB
  },
  callbacks: {
  async session({ session, user }) {
    if (session.user) session.user.id = user.id;
    return session;
  },
},
});

export { handler as GET, handler as POST };
