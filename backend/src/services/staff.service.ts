import { prisma } from "@/lib/prisma.js";
import { hashPassword } from "@/utils/password.js";
import type { CreateStaffInput } from "@/schemas/staff.schema.js";

const staffSelect = {
    id: true,
    fullName: true,
    email: true,
    role: true,
    createdAt: true,
} as const;

export const listStaff = async () => {
    return prisma.admin.findMany({ select: staffSelect, orderBy: { createdAt: "desc" } });
};

export const createStaff = async (input: CreateStaffInput) => {
    const existingStaff = await prisma.admin.findUnique({ where: { email: input.email } });
    if (existingStaff) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    return prisma.admin.create({
        data: {
            fullName: input.fullName,
            email: input.email,
            passwordHash: await hashPassword(input.password),
            role: input.role,
        },
        select: staffSelect,
    });
};
