import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const handler = nextAuth({
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
/*     async signIn({ user }) {
      cookies().set({
        name: "access-token",
        value: user?.access,
        httpOnly: true,
        path: "/",
        maxAge: 5 * 60,
      });

      cookies().set({
        name: "refresh-token",
        value: user?.refresh,
        httpOnly: true,
        path: "/",
        maxAge: 24 * 60 * 60,
      });

      return true;
    }, */

    async jwt({ token, user }) {
      interface UserInfo extends JwtPayload {
        id: number;
        firstName: string;
        lastName: string;
        nrcNo: string;
        phoneNO: string;
        address: string;
        role: number;
        email: string;
        isActive: boolean;
        isVerified: boolean;
        emailToken: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        iat: number;
        exp: number;
      }

      let decoded;
      if (typeof token.access === "string")
        decoded = jwtDecode<UserInfo>(token.access);

      return { ...token, ...user, ...decoded };
    },

    async session({ session, token }) {
      const { access, refresh, ...userInfo } = token as any;
      session.user = userInfo;
      session.accessToken = access;
      session.refreshToken = refresh;
      return session;
    },
  },
  pages: { signIn: "/" },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 1 * 60},
});

export { handler as GET, handler as POST };
