import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password must not exceed 72 characters")
        .refine(
            (password) => password.trim().length > 0,
            "Password cannot contain only whitespace"
        ),

    rememberMe: z.boolean().default(false),

});

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name must not exceed 100 characters"),

        email: z
            .email("Invalid email address")
            .trim(),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(72, "Password must not exceed 72 characters")
            .refine(
                (password) => password.trim().length > 0,
                "Password cannot contain only whitespace"
            )
            .refine(
                (password) => /[^A-Za-z0-9\s]/.test(password),
                "Password must contain at least one special character"
            ),

        confirmPassword: z.string(),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;