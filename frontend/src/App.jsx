// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Events from './pages/Events.jsx';
import MediaGallery from './pages/MediaGallery.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

export default function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events" element={<Events />} />
                <Route path="/media" element={<MediaGallery />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </>
    );
}
