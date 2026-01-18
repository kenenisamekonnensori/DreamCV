'use server'

import { z, ZodError } from 'zod';
import prisma from '@/prisma';
import bcrypt from 'bcryptjs';
// import { signIn } from '@/auth';
// import { redirect } from 'next/navigation';
// import { AuthError } from 'next-auth';

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
// ...existing code...
export type StateLogin = {
  errors: Record<string, string>;
  message: string | null;
};

// export async function authenticate(
//   preState: State,
//   formData: FormData
// ): Promise<State> {
//   try {
//     await signIn('credentials', formData);
//     return { errors: {}, message: null }; // Success, no message
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return { errors: {}, message: 'Invalid credentials.' };
//         default:
//           return { errors: {}, message: 'Something went wrong.' };
//       }
//     }
//     throw error;
//   }
// }
// ...existing code...
// export async function authenticate(
//   preState: string | undefined,
//   formData: FormData
// ){
//   try{
//     await signIn('credentials', formData)
//   } catch(error){
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }