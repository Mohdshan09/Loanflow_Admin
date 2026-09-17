import { Router } from "express";

import {
    login,
    logout,
    register,
    updateProfile,
} from "@/controllers/auth.controller.js";

const router = Router();

router.post("/login", login);

router.post("/register", register);

import { authenticateJWT } from "@/middleware/auth.middleware.js";

router.post("/logout", logout);

router.put("/profile", authenticateJWT, updateProfile);

export default router;