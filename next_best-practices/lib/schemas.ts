import { z } from 'zod';

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters!'),
    "postal-code": z.string()
})

export type SignUpSchema = z.infer<typeof signUpSchema>