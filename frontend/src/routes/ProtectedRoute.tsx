import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

const ProtectedRoute = () => {
    const token = useAuthStore((state) => state.token);
    const isInitialized = useAuthStore(
        (state) => state.isInitialized
    );

    if (!isInitialized) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;