// Core reusable, deterministic eligibility engine.\n

import type { Product, User } from "../generated/prisma/client.js";
import type { EligibilityResult, UserEligibilityResult } from "./eligibility.types.js";
import { calculateAge } from "./eligibility.utils.js";

export const evaluateUserAgainstProduct = (
    user: User,
    product: Product
): EligibilityResult => {
    const reasons: string[] = []
    const age = calculateAge(user.dateOfBirth);

    if (age < product.minAge) {
        reasons.push("Age is below the minimum requirement");
    }

    if (age > product.maxAge) {
        reasons.push("Age is above the maximum requirement");
    }

    if (user.creditScore < product.minCreditScore) {
        reasons.push("Credit score is below the minimum requirement");
    }

    if (!product.allowedEmploymentTypes.includes(user.employmentType)) {
        reasons.push("Employment type is not allowed");
    }

    if (!product.allowedSalaryTypes.includes(user.salaryType)) {
        reasons.push("Salary type is not allowed");
    }

    if (user.salary.lt(product.minSalary)) {
        reasons.push("Salary is below the minimum requirement");
    }

    return {
        eligible: reasons.length === 0,
        reasons,
    };

}

export const evaluateUserAgainstAllProducts = (
    user: User,
    products: Product[]
): UserEligibilityResult => {
    const results = products.map((product) => {
        const result = evaluateUserAgainstProduct(user, product);

        return {
            product,
            eligible: result.eligible,
            reasons: result.reasons,
        };
    })

    return {
        results,
    };
}
