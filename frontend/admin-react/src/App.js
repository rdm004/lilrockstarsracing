// src/App.js
import React, { useEffect,useState } from 'react';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import Nav from "./components/Nav";

function App() {
  const [token] = useState(localStorage.getItem('jwt'));
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/test`)
            .then(res => res.text())
            .then(data => setMessage(data))
            .catch(err => console.error('❌ API error:', err));
    }, []);

  return (
      <div>
          <Nav />
        {token ? <AdminDashboard /> : <LoginForm onLogin={() => window.location.reload()} />}
      </div>
  );
}

export default App;