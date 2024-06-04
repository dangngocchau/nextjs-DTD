import { z } from 'zod';

export const RegisterBody = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
}).strict().superRefine(({password, confirmPassword},ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        })
    }
})

export type RegisterBodyType = z.infer<typeof RegisterBody>