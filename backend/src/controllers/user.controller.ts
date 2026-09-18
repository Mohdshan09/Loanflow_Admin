import type { Request, Response } from "express";
import {
    createUser,
    getUsers,
    getUserById,
    getUserEvaluationHistory,
    updateUser,
    deleteUser,
} from "../services/user.service.js";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const result = await createUser(req.body);
        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error("Create user error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create user",
        });
    }
};

export const getUserEvaluationHistoryController = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        const history = await getUserEvaluationHistory(req.params.id);
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        console.error("Get user evaluation history error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch evaluation history" });
    }
};

export const getUsersController = async (_req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error: any) {
        console.error("Get users error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};

export const getUserByIdController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        console.error("Get user by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
        });
    }
};

export const updateUserController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const result = await updateUser(req.params.id, req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        if (error instanceof Error && error.message === "USER_NOT_FOUND") {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        console.error("Update user error:", error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};

export const deleteUserController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        await deleteUser(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error: any) {
        console.error("Delete user error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
};
