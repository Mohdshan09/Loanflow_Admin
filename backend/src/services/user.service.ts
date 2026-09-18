import { prisma } from "../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";
import { EvaluationTrigger } from "../generated/prisma/client.js";
import { recalculateUserEligibility } from "../eligibility/eligibility.service.js";
import type { CreateUserInput, UpdateUserInput } from "../schemas/user.schema.js";

export const createUser = async (data: CreateUserInput) => {
    // 1. Create user in database
    const user = await prisma.user.create({
        data: {
            fullName: data.fullName,
            dateOfBirth: data.dateOfBirth,
            creditScore: data.creditScore,
            employmentType: data.employmentType,
            salaryType: data.salaryType,
            salary: data.salary,
        },
    });

    // 2. Automatically evaluate eligibility against all products
    const evaluation = await recalculateUserEligibility(user.id, EvaluationTrigger.USER_CREATED);

    // 3. Return user with populated eligibility
    const userWithProducts = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
            eligibleProducts: {
                include: {
                    product: true,
                },
            },
        },
    });

    return {
        user: userWithProducts,
        evaluation,
    };
};

export const getUsers = async () => {
    return prisma.user.findMany({
        include: {
            eligibleProducts: {
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: { id },
        include: {
            eligibleProducts: {
                include: {
                    product: true,
                },
            },
        },
    });
};

export const updateUser = async (id: string, data: UpdateUserInput) => {
    const existingUser = await prisma.user.findUnique({ where: { id }, select: { id: true } });

    if (!existingUser) {
        throw new Error("USER_NOT_FOUND");
    }

    const updateData: Prisma.UserUpdateInput = {
        ...(data.fullName !== undefined ? { fullName: data.fullName } : {}),
        ...(data.dateOfBirth !== undefined ? { dateOfBirth: data.dateOfBirth } : {}),
        ...(data.creditScore !== undefined ? { creditScore: data.creditScore } : {}),
        ...(data.employmentType !== undefined ? { employmentType: data.employmentType } : {}),
        ...(data.salaryType !== undefined ? { salaryType: data.salaryType } : {}),
        ...(data.salary !== undefined ? { salary: data.salary } : {}),
    };

    await prisma.user.update({
        where: { id },
        data: updateData,
    });

    const evaluation = await recalculateUserEligibility(id, EvaluationTrigger.USER_UPDATED);
    const user = await getUserById(id);

    return { user, evaluation };
};

export const getUserEvaluationHistory = async (id: string) => {
    return prisma.eligibilityEvaluation.findMany({
        where: { userId: id },
        include: { results: { orderBy: { productName: "asc" } } },
        orderBy: { createdAt: "desc" },
    });
};

export const deleteUser = async (id: string) => {
    return prisma.user.delete({
        where: { id },
    });
};
