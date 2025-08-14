import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import z from "zod";
import { prisma } from "@/lib/prisma";

const LoginSchema = z.object({
  email: z.string().email({ message: "A valid email is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
        return isValid ? user : null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
});
