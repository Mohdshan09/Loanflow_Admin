import { prisma } from "@/lib/prisma.js";
import { recalculateUserEligibility } from "../eligibility/eligibility.service.js";
import type { CreateUserInput } from "../schemas/user.schema.js";

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
    const evaluation = await recalculateUserEligibility(user.id);

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

export const deleteUser = async (id: string) => {
    return prisma.user.delete({
        where: { id },
    });
};
