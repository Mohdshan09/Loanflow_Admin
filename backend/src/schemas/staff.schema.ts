import { z } from "zod";

export const createStaffSchema = z.object({
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password must not exceed 72 characters")
        .regex(/[^A-Za-z0-9\s]/, "Password must contain at least one special character"),
    role: z.enum(["ADMIN", "VIEWER"]),
});

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
