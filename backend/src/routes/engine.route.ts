import { Router } from "express";
import { simulateRunController } from "../controllers/engine.controller.js";
import { authenticateJWT } from "@/middleware/auth.middleware.js";
import { authorize } from "@/middleware/role.middleware.js";

const router = Router();

router.post(
    "/simulate",
    authenticateJWT,
    authorize("ADMIN"),
    simulateRunController
);

export default router;
