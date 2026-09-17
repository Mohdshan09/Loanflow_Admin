import type { DashboardStatsResponse } from "../types/dashboard.types";
import { api } from "./axios";

export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
    const response = await api.get<DashboardStatsResponse>("/dashboard/stats");
    return response.data;
};
