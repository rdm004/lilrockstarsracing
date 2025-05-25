import React, { useState, useEffect } from 'react';
import './Events.css';

// update vercel.json to push a new deployment on Vercel


export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const BASE_URL = "/api";

    useEffect(() => {
        const fetchEvents = async () => {
            console.log("🌐 Fetching from:", `${BASE_URL}/api/events/all`);

            try {
                const response = await fetch(`${BASE_URL}/events/all`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Received non-JSON response");
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("✅ Events received:", data);

                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    throw new Error("API response is not an array");
                }
            } catch (err) {
                console.error("❌ Fetch error:", err);
                setError(err.message || "Unknown error");
            }
        };

        fetchEvents();
    }, []);

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
                                <p className="event-location">Location: {evt.location || 'TBA'}</p>
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