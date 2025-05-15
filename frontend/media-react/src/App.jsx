import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MediaGallery from './components/MediaGallery';


// Placeholder Home component (if you want it in React)
function Home() {
    return <h1>Welcome to Lil Rockstars</h1>;
}

export default function App() {
    return (
        <>
            <MediaGallery />
        </>
    );
}