import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./auth.css"

export default function Login() {
    const { login_user: login, loading } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    async function onSubmit(event) {
        event.preventDefault();
        setError("");
        if (!form.email || !form.password) {
            setError("Se necesita email y contraseña");
            return;
        }
        const { ok, error, user } = await login(form);
        if (!ok) {
            setError(error);
            return;
        }

        // Redirección por rol
        if (user?.role === "admin") {
            navigate("/admin/scores");
        } else {
            navigate("/");
        }
    }
    return (
        <div className="auth-card">
            <h1 className="auth-title">Login</h1>

            <form className="authform" onSubmit={onSubmit}>
                <input className="input" type="email" placeholder="ejemplo@mail.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input className="input" type="password" placeholder=""
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Entrar"}
                </button>
                {error && <p className="auth-msg error">{error}</p>}
            </form>
            <p>¿No tienes una cuenta?<Link className="registro" to="/register"> Regístrate!</Link></p>
        </div>
    );

}