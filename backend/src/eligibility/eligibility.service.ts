import { EvaluationTrigger, UserStatus } from "@/generated/prisma/client.js";
import { prisma } from "@/lib/prisma.js";
import { evaluateUserAgainstAllProducts } from "./eligibility.engine.js";

export const recalculateUserEligibility = async (
    userId: string,
    trigger: EvaluationTrigger
) => {
    return prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const products = await tx.product.findMany();
        const result = evaluateUserAgainstAllProducts(
            user,
            products
        );

        const eligibleProducts = result.results.filter(
            (item) => item.eligible
        );

        // Remove the user's previous eligibility state
        await tx.userProduct.deleteMany({
            where: {
                userId: user.id,
            },
        });

        // Store the new eligibility state
        if (eligibleProducts.length > 0) {
            await tx.userProduct.createMany({
                data: eligibleProducts.map((item) => ({
                    userId: user.id,
                    productId: item.product.id,
                })),
            });
        }

        const status =
            eligibleProducts.length > 0
                ? UserStatus.ACTIVE
                : UserStatus.REJECTED;

        await tx.user.update({
            where: {
                id: user.id,
            },
            data: {
                status,
            },
        });

        await tx.eligibilityEvaluation.create({
            data: {
                userId: user.id,
                trigger,
                results: {
                    create: result.results.map((item) => ({
                        productId: item.product.id,
                        productName: item.product.name,
                        eligible: item.eligible,
                        reasons: item.reasons,
                        decisionNote: item.eligible
                            ? "Accepted because all eligibility criteria are satisfied."
                            : `Rejected because: ${item.reasons.join("; ")}.`,
                    })),
                },
            },
        });

        return {
            status,
            results: result.results,
        };
    })
}

export const recalculateAllUsers = async (trigger: EvaluationTrigger) => {
    let successful = 0;
    let failed = 0;
    let total = 0;

    const BATCH_SIZE = 500;
    let cursor: string | undefined;

    while (true) {
        const users = await prisma.user.findMany({
            take: BATCH_SIZE,

            ...(cursor
                ? {
                    skip: 1,
                    cursor: {
                        id: cursor,
                    },
                }
                : {}),

            orderBy: {
                id: "asc",
            },
        });

        if (users.length === 0) {
            break;
        }

        total += users.length;

        for (const user of users) {
            try {
                await recalculateUserEligibility(user.id, trigger);
                successful++;
            } catch (error) {
                failed++;

                console.error(
                    `Failed to recalculate eligibility for user ${user.id}:`,
                    error
                );
            }
        }

        cursor = users[users.length - 1]!.id;
    }

    return {
        total,
        successful,
        failed,
    };
};


