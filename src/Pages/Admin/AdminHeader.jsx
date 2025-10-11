import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import './Admin.css';

export default function AdminHeader() {
  const navigate = useNavigate();
  const { logout_user, logout } = useAuth();

  async function handleLogout() {
    try {
      if (logout_user) await logout_user();
      else if (logout) await logout();
      else {
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_token");
      }
    } finally {
      navigate("/login");
    }
  }

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <span className="admin-brand">Partitura y Toca · Admin</span>
      </div>
      <div className="admin-header__right">
        <button className="btn btn-ghost" onClick={handleLogout}>Salir</button>
      </div>
    </header>
  );
}