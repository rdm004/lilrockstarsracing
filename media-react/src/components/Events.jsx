// media-react/src/components/Events.jsx
import React, { useState, useEffect } from 'react';
import './Events.css';  // we’ll create this next

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/data/events.json')
            .then(res => res.json())
            .then(setEvents)
            .catch(console.error);
    }, []);

    const today = new Date();
    // sort events by date ascending
    const sorted = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    // find the first event whose date is >= today
    const nextIndex = sorted.findIndex(e => new Date(e.date) >= today);
    const nextEvent = nextIndex >= 0 ? sorted[nextIndex] : null;

    return (
        <div className="events-page">
            {nextEvent && (
                <div className="next-event-banner">
                    Next Event:&nbsp;
                    <a href={nextEvent.link} className="next-link">
                        {nextEvent.name}
                    </a>
                </div>
            )}
            <div className="events-list">
                {sorted.map(event => {
                    const isNext = nextEvent && event.name === nextEvent.name;
                    return (
                        <div
                            key={event.name}
                            className={`event-card ${isNext ? 'upcoming' : 'other'}`}
                        >
                            <h3>{event.name}</h3>
                            <p>
                                Date:&nbsp;
                                {new Date(event.date).toLocaleDateString(undefined, {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                            <p>
                                Location:&nbsp;
                                <a href={event.link}>{event.location}</a>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}