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
  session: { strategy: "database" },
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
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        if (!user?.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;
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
    signIn: "/login"
  },

  callbacks: {
    async session({ session, user}) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.role = user.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
});
