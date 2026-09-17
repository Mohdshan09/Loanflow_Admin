import { prisma } from "@/lib/prisma.js";
import { recalculateAllUsers } from "../eligibility/eligibility.service.js";
import type { CreateProductInput, UpdateProductInput } from "../schemas/product.schema.js";


export const createProducts = async (data: CreateProductInput) => {
    const product = await prisma.product.create({
        data: {
            name: data.name,
            minAge: data.minAge,
            maxAge: data.maxAge,
            minCreditScore: data.minCreditScore,
            allowedEmploymentTypes: data.allowedEmploymentTypes,
            allowedSalaryTypes: data.allowedSalaryTypes,
            minSalary: data.minSalary,
        },
    })

    await recalculateAllUsers();

    return product
}

export const getProducts = async () => {
    return prisma.product.findMany({
        select: {
            id: true,
            name: true,
            minAge: true,
            maxAge: true,
            minCreditScore: true,
            allowedEmploymentTypes: true,
            allowedSalaryTypes: true,
            minSalary: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const getProductById = async (id: string) => {
    return prisma.product.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            minAge: true,
            maxAge: true,
            minCreditScore: true,
            allowedEmploymentTypes: true,
            allowedSalaryTypes: true,
            minSalary: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateProduct = async (
    id: string,
    data: UpdateProductInput
) => {
    const existingProduct = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    if (!existingProduct) {
        throw new Error("Product not found");
    }

    const updatedData = {
        name: data.name ?? existingProduct.name,
        minAge: data.minAge ?? existingProduct.minAge,
        maxAge: data.maxAge ?? existingProduct.maxAge,
        minCreditScore:
            data.minCreditScore ??
            existingProduct.minCreditScore,
        allowedEmploymentTypes:
            data.allowedEmploymentTypes ??
            existingProduct.allowedEmploymentTypes,
        allowedSalaryTypes:
            data.allowedSalaryTypes ??
            existingProduct.allowedSalaryTypes,
        minSalary:
            data.minSalary ?? existingProduct.minSalary,
    };

    if (updatedData.maxAge < updatedData.minAge) {
        throw new Error(
            "Maximum age must be greater than or equal to minimum age"
        );
    }

    const product = await prisma.product.update({
        where: {
            id,
        },
        data: updatedData,
    });

    await recalculateAllUsers();

    return product;
};

export const deleteProduct = async (id: string) => {
    const existingProduct = await prisma.product.findUnique({
        where: { id },
    });

    if (!existingProduct) {
        throw new Error("Product not found");
    }

    await prisma.product.delete({
        where: { id },
    });

    await recalculateAllUsers();

    return {
        message: "Product deleted successfully",
    };
};