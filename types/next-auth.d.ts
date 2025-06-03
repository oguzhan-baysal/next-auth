import "next-auth"
import { JWT } from "next-auth/jwt"

export type UserRole = "admin" | "user" | "moderator"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRole
    }
  }

  interface User {
    role: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    role: UserRole
  }
} 