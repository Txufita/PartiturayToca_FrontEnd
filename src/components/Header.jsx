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
        <header className='header'>
            <div className="container">
                <div>
                    <Link to="/" className="logo">
                        <img src="/Logo.png" alt="Logo" />
                    </Link>
                </div>

                <nav className='nav'>
                    <Link to="/">Inicio</Link>
                    <Link to="/about">Nosotros</Link>
                    {isAuth ? (
                        <><span className='user'>Hola</span>
                            <button onClick={handleLogout} className='btn-logout'>Salir</button>
                        </>
                    ) : (
                        <Link className="btn-out" to="/login">Entrar</Link>

                    )}
                </nav>
            </div>
        </header>
    );
}
