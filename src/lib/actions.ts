'use server'
import { z } from 'zod';

const FromSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    // confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
});


export type State = {
    errors?: {
        name?: string;
        email?: string;
        password?: string;
        // confirmPassword?: string;
    };
    message?: string | null;
}
    
export async function signUpAction(preState: State, formData: FormData) {
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        // confirmPassword: formData.get('confirmPassword'),
    }

    const result = FromSchema.safeParse(data);

    if (!result.success) {
    const f = result.error.format(); // nested tree-like structure
    return {
      ...preState,
      errors: {
        name: f.name?._errors?.[0],
        email: f.email?._errors?.[0],
        password: f.password?._errors?.[0],
      },
    };
  }

    // Proceed with sign-up logic
}