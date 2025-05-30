import React, { useState, useEffect } from 'react';
import './Events.css';
import EventReportTable from '../components/EventReportTable';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const BASE_URL = 'https://lilrockstarsracing-test.onrender.com/api';

    useEffect(() => {
        console.log("✅ Fetching from:", `${BASE_URL}/events/all`);

        fetch(`${BASE_URL}/events/all`)
            .then(res => {
                const contentType = res.headers.get("content-type");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Expected JSON but received " + contentType);
                }
                return res.json();
            })
            .then(data => {
                console.log("✅ Events loaded:", data);
                setEvents(data);
            })
            .catch(err => {
                console.error("❌ Fetch error:", err);
                setError(err.message);
            });
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
                        const formattedDate = eventDate && !isNaN(eventDate)
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

            {/* 📊 Supabase-powered registration report */}
            <EventReportTable />
        </div>
    );
}