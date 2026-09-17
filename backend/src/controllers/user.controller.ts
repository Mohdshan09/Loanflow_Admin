import type { Request, Response } from "express";
import {
    createUser,
    getUsers,
    getUserById,
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

export const getUserByIdController = async (req: Request, res: Response) => {
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

export const deleteUserController = async (req: Request, res: Response) => {
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
