import React, { useState, useEffect } from 'react';
import './Events.css';
//
export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const BASE_URL = "https://lilrockstarsracing-test.onrender.com";

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/events/all`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                console.log('✅ Events:', data);

                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    throw new Error("Unexpected API response format");
                }
            } catch (err) {
                console.error('❌ Fetch error:', err);
                setError(err.message);
            }
        };

        fetchEvents();
    }, [BASE_URL]);

    const nextEvent = events.length > 0 ? events[0] : null;

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
                {events.map((evt) => {
                    const isNext = nextEvent && evt.eventId === nextEvent.eventId;
                    const eventDate = evt.date ? new Date(evt.date) : null;
                    const formattedDate = eventDate && !isNaN(eventDate)
                        ? eventDate.toLocaleDateString(undefined, {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })
                        : 'Date unavailable';

                    return (
                        <div
                            key={evt.eventId}
                            className={`event-card ${isNext ? 'upcoming' : 'other'}`}
                        >
                            <h3 className={`event-title ${isNext ? 'upcoming' : ''}`}>
                                {evt.name}
                            </h3>
                            <p className="event-date">Date:&nbsp;{formattedDate}</p>
                            <p className="event-location">Location:&nbsp;{evt.location || 'TBA'}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}