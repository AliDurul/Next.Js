import nextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        if (!credentials) return null;

        const { email, password } = credentials as any;

        const res = await fetch(`http://localhost:8000/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const response = await res.json();
        const user = response?.Token;

        if (res.ok && user) {
          return user;
        } else {
          throw new Error(response.message || "Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = user?.access;
        token.refresh = user?.refresh;
        token.userInfo = jwtDecode<JwtPayload>(user?.access);
      }

      return token;
    },

    async session({ session, token }) {
      const { userInfo, refresh, access } = token as any;
      session.user = userInfo;
      session.accessToken = access;
      session.refreshToken = refresh;
      return session;
    },
  },
  pages: { signIn: "/", signOut: "/" },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
