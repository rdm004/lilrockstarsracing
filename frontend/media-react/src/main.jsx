// Media-main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';            // or your top‐level component
import './components/MediaGallery.css';
createRoot(document.getElementById('root')).render(<App />);