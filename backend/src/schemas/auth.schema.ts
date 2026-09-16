import { z } from "zod";

export const registerSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must not exceed 100 characters"),

    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .pipe(z.email("Invalid Email Address")),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password must not exceed 72 characters")
        .refine(
            (password) => password.trim().length > 0,
            "Password cannot contain only whitespace"
        )
        .regex(
            /[^A-Za-z0-9\s]/,
            "Password must contain at least one special character"
        ),

})


export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .pipe(z.email("Invalid email address")),

    password: z
        .string()
        .min(1, "Password is required")
        .refine(
            (password) => password.trim().length > 0,
            "Password cannot contain only whitespace"
        ),

    rememberMe: z.boolean().default(false),

});

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>;