import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../components/Nav';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Events from '../pages/Events';
import MediaGallery from '../pages/MediaGallery';
import '../components/pages.css'; // or split styles as needed


function App() {
    useEffect(() => {
        const BASE_URL = import.meta.env.VITE_API_URL;

        fetch(`${BASE_URL}/api/test`)
            .then(res => res.text())
            .then(data => console.log("✅ Backend says:", data))
            .catch(err => console.error("❌ Backend failed:", err));
    }, []);

    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<div><h1>Lil Rockstars</h1></div>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events" element={<Events />} />
                <Route path="/media" element={<MediaGallery />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
