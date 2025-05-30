import React, { useEffect } from 'react';

function App() {
    useEffect(() => {
        const BASE_URL = import.meta.env.VITE_API_URL;

        fetch(`${BASE_URL}/api/test`)
            .then(res => res.text())
            .then(data => console.log("✅ Backend says:", data))
            .catch(err => console.error("❌ Backend failed:", err));
    }, []);

    return (
        <div>
            <h1>Lil Rockstars</h1>
            <p>Check the console to see if the backend responds.</p>
        </div>
    );
}

export default App;
