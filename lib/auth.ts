import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import { UserRole } from "../types/next-auth"

// ========================================
// DEMO TEST KULLANICILARI
// ========================================
// Bu kullanıcılar demo ve test amaçlı tanımlanmıştır
// Gerçek uygulamada roller veritabanından gelmelidir

// 🔴 ADMIN KULLANICILARI
const ADMIN_EMAILS = [
  "admin@example.com",      // Şifre: Admin123!
  "oguzh@example.com",      // Test için ek admin
  // Kendi email'inizi buraya ekleyebilirsiniz
]

// 🟡 MODERATOR KULLANICILARI  
const MODERATOR_EMAILS = [
  "moderator@example.com",  // Şifre: Moderator123!
]

// 🟢 Diğer tüm emailler otomatik "user" rolü alır:
// - user@example.com       // Şifre: User123!  
// - demo@example.com       // Şifre: Demo123!
// - herhangi başka email   // Şifre: kullanıcının belirlediği

/**
 * Email bazlı rol belirleme fonksiyonu
 * @param email - Kullanıcının email adresi
 * @returns UserRole - admin | moderator | user
 */
function getUserRole(email?: string | null): UserRole {
  if (!email) return "user"
  
  if (ADMIN_EMAILS.includes(email)) return "admin"
  if (MODERATOR_EMAILS.includes(email)) return "moderator"
  
  return "user"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.role = getUserRole(user.email)
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}) 