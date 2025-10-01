import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import "./auth.css" 

export default function Login() {
    const {login_user: login, loading} = useAuth();
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
        const {ok, error} = await login(form);
        if (!ok) {
            setError(error);
        
        }
        else {
            navigate("/");
        }
    }
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="authform" onSubmit={onSubmit}>
                <input type="email" placeholder="ejemplo@mail.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                <input type="password" placeholder="**********" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                <button type="submit" disabled={loading}>{loading ? "Cargando..." : "Entrar"}</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>¿No tienes una cuenta?<Link className="registro" to="/register"> Regístrate!</Link></p>
        </div>
    )
}