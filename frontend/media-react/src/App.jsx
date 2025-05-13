import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import MediaGallery from './components/MediaGallery';


// Placeholder Home component (if you want it in React)
function Home() {
    return <h1>Welcome to Lil Rockstars</h1>;
}

function App() {
    return (
        <Router>
            {/* Render the nav on every route */}
            <Nav />

            <Routes>
                {/* Media Route */}
                <Route path="/media" element={<MediaGallery />} />
            </Routes>
        </Router>
    );
}

export default App;