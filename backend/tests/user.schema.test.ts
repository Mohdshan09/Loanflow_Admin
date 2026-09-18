import { describe, expect, it, vi } from "vitest";
import { createUserSchema } from "../src/schemas/user.schema.js";

const validApplicant = {
    fullName: "Test Applicant",
    creditScore: 750,
    employmentType: "SALARIED",
    salaryType: "DAT",
    salary: 50000,
};

describe("createUserSchema dateOfBirth", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-18T12:00:00.000Z"));

    it("rejects an applicant who turns 18 tomorrow", () => {
        const result = createUserSchema.safeParse({
            ...validApplicant,
            dateOfBirth: "2008-09-19",
        });

        expect(result.success).toBe(false);
    });

    it("accepts an applicant on their 18th birthday", () => {
        const result = createUserSchema.safeParse({
            ...validApplicant,
            dateOfBirth: "2008-09-18",
        });

        expect(result.success).toBe(true);
    });
});
