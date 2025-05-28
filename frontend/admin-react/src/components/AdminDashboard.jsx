// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Your custom axios wrapper
import Nav from './Nav'; // Ensure this component exists

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/admin/events/all');
                setEvents(response.data);
                console.log('📦 Events:', response.data);
            } catch (err) {
                console.error("❌ Failed to fetch events", err);
                setError("Access denied or session expired.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>

            <div className="admin-dashboard">
                <h1>🛠️ Admin Dashboard</h1>
                <h2>Upcoming Events</h2>

                {loading && <p>Loading events...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <table border="1" cellPadding="8">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.name || event.title}</td>
                                <td>{event.location || 'N/A'}</td>
                                <td>{event.date || 'TBD'}</td>
                            </tr>
                        ))
                    ) : (
                        !loading && (
                            <tr>
                                <td colSpan="4">No events found.</td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;