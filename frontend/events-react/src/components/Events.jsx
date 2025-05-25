import React, { useState, useEffect } from 'react';
import './Events.css';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    console.log('BASE_URL from VITE:', import.meta.env.VITE_API_BASE_URL);
    console.log('✅ BASE_URL:', import.meta.env.VITE_API_BASE_URL);


    useEffect(() => {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://lilrockstarsracing-test.onrender.com";
        console.log('BASE_URL:', BASE_URL);
        fetch(`${BASE_URL}/api/events/all`)
            .then(res => {
                const contentType = res.headers.get("content-type");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Response is not JSON");
                }
                return res.json();
            })

        fetch(`${BASE_URL}/api/events/all`)
            .then(res => {
                console.log('Raw response:', res);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log('✅ Data:', data);
                setEvents(data);
            })
            .catch(err => {
                console.error('❌ Fetch error:', err);
                setError(err.message);
            });
    }, []);

    const nextEvent = events[0] || null;

    return (
        <div className="events-page">
            {error && (
                <div className="error-banner">
                    ❌ Error: {error}
                </div>
            )}

            {nextEvent && (
                <div className="next-event-banner">
                    Next Event:&nbsp;
                    <span className="next-link">{nextEvent.name}</span>
                </div>
            )}

            <div className="events-list">
                {events.map(evt => {
                    const isNext = nextEvent && evt.eventId === nextEvent.eventId;
                    return (
                        <div
                            key={evt.eventId}
                            className={`event-card ${isNext ? 'upcoming' : 'other'}`}
                        >
                            <h3 className={`event-title ${isNext ? 'upcoming' : ''}`}>
                                {evt.name}
                            </h3>
                            <p className="event-date">
                                Date:&nbsp;
                                z{new Date(evt.date).toString() !== 'Invalid Date'
                                ? new Date(evt.date).toLocaleDateString( {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })
                                    : 'Invalid date'}
                            </p>
                            <p className="event-location">Location:&nbsp;{evt.location}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}