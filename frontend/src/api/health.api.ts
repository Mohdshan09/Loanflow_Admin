import { api } from "./axios";

export interface HealthResponse {
    success: boolean;
    api: "connected" | "disconnected";
    database: "connected" | "disconnected";
    uptime: number;
    timestamp: string;
}

export const getSystemHealth = async (): Promise<HealthResponse> => {
    const response = await api.get<HealthResponse>("/health");
    return response.data;
};
