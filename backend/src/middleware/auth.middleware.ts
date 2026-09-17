import type { Request, Response, NextFunction } from "express";
import type { Role } from "@/generated/prisma/client.js";
import { verifyToken } from "@/utils/jwt.js";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: Role;
            };
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        role: Role;
    };
}

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        res.status(401).json({
            message: "Authentication required",
        });
        return;
    }

    const token = authorization.slice(7).trim();

    if (!token) {
        res.status(401).json({
            message: "Authentication required",
        });
        return;
    }

    try {
        const payload = verifyToken(token);

        (req as AuthenticatedRequest).user = {
            id: payload.sub,
            role: payload.role,
        };

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token",
        });
        return;
    }
};
