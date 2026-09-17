import { z } from "zod";

export const createProductSchema = z
    .object({
        name: z.string().trim().min(1, "Product name is required"),

        minAge: z
            .number()
            .int("Minimum age must be an integer")
            .nonnegative("Minimum age cannot be negative"),

        maxAge: z
            .number()
            .int("Maximum age must be an integer")
            .nonnegative("Maximum age cannot be negative"),

        minCreditScore: z
            .number()
            .int("Minimum credit score must be an integer")
            .nonnegative("Minimum credit score cannot be negative"),

        allowedEmploymentTypes: z
            .array(z.enum(["SALARIED", "SELF_EMPLOYED"]))
            .min(1, "At least one employment type is required"),

        allowedSalaryTypes: z
            .array(z.enum(["DAT", "CASH", "CHEQUE"]))
            .min(1, "At least one salary type is required"),

        minSalary: z
            .number()
            .nonnegative("Minimum salary cannot be negative"),
    })
    .refine(
        (data) => data.maxAge >= data.minAge,
        {
            message:
                "Maximum age must be greater than or equal to minimum age",
            path: ["maxAge"],
        }
    );

export const updateProductSchema = createProductSchema
    .partial()
    .refine(
        (data) => {
            if (
                data.minAge !== undefined &&
                data.maxAge !== undefined
            ) {
                return data.maxAge >= data.minAge;
            }

            return true;
        },
        {
            message:
                "Maximum age must be greater than or equal to minimum age",
            path: ["maxAge"],
        }
    );

export type CreateProductInput = z.infer<
    typeof createProductSchema
>;

export type UpdateProductInput = z.infer<
    typeof updateProductSchema
>;