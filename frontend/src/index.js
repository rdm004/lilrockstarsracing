import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Required for <Link>
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>       {/* ✅ Wrap App in Router context */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();