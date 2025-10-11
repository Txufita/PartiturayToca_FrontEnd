import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import "./auth.css";


import useAuth from "../Hooks/UseAuth";

export default function Register() {
    const {register_user: register, loading} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    async function onSubmit(event) {
        event.preventDefault();
        setError("");
        if (!form.email || !form.password || !form.confirmPassword || !form.username) {
            setError("All fields are required");
            return;
        }
        const {ok, error} = await register(form);
        if (!ok) {
            setError(error);
        }
        else {
            navigate("/");
        }
    }
    return (
        <div className="auth-card">
            <h1 className="auth-title">Registro</h1>

            <form className="authform" onSubmit={onSubmit}>
                <input className="input" type="text" placeholder="Nombre"
                    value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                <input className="input" type="email" placeholder="Email"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input className="input" type="password" placeholder="Contraseña"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <input className="input" type="password" placeholder="Confirmar contraseña"
                    value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
                <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Crear cuenta"}
                </button>
                {error && <p className="auth-msg error">{error}</p>}
            </form>

            <p className="auth-foot">
                ¿Ya tienes cuenta?
                <Link className="auth-link" to="/login"> Inicia sesión</Link>
            </p>
        </div>
    );
}


