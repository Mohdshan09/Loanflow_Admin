// permissions.ts

export const PERMISSIONS = {
    DASHBOARD_VIEW: "dashboard:view",

    PRODUCT_VIEW: "product:view",
    PRODUCT_CREATE: "product:create",
    PRODUCT_UPDATE: "product:update",
    PRODUCT_DELETE: "product:delete",

    USER_VIEW: "user:view",
    USER_CREATE: "user:create",
    USER_UPDATE: "user:update",
    USER_DELETE: "user:delete",
} as const;

export type Permission =
    (typeof PERMISSIONS)[keyof typeof PERMISSIONS];