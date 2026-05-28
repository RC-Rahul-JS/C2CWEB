import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || Cookies.get('token') || null);
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('user_details') || localStorage.getItem('user');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    });

    const isAuthenticated = !!token;

    const login = (userData, authToken) => {
        console.log(userData, authToken);

        if (authToken) {
            localStorage.setItem('token', authToken);
            Cookies.set('token', authToken, { expires: 1, path: '/' });
            setToken(authToken);
        }
        if (userData) {
            localStorage.setItem('user_details', JSON.stringify(userData));
            localStorage.setItem('user', JSON.stringify(userData));
            if (userData.user_id || userData._id) {
                Cookies.set('user_id', userData.user_id || userData._id, { expires: 1, path: '/' });
            }
            setUser(userData);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        Cookies.remove('token');
        Cookies.remove('user_id');
        localStorage.removeItem('user_details');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        window.location.reload();
    };

    const updateUser = (newUserData) => {
        setUser(prev => {
            const updated = { ...prev, ...newUserData };
            localStorage.setItem('user_details', JSON.stringify(updated));
            localStorage.setItem('user', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
