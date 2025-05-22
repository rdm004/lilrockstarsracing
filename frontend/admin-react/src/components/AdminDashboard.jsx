// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import api from '../api/axios';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get('/events/all')
            .then(res => setEvents(res.data))
            .catch(err => console.error('Failed to fetch events', err));
    }, []);

    return (
        <>
              <div className="admin-dashboard">
                <h1>🛠️ Admin Dashboard</h1>
                <h2>Upcoming Events</h2>
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
                                <td>{event.name}</td>
                                <td>{event.location || 'N/A'}</td>
                                <td>{event.date || 'TBD'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4">No events found.</td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;
