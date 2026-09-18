import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getAuditLogsController = async (_req: Request, res: Response) => {
    try {
        const logs = await prisma.eligibilityEvaluation.findMany({
            take: 100,
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { id: true, fullName: true } },
                results: { select: { productName: true, eligible: true, decisionNote: true } },
            },
        });

        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        console.error("Get audit logs error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch audit logs" });
    }
};
