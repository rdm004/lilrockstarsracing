import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MediaGallery from './components/MediaGallery'; // Make sure the path is correct

function App() {
    return (
        <Router>
            <header>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        <li><Link to="/" style={styles.link}>Home</Link></li>
                        <li><Link to="/gallery" style={styles.link}>Gallery</Link></li>
                        {/* Add other links as needed */}
                    </ul>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<MediaGallery />} />
                </Routes>
            </main>
        </Router>
    );
}

// A simple home page to show on "/"
function Home() {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Welcome to Lil Rockstars Racing</h1>
            <p>Click Gallery in the menu to view race photos.</p>
        </div>
    );
}

// Simple inline styles for quick setup
const styles = {
    nav: {
        backgroundColor: '#333',
        padding: '1rem',
    },
    navList: {
        display: 'flex',
        gap: '2rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
};

export default App;