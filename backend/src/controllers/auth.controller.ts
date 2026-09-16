import { Request, Response } from "express"
import { loginSchema, registerSchema } from "@/schemas/auth.schema.js"
import * as authService from "@/services/auth.service.js"

export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten(),
        });
    }

    try {
        const data = await authService.register(result.data);

        return res.status(201).json({
            message: "Registration successful",
            ...data,
        });

    } catch (error) {
        if (error instanceof Error && error.message == "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });

    }
}

export const login = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten(),
        });
    }

    try {
        const data = await authService.login(result.data);

        return res.status(200).json({
            message: "Login Successful",
            ...data
        })
    } catch (error) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
}