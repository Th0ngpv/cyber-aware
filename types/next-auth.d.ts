import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // add the ID
    } & DefaultSession["user"];
  }
}
