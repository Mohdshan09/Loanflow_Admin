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

interface PasswordResetTokenPayload {
    sub: string;
    purpose: "password-reset";
}

export const generateToken = (payload: TokenPayload, rememberMe: boolean): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: rememberMe ? "10d" : "1d",
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

export const generatePasswordResetToken = (adminId: string): string => {
    return jwt.sign({ sub: adminId, purpose: "password-reset" }, JWT_SECRET, {
        expiresIn: "15m",
    });
};

export const verifyPasswordResetToken = (token: string): PasswordResetTokenPayload => {
    const decoded: jwt.JwtPayload | string = jwt.verify(token, JWT_SECRET);

    if (
        typeof decoded !== "object" ||
        decoded === null ||
        typeof decoded.sub !== "string" ||
        decoded.purpose !== "password-reset"
    ) {
        throw new Error("Invalid password reset token");
    }

    return {
        sub: decoded.sub,
        purpose: "password-reset",
    };
};
