
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


const handler = nextAuth({
  providers: [CredentialsProvider({
    name: "credentials",
    credentials: {},
    authorize: async (credentials) => {

      if (!credentials) return null

      const { email, password } = credentials as any

      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status !== 200) return null

      const user = await res.json();

      if (res.ok && user?.Token) {
        return user?.Token
      } else {
        return null
      }

    }
  })],
  callbacks: {
    async signIn({ user }) {

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

      return true
    },

    async jwt({ token, user }) {

      let decoded
      if (typeof token.access === 'string') decoded = jwtDecode < JwtPayload > (token.access);

      return { ...token, ...user, ...decoded }
    },

    async session({ session, token, user }) {
      session.user = token as any
      return session
    },

  },
  pages: { signIn: '/' },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },

})




export { handler as GET, handler as POST }


