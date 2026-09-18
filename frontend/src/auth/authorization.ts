import { PERMISSIONS, type Permission } from './permissions';
import { type Role } from './roles';

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  ADMIN: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_DELETE,

    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.ENGINE_SIMULATE,
    PERMISSIONS.STAFF_MANAGE,
  ],

  VIEWER: [PERMISSIONS.DASHBOARD_VIEW, PERMISSIONS.PRODUCT_VIEW, PERMISSIONS.USER_VIEW],
};

export const hasPermission = (role: Role | undefined, permission: Permission): boolean => {
  if (!role) return false;

  return ROLE_PERMISSIONS[role].includes(permission);
};
