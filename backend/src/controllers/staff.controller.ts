import type { Request, Response } from "express";
import { createStaffSchema } from "@/schemas/staff.schema.js";
import { createStaff, listStaff } from "@/services/staff.service.js";

export const getStaffController = async (_req: Request, res: Response) => {
    try {
        res.status(200).json({ success: true, data: await listStaff() });
    } catch (error) {
        console.error("List staff error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch staff accounts" });
    }
};

export const createStaffController = async (req: Request, res: Response) => {
    const result = createStaffSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: result.error.flatten() });
        return;
    }

    try {
        const staff = await createStaff(result.data);
        res.status(201).json({ success: true, data: staff });
    } catch (error) {
        if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
            res.status(409).json({ success: false, message: "An account with this email already exists" });
            return;
        }

        console.error("Create staff error:", error);
        res.status(500).json({ success: false, message: "Failed to create staff account" });
    }
};
