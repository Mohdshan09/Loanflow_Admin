import type { NextFunction, Request, Response } from "express";
import type { Role } from "../generated/prisma/client.js";
import type { AuthenticatedRequest } from "./auth.middleware.js";

export const authorize = (...allowedRoles: Role[]) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const user = (req as AuthenticatedRequest).user;

        if (!user) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action",
            });
        }

        next();

    }
}