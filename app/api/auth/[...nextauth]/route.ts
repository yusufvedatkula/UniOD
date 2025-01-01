import NextAuth from "next-auth";
import { authOptions } from "@/util/authOptions";

console.log("Auth route initialized");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
