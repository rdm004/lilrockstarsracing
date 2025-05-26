import React, { useState, useEffect } from 'react';
import './Events.css';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://lilrockstarsracing-test.onrender.com/api'
            : '/api';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${BASE_URL}/events/all`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    console.error("⚠️ Received non-JSON response:", text.slice(0, 500));
                    throw new Error("Expected JSON but got HTML");
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("❌ Fetch failed:", error);
                setError(error.message);
            }
        };

        fetchEvents();
    }, [BASE_URL]);

    const nextEvent = events.length > 0 ? events[0] : null;

    return (
        <div className="events-page">
            {error && (
                <div className="error-banner">
                    ❌ Error loading events: {error}
                </div>
            )}

            {nextEvent && (
                <div className="next-event-banner">
                    Next Event:&nbsp;
                    <span className="next-link">{nextEvent.name}</span>
                </div>
            )}

            <div className="events-list">
                {Array.isArray(events) && events.length > 0 ? (
                    events.map((evt) => {
                        const isNext = nextEvent && evt.eventId === nextEvent.eventId;
                        const eventDate = evt.date ? new Date(evt.date) : null;

                        const formattedDate =
                            eventDate && !isNaN(eventDate)
                                ? eventDate.toLocaleDateString(undefined, {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })
                                : 'Date unavailable';

                        return (
                            <div
                                key={evt.eventId || `${evt.name}-${evt.date}`}
                                className={`event-card ${isNext ? 'upcoming' : 'other'}`}
                            >
                                <h3 className={`event-title ${isNext ? 'upcoming' : ''}`}>
                                    {evt.name || 'Unnamed Event'}
                                </h3>
                                <p className="event-date">Date: {formattedDate}</p>
                                <p className="event-location">
                                    Location: {evt.location || 'TBA'}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    !error && <p className="no-events">No events found.</p>
                )}
            </div>
        </div>
    );
}