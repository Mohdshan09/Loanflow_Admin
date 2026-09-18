import { z } from "zod";
import { calculateAge } from "../eligibility/eligibility.utils.js";

export const createUserSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters"),

    dateOfBirth: z
        .string()
        .or(z.date())
        .pipe(z.coerce.date())
        .refine((dob) => {
            const age = calculateAge(dob);
            return age >= 18 && age <= 100;
        }, "Applicant must be between 18 and 100 years old"),

    creditScore: z
        .number()
        .int("Credit score must be an integer")
        .min(300, "Minimum credit score is 300")
        .max(900, "Maximum credit score is 900"),

    employmentType: z.enum(["SALARIED", "SELF_EMPLOYED"], {
        message: "Employment type must be SALARIED or SELF_EMPLOYED",
    }),

    salaryType: z.enum(["DAT", "CASH", "CHEQUE"], {
        message: "Salary type must be DAT, CASH, or CHEQUE",
    }),

    salary: z
        .number()
        .positive("Salary must be greater than zero"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, "At least one field must be provided");

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
