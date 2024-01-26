import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
    // callbacks: {
    //     async session({ session, token, user }) {
    //         console.log('session/session' + session);
    //         console.log('session/token' + token,);
    //         console.log('session/user' + user);

    //         return session
    //     },
    //     async jwt({ token, user, account, profile }) {
    //         console.log('jwt/token' + token,);
    //         console.log('jwt/user' + user);
    //         console.log('jwt/account' + account,);
    //         console.log('jwt/profile' + profile);


    //         return token
    //     }
    // },
    pages: { signIn: '/' },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },

})




export { handler as GET, handler as POST }


