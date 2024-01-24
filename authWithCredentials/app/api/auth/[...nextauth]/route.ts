// @ts-nocheck
import { VerifyErrors, verify } from "jsonwebtoken";
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

            const user = await res.json();
            if (user) {
                console.log("loginden gelen veri"+user);

                return user
            } else {
                return null
            }

        }
    })],
    callbacks: {
        async jwt({ token, user }) {
                        
            const accessKey = process.env?.ACCESS_KEY || ''
            
      /*       let userInfo
            verify(token?.Token?.access, accessKey, (err: VerifyErrors | null, decoded: any) => {
                if (err) {
                    console.error("Access Token verification failed:", err);
                    userInfo = null
                }
                userInfo = decoded
            });
            console.log('userinfo:'+userInfo); */

            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/'
    }



})

export { handler as GET, handler as POST }


