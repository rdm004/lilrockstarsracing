import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MediaGallery from './components/MediaGallery';
import Nav from "./components/Nav.jsx";


// Placeholder Home component (if you want it in React)
function Home() {
    return <h1>Welcome to Lil Rockstars</h1>;
}

export default function App() {
    return (
        <>
            <Nav />
            <MediaGallery />
        </>
    );
}