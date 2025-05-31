import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';
import MediaGallery from './pages/MediaGallery';
import Admin from './pages/Admin'; // assume you have this
import Nav from './components/Nav';

function App() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<h1>🏁 Welcome to Lil Rockstars</h1>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events" element={<Events />} />
                <Route path="/media" element={<MediaGallery />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
