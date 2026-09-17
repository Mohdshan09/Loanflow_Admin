import type { Request, Response } from "express";
import { prisma } from "@/lib/prisma.js";

export const getDashboardStatsController = async (
    _req: Request,
    res: Response
) => {
    try {
        const [
            totalProducts,
            totalUsers,
            activeUsers,
            rejectedUsers,
            recentProducts,
            recentUsers,
        ] = await Promise.all([
            prisma.product.count(),
            prisma.user.count(),
            prisma.user.count({ where: { status: "ACTIVE" } }),
            prisma.user.count({ where: { status: "REJECTED" } }),
            prisma.product.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    name: true,
                    minSalary: true,
                    minCreditScore: true,
                    createdAt: true,
                },
            }),
            prisma.user.findMany({
                take: 5,
                orderBy: { updatedAt: "desc" },
                select: {
                    id: true,
                    fullName: true,
                    creditScore: true,
                    salary: true,
                    status: true,
                    updatedAt: true,
                    eligibleProducts: {
                        select: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            }),
        ]);

        const passRate =
            totalUsers > 0
                ? Number(((activeUsers / totalUsers) * 100).toFixed(1))
                : 0;

        const rejectRate =
            totalUsers > 0
                ? Number(((rejectedUsers / totalUsers) * 100).toFixed(1))
                : 0;

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                totalUsers,
                activeUsers,
                rejectedUsers,
                passRate,
                rejectRate,
                recentProducts,
                recentEvaluations: recentUsers.map((u) => ({
                    id: u.id,
                    fullName: u.fullName,
                    creditScore: u.creditScore,
                    salary: u.salary,
                    status: u.status,
                    updatedAt: u.updatedAt,
                    eligibleProductsCount: u.eligibleProducts.length,
                    productNames: u.eligibleProducts.map((ep) => ep.product.name),
                })),
            },
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics",
        });
    }
};
