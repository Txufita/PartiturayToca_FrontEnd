import { Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import "./Home.css";


export default function AdminHome() {
    const {user, logout}= useAuth();
    return (
        <div className= "adminHome">
            <header className= "adminHeader">
                <h1>Panel de administración</h1>
                <div className= "adminUser">
                    <span>{user.username}({user.role})</span>
                    <button onClick={logout} className= "btn">Cerrar sesión</button>
                </div>
            </header>
            <nav className= "adminNav">
                <Link to ="/admin/scores">Partituras🎵🎹</Link>
                <Link to ="/admin/instruments">Instrumentos🎺🎻</Link>
                <Link to ="/admin/composers">Compositores🤸</Link>
            </nav>
            <main>
                <p>Bienvenido al panel de administración</p>

            </main>
        </div>
    )
}