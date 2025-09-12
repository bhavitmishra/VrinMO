import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/db";
import bcrypt from "bcrypt";

export const Auth = {
  providers: [
    CredentialsProvider({
      name: "Phone Number",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "1234567890" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          console.log("credentials", credentials);

          const existingUser = await prisma.user.findUnique({
            //@ts-ignore
            //@ts-ignore
            where: { number: credentials.phone },
          });
          console.log("existing user", existingUser);

          if (existingUser) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );

            if (isPasswordCorrect) {
              return {
                id: existingUser.id.toString(),
                //@ts-ignore
                number: existingUser.number,
                name: existingUser.name,
                //@ts-ignore
                email: existingUser.email,
              };
            }
            // If password is not correct, deny access
            return null;
          } else {
            // -- SIGN UP LOGIC --
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                //@ts-ignore
                number: credentials.phone,
                password: hashedPassword,
              },
            });

            const balance = await prisma.balance.create({
              data: {
                amount: 0,
                userId: newUser.id,
                id: newUser.id * 10,
                locked: 0,
              },
            });

            // Return the new user object to sign them in immediately after creation
            return {
              id: newUser.id.toString(),
              //@ts-ignore
              number: newUser.number,
              name: newUser.name,
              //@ts-ignore
              email: newUser.email || "",
            };
          }
        } catch (e) {
          console.error(e);
          // Return null if any error occurs
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // These callbacks are essential to get the user ID in the session
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.number = user.number;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.number = token.number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
