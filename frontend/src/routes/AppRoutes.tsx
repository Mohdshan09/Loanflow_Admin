import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AdminLayout from '../components/layouts/AdminLayout';

import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Products/Products';
import Users from '../pages/Users/Users';
import Profile from '../pages/Profile/Profile';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Signup from '../pages/Signup/Signup';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — no layout */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes — all share one persistent AdminLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
