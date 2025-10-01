import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

export default function ProtectedRoute({ redirectTo = "/login" }) {
    const { isAuth } = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}
