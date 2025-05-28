// src/App.js
// src/App.js
import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import Nav from './components/Nav';

function App() {
    const [token, setToken] = useState(localStorage.getItem('jwt'));

    // // Simulated optional backend connection (can remove this if not used)
    // const [message, setMessage] = useState('');
    //
    // useEffect(() => {
    //     if (token) {
    //         fetch(`${process.env.REACT_APP_API_BASE_URL}/test`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //             .then(res => res.text())
    //             .then(data => setMessage(data))
    //             .catch(err => console.warn('🔕 API test failed (optional):', err));
    //     }
    // }, [token]);

    const handleLoginSuccess = () => {
        setToken(localStorage.getItem('jwt'));
    };

    return (
        <div>
            <Nav />
            {token ? (
                <>
                    <AdminDashboard />
                </>
            ) : (
                <LoginForm onLogin={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;











//
// import React, { useEffect, useState } from 'react';
// import LoginForm from './components/LoginForm';
// import AdminDashboard from './components/AdminDashboard';
// import Nav from './components/Nav';
//
// function App() {
//     const [token, setToken] = useState(localStorage.getItem('jwt'));
//     const [message, setMessage] = useState('');
//
//     useEffect(() => {
//         // Hit a protected endpoint to verify API
//         if (token) {
//             fetch(`${process.env.REACT_APP_API_BASE_URL}/test`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//                 .then(res => res.text())
//                 .then(data => setMessage(data))
//                 .catch(err => console.error('❌ API error:', err));
//         }
//     }, [token]);
//
//     // Callback passed to LoginForm for post-login refresh
//     const handleLoginSuccess = () => {
//         setToken(localStorage.getItem('jwt')); // trigger re-render
//     };
//
//     return (
//         <div>
//             <Nav />
//             {token ? (
//                 <>
//                     <AdminDashboard />
//                     {message && <p style={{ fontStyle: 'italic' }}>🔒 Protected API says: {message}</p>}
//                 </>
//             ) : (
//                 <LoginForm onLogin={handleLoginSuccess} />
//             )}
//         </div>
//     );
// }
//
// export default App;