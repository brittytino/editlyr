import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { APP_NAME } from "@/lib/constants"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                // Call NestJS API to validate
                const res = await fetch(`${process.env.API_URL}/auth/login`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                })

                const user = await res.json()

                if (res.ok && user) {
                    return user // Contains access_token
                }
                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (user) {
                token.accessToken = user.access_token
                token.user = user // Store user info
            }
            return token
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken
            session.user = token.user
            return session
        },
    },
    pages: {
        signIn: "/auth/login",
    },
}
