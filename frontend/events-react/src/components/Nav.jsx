import React from 'react';

export default function Nav() {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li><a href="/"             className="navbar-link">Home</a></li>
                <li><a href="/about.html"   className="navbar-link">About</a></li>
                <li><a href="/events/"      className="navbar-link">Events</a></li>
                <li><a href="/media/"       className="navbar-link">Media</a></li>
                <li><a href="/contact.html" className="navbar-link">Contact</a></li>
            </ul>
        </nav>
    );
}