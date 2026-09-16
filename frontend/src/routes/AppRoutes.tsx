import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import Users from "../pages/Users/Users";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Signup from "../pages/Signup/Signup";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                </Route>

                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/users" element={<Users />} />
                </Route>

                {/* Unknown route */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;