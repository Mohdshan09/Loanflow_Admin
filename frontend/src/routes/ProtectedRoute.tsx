import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const isAuthenticated = false; //temporary

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;

}

export default ProtectedRoute;