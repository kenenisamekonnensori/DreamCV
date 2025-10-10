'use server'

import { email, z, ZodError } from 'zod';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { error } from 'console';

const FromSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    // confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
});


type FieldErrors = Partial<Record<'name' | 'email' | 'password', string>>;

function toFieldErrors(err: ZodError): FieldErrors {
  const firstByPath: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = (issue.path[0] as string) ?? 'form';
    if (!(key in firstByPath)) {
      firstByPath[key] = issue.message;
    }
  }
  return {
    name: firstByPath.name,
    email: firstByPath.email,
    password: firstByPath.password,
  };
}

export type State = {
  errors?: {
    name?: string
    email?: string
    password?: string
    form?: string
  } | undefined;
  message?: string | null;
}
    
export async function signUpAction(preState: State, formData: FormData): Promise<State> {
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        // confirmPassword: formData.get('confirmPassword'),
    }
    
    const errors: State['errors'] = {}
    const result = FromSchema.safeParse(data);

    if (!result.success) {
      const errors = toFieldErrors(result.error); 
      return { ...preState, errors };
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        ...preState,
        errors: {
          email: 'Email is already in use',
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      ...preState,
      message: 'User created successfully',
    };
  }
    // const parsed = FromSchema.safeParse({
    //   email: formData.get('email'),
    //   password: formData.get('password'),
    // });

    // if(!parsed.success) {
    //   const errors = toFieldErrors(parsed.error); 
    //   return { ...preState, errors };
    // }
export async function signInAction(prevState: State, formData: FormData): Promise<State> {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // 🧩 Basic validation
  if (!email || !password) {
    return { ...prevState, message: "Email and password are required." };
  }

  try {
    // 🟢 Attempt sign in
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/", // 👈 Redirect after success
    });

    // If signIn doesn't redirect immediately, show a feedback message
    return { ...prevState, message: "Redirecting to your dashboard..." };

  } catch (error: any) {
    // 🧩 Ignore the special Next.js redirect signal
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    // 🧩 Handle common Auth errors
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { ...prevState, message: "Invalid email or password." };
      }
      return { ...prevState, message: "Authentication failed." };
    }

    console.error("❌ Unexpected sign-in error:", error);
    return { ...prevState, message: "Something went wrong." };
  }
}

export async function loginWithGoogle() {
  "use server";
  await signIn("google", { redirectTo: "/" });
}