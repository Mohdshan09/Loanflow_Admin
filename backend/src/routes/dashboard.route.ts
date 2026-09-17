import { Router } from "express";
import { getDashboardStatsController } from "../controllers/dashboard.controller.js";
import { authenticateJWT } from "@/middleware/auth.middleware.js";

const router = Router();

router.get("/stats", authenticateJWT, getDashboardStatsController);

export default router;
