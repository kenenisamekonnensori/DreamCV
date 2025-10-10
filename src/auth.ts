import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import z from "zod";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: string | null;
    };
  }

  interface User {
    role: "USER" | "ADMIN";
  }
}

const LoginSchema = z.object({
  email: z.string().email({ message: "A valid email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // ✅ FIXED
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) {
          console.log("❌ Invalid credentials shape", parsed.error);
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        console.log("🔹 Found user:", user);
        if (!user?.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        console.log("🔹 Password match result:", isValid);
        if (!isValid) {
          console.log("❌ Invalid password");
          return null;
        }
        console.log("✅ Authorized:", user.email);

        return {
          id: user.id,
          name: user.name ?? undefined,
          role: user.role ?? undefined,
          email: user.email ?? undefined,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
});
