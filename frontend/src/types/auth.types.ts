export type Role = "ADMIN" | "VIEWER";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe: boolean
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: "ADMIN" | "VIEWER";
    };
}

