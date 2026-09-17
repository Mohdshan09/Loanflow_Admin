import express from "express";
import cors from "cors";
import authRoutes from "@/routes/auth.routes.js";
import productRoutes from "@/routes/product.route.js";
import dashboardRoutes from "@/routes/dashboard.route.js";
import userRoutes from "@/routes/user.route.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { prisma } from "./lib/prisma.js";

const app = express();

// middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health-check endpoint
app.get("/", (_req, res) => {
    res.json({
        message: "API is working !",
    });
});

app.get("/api/health", async (_req, res) => {
    let databaseStatus: "connected" | "disconnected" = "disconnected";
    try {
        await prisma.$queryRaw`SELECT 1`;
        databaseStatus = "connected";
    } catch (error) {
        databaseStatus = "disconnected";
    }

    res.json({
        success: true,
        api: "connected",
        database: databaseStatus,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

import engineRoutes from "@/routes/engine.route.js";

app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/engine", engineRoutes);

app.use(errorHandler);

export default app;
