import { Router } from "express";
import {
    createUserController,
    getUsersController,
    getUserByIdController,
    deleteUserController,
} from "../controllers/user.controller.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticateJWT } from "@/middleware/auth.middleware.js";
import { authorize } from "@/middleware/role.middleware.js";

const router = Router();

// Protected user routes (Admin access)
router.post(
    "/",
    authenticateJWT,
    authorize("ADMIN"),
    validate(createUserSchema),
    createUserController
);

router.get(
    "/",
    authenticateJWT,
    getUsersController
);

router.get(
    "/:id",
    authenticateJWT,
    getUserByIdController
);

router.delete(
    "/:id",
    authenticateJWT,
    authorize("ADMIN"),
    deleteUserController
);

export default router;
