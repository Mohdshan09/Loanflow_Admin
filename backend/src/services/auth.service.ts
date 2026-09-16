import { prisma } from "@/lib/prisma.js"
import { LoginInput, RegisterInput } from "@/schemas/auth.schema.js";
import { comparePassword, hashPassword } from "@/utils/password.js";
import { generateToken } from "@/utils/jwt.js";

export const register = async (input: RegisterInput) => {
    const existingAdmin = await prisma.admin.findUnique({
        where: {
            email: input.email,
        },
        select: {
            id: true
        }
    });

    if (existingAdmin) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const passwordHash = await hashPassword(input.password);

    const admin = await prisma.admin.create({
        data: {
            fullName: input.fullName,
            email: input.email,
            passwordHash,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });



    return {
        user: {
            id: admin.id,
            name: admin.fullName,
            email: admin.email,
            role: admin.role,
        },
    }


}

export const login = async (input: LoginInput) => {
    const admin = await prisma.admin.findUnique({
        where: {
            email: input.email
        }
    })

    if (!admin) {
        throw new Error("Invalid Email or Password")
    }

    const passwordValid = await comparePassword(input.password, admin.passwordHash);

    if (!passwordValid) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken({
        sub: admin.id,
        role: admin.role,
    },
        input.rememberMe);

    return {
        token,
        user: {
            id: admin.id,
            name: admin.fullName,
            email: admin.email,
            role: admin.role,
        },
    }

}