// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        console.log('📦 LocalStorage JWT on mount:', localStorage.getItem('jwt'));

        const fetchData = async () => {
            try {
                const res = await api.get('/admin/events');
                console.log('📥 Events loaded:', res.data);
                setEvents(res.data);
            } catch (err) {
                console.error('❌ Failed to fetch events:', err);
                if (err.response) {
                    console.error('🚨 Status:', err.response.status);
                    console.error('🚨 Response headers:', err.response.headers);
                    console.error('🚨 Response data:', err.response.data);
                }
                alert('Error loading events. Check console.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>🛠️ Admin Dashboard</h1>
            <h2>Events</h2>
            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.name || 'N/A'}</td>
                            <td>{event.date || 'N/A'}</td>
                            <td>{event.location || 'N/A'}</td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="3">No events found.</td></tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
