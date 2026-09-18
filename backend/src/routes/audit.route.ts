import { Router } from "express";
import { getAuditLogsController } from "@/controllers/audit.controller.js";
import { authenticateJWT } from "@/middleware/auth.middleware.js";
import { authorize } from "@/middleware/role.middleware.js";

const router = Router();
router.get("/", authenticateJWT, authorize("ADMIN"), getAuditLogsController);

export default router;
