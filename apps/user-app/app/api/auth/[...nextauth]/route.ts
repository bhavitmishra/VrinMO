import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Auth } from "../../lib/auth";
const handler = NextAuth(Auth);
export const GET = handler;
export const POST = handler;
