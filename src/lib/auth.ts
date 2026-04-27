import "server-only";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("ENV EMAIL:", process.env.ADMIN_EMAIL)
        console.log("ENV HASH exists:", !!process.env.ADMIN_PASSWORD_HASH)
        console.log("Input email:", credentials?.email)
        console.log("Input password length:", credentials?.password?.length)

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) {
          console.error("[auth] ADMIN_EMAIL or ADMIN_PASSWORD_HASH missing");
          return null;
        }
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";
        
        console.log("[auth] Login attempt for email:", email);
        
        if (!email || !password) return null;
        if (email !== adminEmail.toLowerCase()) {
          console.log("[auth] Email does not match ADMIN_EMAIL");
          return null;
        }

        const ok = await bcrypt.compare(password, adminHash);
        console.log("[auth] bcrypt.compare result:", ok);
        
        if (!ok) return null;

        return { id: "admin", email: adminEmail, name: "Admin" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role =
          (token as { role?: string }).role;
      }
      return session;
    },
  },
};
