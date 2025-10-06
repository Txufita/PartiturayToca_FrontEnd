import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

export default function ProtectedRoute({ redirectTo = "/login", requireAdmin=false }) {
    const { isAuth, user } = useAuth();
    if (!isAuth) return <Navigate to={redirectTo} replace/>
    if (requireAdmin && user?.role !== "admin") return <Navigate to="/" replace/>
    return <Outlet/>
}
