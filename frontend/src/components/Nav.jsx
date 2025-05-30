import React from 'react';
import { Link } from 'react-router-dom';
import './Events.css';

export default function Nav() {
    return (
        <div className="navbar">
            <ul className="navbar-menu">
                <li><a href="/index.html" className="navbar-link">Home</a></li>
                <li><a href="/about.html" className="navbar-link">About</a></li>
                <li><a href="/contact.html" className="navbar-link">Contact</a></li>
                <li><Link to="/events" className="navbar-link">Events</Link></li>
                <li><Link to="/media" className="navbar-link">Media</Link></li>
                <li><Link to="/admin" className="navbar-link">Admin</Link></li>
            </ul>
        </div>
    );
}
