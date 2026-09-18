import { Request, Response } from "express";
import {
    forgotPasswordSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema,
    updateProfileSchema,
} from "../schemas/auth.schema.js";
import * as authService from "../services/auth.service.js";


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
        if (
            error instanceof Error &&
            error.message === "EMAIL_ALREADY_EXISTS"
        ) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten(),
        });
    }

    try {
        const data = await authService.login(result.data);

        return res.status(200).json({
            message: "Login successful",
            ...data,
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
};

export const logout = async (_req: Request, res: Response) => {
    return res.status(200).json({
        message: "Logout successful",
    });
};

export const updateProfile = async (req: Request, res: Response) => {
    const result = updateProfileSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten(),
        });
    }

    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const data = await authService.updateProfile(req.user.id, result.data);

        return res.status(200).json({
            message: "Profile updated successfully",
            ...data,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const result = forgotPasswordSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten(),
        });
    }

    try {
        const resetToken = await authService.requestPasswordReset(result.data);

        return res.status(200).json({
            message: "If an account exists for that email, a password reset link has been created.",
            ...(process.env.NODE_ENV !== "production" && resetToken ? { resetToken } : {}),
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ message: "Unable to request a password reset" });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const result = resetPasswordSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten(),
        });
    }

    try {
        await authService.resetPassword(result.data);
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        if (
            error instanceof Error &&
            (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError")
        ) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Unable to reset password" });
    }
};
