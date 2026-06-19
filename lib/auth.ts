import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check if user has password (OAuth users won't have password)
        if (!user.password) {
          throw new Error("Please sign in with Google");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.photo,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectToDatabase();

          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user for OAuth
            await User.create({
              email: user.email!,
              username: user.name?.replace(/\s+/g, "_").toLowerCase() || user.email?.split("@")[0] || "user",
              photo: user.image || "/assets/images/default-avatar.png",
              creditBalance: 10,
              planId: 1,
            });
          } else {
            // Update existing user's photo if they signed in with Google
            if (user.image && user.image !== existingUser.photo) {
              await User.findByIdAndUpdate(existingUser._id, { photo: user.image });
            }
          }
          return true;
        } catch (error) {
          console.error("Google sign in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && token.email) {
        // For Google users, we need to fetch the user from DB to get the ID
        await connectToDatabase();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
        }
      } else if (user) {
        token.id = user.id;
      }

      // If no ID is set yet, try to get user from credentials login
      if (!token.id && user?.id) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
