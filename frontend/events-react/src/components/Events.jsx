import React, { useState, useEffect } from 'react';
import './Events.css';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const BASE_URL = 'https://lilrockstarsracing-test.onrender.com/api';

    if (!BASE_URL) {
        throw new Error("❌ ENV VAR NEXT_PUBLIC_API_URL is undefined at runtime.");
    }

    useEffect(() => {
        console.log("✅ USING HARDCODED BASE_URL");
        const fetchEvents = async () => {
            const fullURL = `${BASE_URL}/events/all`;
            console.log("🌐 Fetching from:", fullURL);

            try {
                const response = await fetch(fullURL, {
                    headers: {
                        'Accept': 'application/json'
                    },
                    credentials: 'include' // optional depending on backend settings
                });

                const contentType = response.headers.get("Content-Type");
                const status = response.status;

                console.log("🔍 Status:", status);
                console.log("📄 Content-Type:", contentType);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("❌ Server Error Response:", errorText.slice(0, 300));
                    throw new Error(`Error ${status}: ${errorText}`);
                }

                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Expected JSON but got different content");
                }

                const data = await response.json();
                console.log("✅ Received JSON:", data);
                setEvents(data);
            } catch (error) {
                console.error("🚨 Fetch Error:", error);
                setError(error.message);
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