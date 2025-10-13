import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { signInSchema } from "./lib/validation"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // modern, stateless sessions
  },
  providers: [
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ✅ Validate with Zod
        const result = signInSchema.safeParse(credentials)
        if (!result.success) return null
        const { email, password } = result.data

        // ✅ Check user in DB
        const user = await prisma.user.findUnique({
          where: { email },
        })
        if (!user || !user.password) return null

        // ✅ Verify password
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return null

        // ✅ Return user (NextAuth will include id/email in JWT)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],

  // ✅ Callbacks for JWT and Session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
})
