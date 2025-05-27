// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Your custom axios with JWT support

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/auth/login', { email, password });

            const { token } = response.data;
            if (token) {
                localStorage.setItem('jwt', token); // 🔐 Store token
                console.log('✅ JWT stored:', token);
                navigate('/admin/dashboard'); // 🔄 Redirect
            } else {
                setError('Login failed: no token returned.');
            }
        } catch (err) {
            console.error('❌ Login error:', err);
            setError('Invalid credentials or server error.');
        }
    };

    return (
        <div className="login-form">
            <h2>🔐 Admin Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginForm;