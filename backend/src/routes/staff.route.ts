import { Router } from "express";
import { createStaffController, getStaffController } from "@/controllers/staff.controller.js";
import { authenticateJWT } from "@/middleware/auth.middleware.js";
import { authorize } from "@/middleware/role.middleware.js";

const router = Router();

router.use(authenticateJWT, authorize("ADMIN"));
router.get("/", getStaffController);
router.post("/", createStaffController);

export default router;
