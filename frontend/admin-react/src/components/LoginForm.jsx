import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
            console.log("Logging in with:", { email, password });

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                { email, password },
                { headers: { 'Content-Type': 'application/json' } } // ✅ Required header
            );

            localStorage.setItem('jwt', response.data.token);
            onLogin(); // ✅ Triggers navigation or auth state update
        } catch (err) {
            console.error(err.response || err.message);
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
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;