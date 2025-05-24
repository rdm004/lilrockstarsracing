// src/App.js
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import Nav from "./components/Nav";

function App() {
  const [token] = useState(localStorage.getItem('jwt'));

  return (
      <div>
          <Nav />
        {token ? <AdminDashboard /> : <LoginForm onLogin={() => window.location.reload()} />}
      </div>
  );
}

export default App;