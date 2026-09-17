import { Request, Response } from "express";
import { recalculateAllUsers } from "@/eligibility/eligibility.service.js";

export const simulateRunController = async (_req: Request, res: Response) => {
    try {
        const start = performance.now();
        const result = await recalculateAllUsers();
        const end = performance.now();
        const durationMs = end - start;

        return res.status(200).json({
            message: "Simulation completed successfully",
            durationMs: Math.round(durationMs),
            ...result,
        });
    } catch (error) {
        console.error("Simulation run error:", error);
        return res.status(500).json({
            message: "Failed to run simulation",
        });
    }
};
