import jwt from "jsonwebtoken";
import type { Role } from "../generated/prisma/client.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export interface TokenPayload {
    sub: string;
    role: Role;
}

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h",
    });
};

export const verifyToken = (token: string): TokenPayload => {
    const decoded: jwt.JwtPayload | string = jwt.verify(
        token,
        JWT_SECRET
    );

    if (
        typeof decoded !== "object" ||
        decoded === null ||
        typeof decoded.sub !== "string" ||
        (decoded.role !== "ADMIN" && decoded.role !== "VIEWER")
    ) {
        throw new Error("Invalid token payload");
    }

    return {
        sub: decoded.sub,
        role: decoded.role,
    };
};