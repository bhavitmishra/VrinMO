import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@repo/db";
import { AuthOptions, Account, Profile, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const Auth: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        console.log("user: ", user);
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        console.log("session: ", session.user);
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async signIn({ user, account }: { user: User; account: Account | null }) {
      console.log("hi signin");

      if (!user) {
        return false;
      }
      if (!user.email && user) {
        user.email = `${user.name?.replace(/\s+/g, "").toLowerCase()}@github.local`;
      }
      if (!account) {
        return false;
      }

      await prisma.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          //@ts-ignore
          email: user.email,
        },
        create: {
          //@ts-ignore
          email: user.email,
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github",
        },
        update: {
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github",
        },
      });

      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
