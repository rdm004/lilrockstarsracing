import React, { useEffect, useState } from 'react';
import Nav from './Nav'; // Make sure your Nav component exists
import axios from 'axios';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/admin/events/all`,
                    config
                );

                setEvents(response.data);
            } catch (err) {
                console.error('❌ Failed to fetch events', err);
                setError('Access denied or session expired.');
            }
        };

        fetchEvents();
    }, []);

    return (
        <>

            <div className="admin-dashboard">
                <h1>🛠️ Admin Dashboard</h1>
                <h2>Upcoming Events</h2>

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
                                <td>{event.name}</td>
                                <td>{event.location || 'N/A'}</td>
                                <td>{event.date || 'TBD'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No events found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;