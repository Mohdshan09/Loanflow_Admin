import { Router } from "express";

import {
    login,
    logout,
    forgotPassword,
    register,
    resetPassword,
    updateProfile,
} from "@/controllers/auth.controller.js";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

import { authenticateJWT } from "@/middleware/auth.middleware.js";

router.post("/logout", logout);

router.put("/profile", authenticateJWT, updateProfile);

export default router;
