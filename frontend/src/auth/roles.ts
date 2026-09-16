// auth/roles.ts

export const ROLES = {
    ADMIN: "ADMIN",
    VIEWER: "VIEWER",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];