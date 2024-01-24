import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";



const handler = NextAuth({
    providers: [CredentialsProvider({
        name: "credentials",
        credentials: {},

        async authorize(credentials, req) {


            const res = await fetch(`http://localhost:8000/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });


            if (res.status !== 200) return null

            const user = await res.json()

            if (user) {
                return user
            } else {
                return null
            }

        }
    })],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    }



})

export { handler as GET, handler as POST }