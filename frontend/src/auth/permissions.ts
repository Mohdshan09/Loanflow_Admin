export type Permission =
    | "dashboard:view"
    | "product:view"
    | "product:create"
    | "product:update"
    | "product:delete"
    | "user:view"
    | "user:create"
    | "user:update"
    | "user:delete";

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
} as const satisfies Record<string, Permission>;