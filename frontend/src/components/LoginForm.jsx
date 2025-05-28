import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        await new Promise((res) => setTimeout(res, 1000)); // Fake login delay

        const demoEmail = "webmaster@lilrockstarsracing.com";
        const demoPassword = "admin123";

        if (email === demoEmail && password === demoPassword) {
            localStorage.setItem("jwt", "demo-token");
            console.log("✅ Fake login success!");
            onLogin();
        } else {
            setError("❌ Invalid email or password (even in demo mode)");
        }
    };

    return (
        <div className="login-form">
            <h2>🔐 Admin Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleLogin}>
                <label>Email:</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />

                <label>Password:</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />

                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

// ✅ THIS MUST BE OUTSIDE the component and not indented or nested!
export default LoginForm;







//     try {
//         const response = await axios.post('/auth/login', { email, password });
//
//         const { token } = response.data;
//         if (token) {
//             localStorage.setItem('jwt', token); // 🔐 Store token
//             console.log('✅ JWT stored:', token);
//             navigate('/admin/dashboard'); // 🔄 Redirect
//         } else {
//             setError('Login failed: no token returned.');
//         }
//     } catch (err) {
//         console.error('❌ Login error:', err);
//         setError('Invalid credentials or server error.');
//     }
// };