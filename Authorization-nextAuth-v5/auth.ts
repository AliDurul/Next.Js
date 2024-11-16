import NextAuth from "next-auth";
import { jwtDecode } from "jwt-decode";
import { userInfo } from "@/types/next-auth";
import { JWT } from "next-auth/jwt";
import authConfig from "@/auth.config";
import Credentials from "@auth/core/providers/credentials";
interface CredentialsType {
  email: string;
  password: string;
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials as any;

        const res = await fetch(`http://localhost:8000/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        const user = data?.Token;

        if (res.ok && user) {
          return user;
        } else {
          // return null
          throw new Error(data.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = user?.access;
        token.refresh = user?.refresh;
        token.expiresAt = Math.floor(Date.now() / 1000 + 60 * 60 * 24);
        token.userInfo = jwtDecode<userInfo>(user?.access);
        return token;
      } else if (Date.now() < token?.expiresAt * 1000) {
        return token;
      } else {
        try {
          const res = await fetch("http://127.0.0.1:8000/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: token.refresh }),
          });

          const tokens = await res.json();

          if (!res.ok) throw tokens;

          token.access = tokens?.Token?.access;
          token.expiresAt = Math.floor(Date.now() / 1000 + 60 * 60 * 24);

          return token;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },

    async session({ session, token }) {
      const { userInfo, refresh, access, error } = token as JWT;
      session.user = userInfo;
      session.accessToken = access;
      session.refreshToken = refresh;
      session.error = error;
      return session;
    },
  },
  pages: { signIn: "/", signOut: "/" },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 3 * 24 * 60 * 60 },
});
