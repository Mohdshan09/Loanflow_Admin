//Authentication module
import { Request, Response, NextFunction } from "express";
import type { Role } from "@/generated/prisma/client.js";
import { verifyToken } from "@/utils/jwt.js";

export interface AuthenticatedRequest extends Request {
    user: {
        id: string,
        role: Role
    };
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    try {
        const payload = verifyToken(token);

        (req as AuthenticatedRequest).user = {
            id: payload.sub,
            role: payload.role
        }

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }

}