// src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from '../api/axios';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                { email, password }
            );
            localStorage.setItem('jwt', response.data.token);
            onLogin();
        } catch (err) {
            alert('Login failed: ' + (err.response?.data || err.message));
        }
    };

    return (
        <form onSubmit={login}>
            <h2>Admin Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;