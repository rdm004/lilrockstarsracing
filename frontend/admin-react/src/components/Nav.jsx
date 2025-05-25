import React from 'react';
import './AdminDashboard.css';

const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/';
};

const Nav = () => {
    return (
        <div className="navbar">
            <ul className="navbar-menu">
                <li><a href="/index.html" className="navbar-link">Home</a></li>
                <li><a href="/about.html" className="navbar-link">About</a></li>
                <li><a href="/contact.html" className="navbar-link">Contact</a></li>
                <li><a href="https://lilrockstarsracing-test.onrender.com" className="navbar-link">Events</a></li>
                <li><a href="https://lilrockstarsracing-test.onrender.com" className="navbar-link">Media</a></li>
                <li><a href="https://lilrockstarsracing-test.onrender.com" className="navbar-link">Admin</a></li>
                <li style={{ marginLeft: 'auto', paddingRight: '100px' }}>
                    <button
                        onClick={handleLogout}
                        className="navbar-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
                        onMouseOver={(e) => (e.target.style.color = 'red')}
                        onMouseOut={(e) => (e.target.style.color = 'white')}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Nav;

