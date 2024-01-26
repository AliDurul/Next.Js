
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JwtPayload, jwtDecode } from "jwt-decode";

const handler = nextAuth({
    providers: [CredentialsProvider({
        name: "credentials",
        credentials: {},
        authorize: async (credentials, req) => {

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
        async jwt({ token, user}) {
            let decoded
            if (typeof token.access === 'string') decoded = jwtDecode < JwtPayload > (token.access);

            return { ...token, ...user, ...decoded }
        },
        async session({ session, token, user }) {
            session.user = token
            return session
        },
    },
    pages: { signIn: '/' },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },

})




export { handler as GET, handler as POST }


