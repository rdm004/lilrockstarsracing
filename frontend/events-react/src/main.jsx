// Events-main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './components/Events.css';   // only your component CSS

const container = document.getElementById('root');
createRoot(container).render(<App />);