import { Product } from "@/generated/prisma/client.js";

// Types used by the eligibility engine.\n
export interface EligibilityResult {
    eligible: boolean;
    reasons: string[];
}

export interface ProductEligibilityResult {
    product: Product;
    eligible: boolean;
    reasons: string[];
}

export interface UserEligibilityResult {
    results: ProductEligibilityResult[];
}