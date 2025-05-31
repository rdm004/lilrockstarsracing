import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';
import MediaGallery from './pages/MediaGallery';
import AdminDashboard from './pages/AdminDashboard';

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

// Optional: placeholder home component
function Home() {
    return (
        <main style={{ padding: '2rem' }}>
            <h2>Welcome to Lil Rockstars Racing!</h2>
            <p>This is the home page. Navigate above to explore.</p>
        </main>
    );
}
