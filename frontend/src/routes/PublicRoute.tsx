import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

const PublicRoute = () => {
    const token = useAuthStore((state) => state.token);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;