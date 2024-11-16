import type { NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";

interface CredentialsType {
  email: string;
  password: string;
}

export default {
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials as CredentialsType;

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
          // return null;
          throw new Error(data.message || "Authentication failed");
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
