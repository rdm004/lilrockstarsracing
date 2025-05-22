import React from 'react';
import './Events.css'

export default function Nav() {
    return (
        <div className="navbar">
            <ul className="navbar-menu">
                <li><a href="/index.html" className="navbar-link">Home</a></li>
                <li><a href="/about.html" className="navbar-link">About</a></li>
                <li><a href="/contact.html" className="navbar-link">Contact</a></li>
                <li><a href="http://localhost:5173" className="navbar-link">Events</a></li>
                <li><a href="http://localhost:5174" className="navbar-link">Media</a></li>
                <li><a href="http://localhost:3000" className="navbar-link">Admin</a></li>
            </ul>
        </div>
    );
}