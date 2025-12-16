import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        accessToken?: string
        user: {
            userId: string
            email: string
            roles: string[]
            journalId?: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
        roles?: string[]
        userId?: string
        journalId?: string
    }
}
