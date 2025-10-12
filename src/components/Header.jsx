import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import useAuth from '../Hooks/UseAuth';

export default function Header() {
    const { isAuth, user, logout } = useAuth();
    const navigate = useNavigate();
    console.log(isAuth);

    function handleLogout() {
        logout();
        navigate('/');
    }


    return (
        <header className="header">
            <div className="container header-inner card">
                <Link to="/" className="logo" aria-label="Inicio">
                    <img src="/Logo.png" alt="Logo" />
                </Link>

                <nav className="nav">
                    <Link to="/">Inicio</Link>
                    <Link to="/about">Nosotros</Link>

                    {isAuth ? (
                        <>
                            <span className="user-badge">Hola {user.username}</span>
                            <button onClick={handleLogout} className="btn btn-danger btn-sm">
                                Salir
                            </button>
                        </>
                    ) : (
                        <Link className="btn btn-primary btn-sm" to="/login">
                            Entrar
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );

}