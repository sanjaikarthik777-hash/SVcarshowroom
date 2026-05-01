import { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE } from '../api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Restore session from localStorage on page load
    useEffect(() => {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setIsAdmin(parsed.role === 'admin');
        }
    }, []);

    // Login: check admin hardcoded, then call backend for regular users
    const login = async (email, password) => {
        // Admin login (hardcoded, no DB needed)
        if (email === 'admin@luxury.com' && password === 'admin123') {
            const adminUser = { email, name: 'Admin', role: 'admin' };
            setUser(adminUser);
            setIsAdmin(true);
            localStorage.setItem('currentUser', JSON.stringify(adminUser));
            return { success: true, isAdmin: true };
        }

        // Regular user login via backend
        try {
            const res = await fetch(`${API_BASE}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.message };

            setUser(data);
            setIsAdmin(false);
            localStorage.setItem('currentUser', JSON.stringify(data));
            return { success: true, isAdmin: false };
        } catch {
            return { success: false, message: 'Server unavailable. Please try again.' };
        }
    };

    // Register new user via backend
    const register = async (name, email, password) => {
        try {
            const res = await fetch(`${API_BASE}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role: 'user' })
            });
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.message };
            return { success: true };
        } catch {
            return { success: false, message: 'Server unavailable. Please try again.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
