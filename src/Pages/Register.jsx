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
        <div className="login-container">
            <h1>Register</h1>
            <form className="authform" onSubmit={onSubmit}>
                <input type="text" placeholder="Nombre" value={form.username} onChange={e => setForm({...form, username: e.target.value})}/>
                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                <input type="password" placeholder="Contraseña" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                <input type="password" placeholder="Confirmar contraseña" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} />
                <button type="submit" disabled={loading}>{loading ? "Loading..." : "Register"}</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>Already have an account? <Link className="registro" to="/login">Login</Link></p>
        </div>
    )
}


