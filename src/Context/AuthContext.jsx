import { useState, createContext, useMemo } from "react";
import { login, register } from "../API/auth";

export const AuthContext = createContext(null)
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('auth_user');
        return raw ? JSON.parse(user) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
    const [loading, setLoading] = useState(false);

    function persist({ user, token }) {
        if (user) {
            localStorage.setItem('auth_user', JSON.stringify(user));
            setUser(user);
        }
        if (token) {
            localStorage.setItem('auth_token', token);
            setToken(token);
        }
    }
    async function login_user({ email, password }) {
        setLoading(true);
        try {
            const data = await login({ email, password });
            persist({ user: data.user, token: data.token });
            return { ok: true };
        } catch (error) {
            return { ok: false, error: error.message };
        }
        finally {
            setLoading(false);
        }
    }
    async function register_user({ username, email, password }) {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            persist({ user: data.user, token: data.token });
            return { ok: true };
        } catch (error) {
            return { ok: false, error: error.message };
        }
        finally {
            setLoading(false);
        }
    }
    function logout() {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        setUser(null);
        setToken(null);
    }
    const value = useMemo(() => ({
        user,
        token,
        loading,
        login_user,
        register_user,
        logout,
        isAuth: !!token
    }), [user, token, loading]);

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}




