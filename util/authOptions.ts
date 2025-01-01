import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "email", type: "text", placeholder: "you@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials) {
            throw new Error("Missing credentials");
          }
  
          const { email, password } = credentials;
  
          try {
            await connectMongoDB();
            const user = await User.findOne({ email });
  
            if (!user) {
              return null;
            }
  
            // Direct password comparison
            if (password !== user.password) {
              return null;
            }
  
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name
            };
          } catch (error) {
            console.error("Error during authorization: ", error);
            throw new Error("Authorization failed");
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
      signIn: "/login",
    },
};