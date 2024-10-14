// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import { authOptions } from "@/frontend/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };