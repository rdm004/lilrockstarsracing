import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './MediaGallery.css';
import MediaGallery from "./components/MediaGallery.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MediaGallery />
    </React.StrictMode>
);